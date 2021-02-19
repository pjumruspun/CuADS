import { Injectable, Req, Res, Param } from '@nestjs/common';
import * as gTTS from 'gtts';

@Injectable()
export class TTSService {
    constructor() {}

    async saveAudio(@Param('text') text: string, @Req() req, @Res() res) {
        try {
            const gtts = new gTTS(text, 'th');
            const save = gtts.save(`/tmp/${text}.mp3`, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(`Failed: ${err}`);
                }
                console.log(`Success! Open file /tmp/${text}.mp3 to hear result.`);
                return res.status(200).json(`Success`);
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(`Failed: ${error}`);
        }
    }
}
