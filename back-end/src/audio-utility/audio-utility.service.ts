import { Body, Injectable, Req, Res } from '@nestjs/common';
import { response } from 'express';
import { ModifyAudioFromURLDto } from 'src/dto/modify-audio-from-url.dto';
import { ModifyAudioDto } from 'src/dto/modify-audio.dto';

var path = require('path')
var ffmpeg = require('fluent-ffmpeg')
var pathToFfmpeg = require('ffmpeg-static')
var fs = require('fs');
var https = require('https')
ffmpeg.setFfmpegPath(pathToFfmpeg);

@Injectable()
export class AudioUtilityService {
    async modifyAudioFromReq(@Req() request, @Res() response, @Body() modifyAudioDto: ModifyAudioDto) {
        if (!request.files[0]) {
            const errMessage = "No file found in the request body";
            console.log(errMessage);
            return response.status(404).json(`Failed to test in service: ${errMessage}`);
        }

        console.log(modifyAudioDto);

        // File that has been uploaded in the request
        var file = request.files[0]

        // We will delete this file later
        const tmpFilePath = `tmp/${file.originalname}`;

        // Write file to temp folder
        await fs.writeFile(tmpFilePath, file.buffer, function (err) {
            if (err) console.log(`ERROR: ${err}`);
        })

        await this.modifyAudio(tmpFilePath, file.originalname, response, modifyAudioDto);
    }

    async modifyAudioFromURL(@Res() response, @Body() modifyAudioFromURLDto: ModifyAudioFromURLDto) {
        const url = "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
        const urlList = url.split('/');
        const fileName = urlList[urlList.length - 1];
        console.log(fileName)

        const tmpFilePath = `tmp/${fileName}`

        const fwrite = await fs.createWriteStream(tmpFilePath);

        var params = {
            host: 'file-examples-com.github.io',
            method: 'GET',
            path: '/uploads/2017/11/file_example_MP3_700KB.mp3'
        };

        await this.getSomething(url).then(console.log);

        const req = https.get(url, function(res) {
            res.pipe(fwrite);
            res.on('end', function() {
                // Need to fix this, cannot call modifyAudio from this callback event
                this.modifyAudio(tmpFilePath, fileName, response, modifyAudioFromURLDto);
            })
        })
    }

    getSomething(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                res.on('error', () => {
                    console.log("Promise error")
                    reject("Meep")
                })
                resolve(res)
            })
        })
    }

    async modifyAudio(tmpFilePath, originalFileName, @Res() response, @Body() modifyAudioDto: ModifyAudioDto) {
        // Cut the old file type from the name
        const fileName = originalFileName.slice(0, -4)
        console.log(fileName)

        // We will modify temp file and export the result into ffmpegOutPath
        var ffmpegInPath = path.join(__dirname, `../../${tmpFilePath}`) 
        var ffmpegOutPath = path.join(__dirname, `../../tmp/${fileName}.mp3`)

        // Audio filters
        const volumeFilter = `volume=${modifyAudioDto.volume}`
        console.log(volumeFilter);

        // FFMPEG operations
        // We have to .audioFrequency(22050) for it to work, for some reason
        await ffmpeg(ffmpegInPath)
        .format('mp3') // convert to mp3
        .on("end", function (stdout, stderr) {
            // Callback when done
            console.log("Finished");
            fs.unlink(tmpFilePath, function (error) { // Delete temp file
                if (error) throw error;
            })
            return response.status(201).json(`Successfully creating file: ${ffmpegOutPath}`)
        })
        .on("error", function (err) {
            console.log(`An error happened: ${err}`);
            return response.status(500).json(`An error happened: ${err}`);
        })
        .setStartTime(60.0)
        .audioFilters(volumeFilter) // could chain more modification later
        .audioFrequency(22050)
        .saveToFile(ffmpegOutPath)
    }
}
