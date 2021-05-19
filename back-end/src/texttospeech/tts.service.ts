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
            const response = await axios.post(
                process.env.TTS_API_ENDPOINT,
                {
                    'data': text,
                    'mode': 'MelGan'
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const b64string = response.data;
            const audioArr = JSON.parse(Buffer.from(b64string, 'base64').toString('utf-8'));
            return [audioArr, 200];
        } catch (error) {
            return [error, 400];
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
        const speed = createTTSDto.speed;
        const volume = createTTSDto.volume;
        const trackId = createTTSDto.trackId;

        const [result, statusCode] = await generateAudio(source, text);

        if (statusCode !== 200) {
            return res.status(statusCode).json({'msg': result});
        }

        const formData = {
            content: source === "chula" ? JSON.stringify(result) : result,
            startTime: startTime,
            text: text,
            speed: speed,
            volume: volume,
            source: source,
        };

        try {
            axios.post(`http://localhost:3001/audio-clips/${trackId}`, formData).then((response) => {
                switch (source) {
                    case "chula":
                        return res.status(201).json({'msg': 'success', 'content': result, 'startTime': startTime, 'speed': speed, 'volume': volume});
                    case "google":
                        return res.status(201).json({'msg': 'success', 'content': 'data:audio/mpeg;base64,'+result, 'startTime': startTime, 'speed': speed, 'volume': volume});
                    default:
                        throw "Wrong Source.";
                }
            });
        } catch(e) {
            return res.status(500).json({ 'msg': e.message });
        }
    }

    async update(id: string, UpdateTTSDto: UpdateTTSDto) {
        var updatePayload = new UpdateAudioClipDto();
        
        if ('text' in UpdateTTSDto && 'source' in UpdateTTSDto && 'speed' in UpdateTTSDto && 'volume' in UpdateTTSDto) {
            const text = UpdateTTSDto.text;
            const source = UpdateTTSDto.source;
            const speed = UpdateTTSDto.speed;
            const volume = UpdateTTSDto.volume;

            const [result, statusCode] = await generateAudio(source, text);
            if (statusCode === 200) {
                updatePayload.content = source === "chula" ? JSON.stringify(result) : result;
                updatePayload.text = text;
                updatePayload.speed = speed;
                updatePayload.volume = volume;
                updatePayload.source = source;
            }
        }

        return await this.audioClipModel.findByIdAndUpdate(id, updatePayload, { new: true });
    }
}
