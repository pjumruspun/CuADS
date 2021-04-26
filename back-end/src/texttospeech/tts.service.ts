import { Req, Res, Param, Body, Inject, Injectable } from '@nestjs/common';
import { AudioClipSchema } from 'src/audio-clips/audio-clips.schema';
import axios from 'axios';
import * as gTTS from 'gtts';
import * as mongoose from 'mongoose';
import { CreateTTSDto } from 'src/dto/create-tts.dto';
import { UpdateTTSDto } from 'src/dto/update-tts.dto';
import { UpdateAudioClipDto } from 'src/dto/update-audio-clip.dto';
import { IAudioClip } from 'src/interface/audio-clip.interface';
import { TrackSchema } from 'src/tracks/tracks.schema';

function streamToString(stream, cb) {
    const chunks = [];
    stream.on('data', (chunk) => {
        chunks.push(chunk);
    });
    stream.on('end', () => {
        cb(Buffer.concat(chunks).toString('base64'));
    });
}

function getSound(buffer) {
    return new Promise((resolve, reject) => {
        streamToString(buffer, (data) => {
            let sound = data;
            resolve(sound);
        });
    });
}

async function generateAudio(source, text) {
    if (source === 'chula') {
        try {
            axios.post(
                process.env.TTS_API_ENDPOINT,
                {'data': text},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                const sound = response.data.data;
                return [sound, 200];
            }).catch((response) => {
                return [response, 400];
            });
        } catch (error) {
            return [error, 500];
        }
    } else if (source === 'google') {
        try {
            const chunks = [];
            const gtts = new gTTS(text, 'th');
            const value = await getSound(gtts.stream())
            return [value, 200];
        } catch (error) {
            return [error, 500];
        }
    } else {
        const error = 'invalid source.'
        return [error, 400];
    }
}

export class TTSService {
    constructor(@Inject('AUDIOCLIP_MODEL') private audioClipModel: mongoose.Model<IAudioClip>){}

    async saveAudio(@Body() createTTSDto: CreateTTSDto, @Req() req, @Res() res) {
        const source = createTTSDto.source;
        const text = createTTSDto.text;
        const startTime = createTTSDto.startTime;
        const trackId = createTTSDto.trackId;

        const [result, statusCode] = await generateAudio(source, text);

        if (statusCode !== 200) {
            return res.status(statusCode).json({'msg': result});
        }

        // const sound = result;
        // const Model =  mongoose.model("AudioClip", AudioClipSchema, "audioclips");
        // const responseAudio = new Model({
        //     content: sound,
        //     startTime: startTime,
        //     text: text,
        // });
        // responseAudio.save((err) => {
        //     if (err) return res.status(400).json({'msg': err})
        //     return res.status(200).json({'msg': 'success', 'audio': 'data:audio/mpeg;base64,'+sound});
        // });

        const formData = {
            content: result,
            startTime: startTime,
            text: text,
        }

        try {
            axios.post(`http://localhost:3001/audio-clips/${trackId}`, formData).then((response) => {
                console.log("success");
		return res.status(201).json({'msg': 'success', 'audio': 'data:audio/mpeg;base64,'+result});
            })
        } catch(e) {
            return res.status(500).json({ 'msg': e.message });
        }
    }

    async update(id: string, UpdateTTSDto: UpdateTTSDto) {
        var updatePayload = new UpdateAudioClipDto();
        
        if ('text' in UpdateTTSDto && 'source' in UpdateTTSDto) {
            const text = UpdateTTSDto.text;
            const source = UpdateTTSDto.source;

            const [result, statusCode] = await generateAudio(source, text);
            if (statusCode === 200) {
                updatePayload.content = result;
                updatePayload.text = text;
            }
        }

        return await this.audioClipModel.findByIdAndUpdate(id, updatePayload, { new: true });
    }
}
