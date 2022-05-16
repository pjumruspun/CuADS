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

async function generateAudio(source, text): Promise<any> {
    if (source === 'chula') {
        const chulaUrl = `http://${process.env.TTS_API_ENDPOINT}:${process.env.TTS_PORT}`
        console.log(`chulaUrl: ${chulaUrl}`)
        console.log(`text: ${text}`)
        try {
            
            const promise = axios.post(
                chulaUrl,
                {'text': text},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            const [rawAudioData, statusCode] = await promise.then((response) => 
                [response.data, response.status]
            )

            const binaryData = Buffer.from(rawAudioData, 'binary')
            const base64Data = binaryData.toString('base64')
            
            return [base64Data, statusCode]

        } catch (error) {
            console.log("error generating chula:")
            console.log(error)
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
        console.log('saving audio...')
        const source = createTTSDto.source;
        const text = createTTSDto.text;
        const startTime = createTTSDto.startTime;
        const speed = createTTSDto.speed;
        const volume = createTTSDto.volume;
        const trackId = createTTSDto.trackId;

        console.log('will generate audio...')

        generateAudio(source, text).then((response) => {
            const [result, statusCode] = response

            let prefix

            if (source == 'google') {
                prefix = 'data:audio/mpeg;base64,'
            }
            else if (source == 'chula') {
                prefix = 'data:audio/mpeg;base64,'
            }
            else {
                throw new Error("invalid source")
            }
 
            console.log(`statusCode: ${statusCode}`)

            if (statusCode !== 200) {
                return res.status(statusCode).json({'msg': result});
            }

            const formData = {
                content: result,
                startTime: startTime,
                text: text,
                speed: speed,
                volume: volume,
                source: source,
            };

            try {
                axios.post(`http://localhost:3001/audio-clips/${trackId}`, formData).then((response) => {
                    console.log("success");
                        return res.status(201).json({'msg': 'success', 'content': prefix+result, 'startTime': startTime, 'speed': speed, 'volume': volume});
                })
            } catch(e) {
                return res.status(500).json({ 'msg': e.message });
            }
        })
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
                updatePayload.content = result;
                updatePayload.text = text;
                updatePayload.speed = speed;
                updatePayload.volume = volume;
                updatePayload.source = source;
            }
        }

        return await this.audioClipModel.findByIdAndUpdate(id, updatePayload, { new: true });
    }
}
