import { Body, Injectable, Req, Res } from '@nestjs/common';
import { response } from 'express';
import { ModifyAudioFromURLDto } from 'src/dto/modify-audio-from-url.dto';
import { ModifyAudioDto } from 'src/dto/modify-audio.dto';
import axios from 'axios';

var path = require('path')
var ffmpeg = require('fluent-ffmpeg')
var pathToFfmpeg = require('ffmpeg-static')
var fs = require('fs');
var https = require('https')
var formdata = require('form-data')
const multer = require('multer')

ffmpeg.setFfmpegPath(pathToFfmpeg);

@Injectable()
export class AudioUtilityService {
    async modifyAudioFromReq(@Req() request, @Res() response, @Body() modifyAudioDto: ModifyAudioDto=undefined, projectId: string = "") {
        if (!request.files[0]) {
            const errMessage = "No file found in the request body";
            console.log(errMessage);
            return response.status(404).json(`Failed to test in service: ${errMessage}`);
        }

        console.log(projectId);

        // File that has been uploaded in the request
        var file = request.files[0]

        // We will delete this file later
        const tmpFilePath = `tmp/${file.originalname}`;

        // Write file to temp folder
        await fs.writeFile(tmpFilePath, file.buffer, function (err) {
            if (err) console.log(`ERROR: ${err}`);
        })

        await this.modifyAudio(file, tmpFilePath, file.originalname, response, modifyAudioDto);
    }



    async modifyAudio(file, tmpFilePath, originalFileName, @Res() response, @Body() modifyAudioDto: ModifyAudioDto=undefined) {
        // Cut the old file type from the name
        const fileName = originalFileName.slice(0, -4)

        // We will modify temp file and export the result into ffmpegOutPath
        var ffmpegInPath = path.join(__dirname, `../../${tmpFilePath}`) // backend/tmp/original_file_name
        // var ffmpegOutPath = path.join(__dirname, `../../../front-end/public/original-soundtracks/${fileName}.mp3`)
        
        var ffmpegOutPath = path.join(__dirname, `../../tmp/${fileName}.mp3`) // backend/tmp/new_file_name.mp3

        // Audio filters
        var volumeFilter;
        if (modifyAudioDto)
        {
            volumeFilter = `volume=${modifyAudioDto.volume}`
        }
        else
        {
            volumeFilter = `volume=1`
        }

        // FFMPEG operations
        // We have to .audioFrequency(22050) for it to work, for some reason
        await ffmpeg(ffmpegInPath)
        .format('mp3') // convert to mp3
        .on("end", function () {
            // Callback when done

            // Delete temp file
            fs.unlink(tmpFilePath, function (error) { 
                if (error) throw error;
            })

            // Then save to GridFS
            const stream = fs.createReadStream(ffmpegOutPath);
            const fd = new formdata();
            fd.append('file', stream);
            const headers = fd.getHeaders();

            axios.post(`http://localhost:3001/files`, fd, { headers: headers })
            .then((res) => {
                console.log(res.data);
                const fileid = res.data[0].id;
                return axios.post(`http://localhost:3001/files/${fileid}`);
            })
            .then((res) => {

            });
        })
        .on("error", function (err) {
            console.log(`An error happened: ${err}`);
            return response.status(500).json(`An error happened: ${err}`);
        })
        .on('progress', function(progress) {
            console.log(`Processing: ${progress.percent}% done.`)
        })
        .audioFilters(volumeFilter) // could chain more modification later
        .saveToFile(ffmpegOutPath)

        // console.log(`file: ${file}`);
    }
}
