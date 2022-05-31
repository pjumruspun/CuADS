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
        try {
            // Request .wav file from chula's TTS server
            // arraybuffer because the file is binary
            const promise = axios.post(
                chulaUrl,
                {'text': text},
                {
                    headers: {
                        'Content-Type': 'arraybuffer'
                    },
                    responseType: "arraybuffer"
                }
            )

            const [rawAudioData, statusCode] = await promise.then((response) => 
                [response.data, response.status]
            )
            
            // Convert from binary to base64 to further store in MongoDB
            // Front-end will read base64 file and play it
            const binaryData = Buffer.from(rawAudioData, 'binary')
            const base64Data = binaryData.toString('base64')
            
            return [base64Data, statusCode]

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
                        return res.status(201).json({'msg': 'success', 'content': 'data:audio/mpeg;base64,'+result, 'startTime': startTime, 'speed': speed, 'volume': volume});
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
