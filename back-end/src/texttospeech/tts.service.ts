import { Req, Res, Param, Body } from '@nestjs/common';
import { AudioClipSchema } from 'src/audio-clips/audio-clips.schema';
import axios from 'axios';
import * as gTTS from 'gtts';
import * as mongoose from 'mongoose';
import { CreateTTSDto } from 'src/dto/create-tts.dto';
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

export class TTSService {
    async saveAudio(@Body() createTTSDto: CreateTTSDto, @Req() req, @Res() res) {
        const source = createTTSDto.source;
        const text = createTTSDto.text;
        const startTime = createTTSDto.startTime;
        const trackId = createTTSDto.trackId;
        console.log(`TrackId received: ${trackId}`);
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
                    const Model =  mongoose.model("AudioClip", AudioClipSchema, "audioclips");
                    const responseAudio = new Model({
                        content: sound,
                        startTime: startTime,
                    });
                    responseAudio.save((err) => {
                        if (err) return res.status(400).json({'msg': err})
                        return res.status(200).json({'msg': 'success', 'audio': 'data:audio/mpeg;base64,'+sound});
                    });
                }).catch((response) => {
                    return res.status(400).json({'msg': response});
                });
            } catch (error) {
                return res.status(500).json({'msg': error});
            }
        } else if (source === 'google') {
            try {
                const chunks = [];
                const gtts = new gTTS(text, 'th');
                
                function getSound(buffer) {
                    return new Promise((resolve, reject) => {
                        streamToString(buffer, (data) => {
                            let sound = data;
                            resolve(sound);
                        });
                    });
                };

                getSound(gtts.stream()).then((value) => {
                    // const Model =  mongoose.model("AudioClip", AudioClipSchema, "audioclips");
                    // const responseAudio = new Model({
                    //     content: value,
                    //     startTime: startTime,
                    // });

                    // responseAudio.save((err) => {
                    //     if (err) return res.status(400).json({'msg': err})
                    //     return res.status(200).json({'msg': 'success', 'audio': 'data:audio/mpeg;base64,'+value});
                    // });

                    const formData = {
                        content: value,
                        startTime: startTime,
                    }

                    axios.post(`http://localhost:3001/audio-clips/${trackId}`, formData)
                    .then((res) => {
                        return res
                    })
                }).catch((error) => {
                    return res.status(400).json({'msg': error})
                })
            } catch (error) {
                return res.status(500).json({'msg': error});
            }
        } else {
            return res.status(400).json({'msg': 'invalid source.'})
        }
    }
}
