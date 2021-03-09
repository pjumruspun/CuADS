import { Injectable, Req, Res, Param, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ITTS } from 'src/interface/tts.interface';
import { TracksService } from 'src/tracks/tracks.service';
import axios from 'axios';

@Injectable()
export class TTSService {
    constructor(
        @Inject('TTS_MODEL') private ttsModel: Model<ITTS>
    ) {}

    async saveAudio(@Param('text') text: string, @Req() req, @Res() res): Promise<ITTS> {
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
                const sound = response.data;
                const responseAudio = new this.ttsModel({
                    "project_id": 1,
                    "tts_id": 2,
                    "content": sound
                });
                const save = responseAudio.save();
                
                return res.status(200).json({'msg': 'success'})
            }).catch((response) => {
                return res.status(400).json({'msg': response})
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(`Failed: ${error}`);
        }
    }
}
