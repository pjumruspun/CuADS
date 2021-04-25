import { Body, Injectable, Req, Res } from '@nestjs/common';
import { ModifyAudioDto } from 'src/dto/modify-audio.dto';
import axios from 'axios';
import { IAudioClip } from 'src/interface/audio-clip.interface';

var path = require('path')
var ffmpeg = require('fluent-ffmpeg')
var pathToFfmpeg = require('ffmpeg-static')
var fs = require('fs');
var formdata = require('form-data')
const followRedirects = require('follow-redirects');
followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 ** 2; // 500 MB

ffmpeg.setFfmpegPath(pathToFfmpeg);

@Injectable()
export class AudioUtilityService {
    async modifyAudioFromReq(@Req() request, @Res() response, @Body() modifyAudioDto: ModifyAudioDto=undefined, projectId: string=undefined) {
        if (!request.files || !request.files[0]) {
            const errMessage = "No file found in the request body";
            console.log(errMessage);
            return response.status(404).json(`Failed to modify in service: ${errMessage}`);
        }
        
        // File that has been uploaded in the request
        var file = request.files[0]
        
        // We will delete this file later
        const tmpFilePath = path.join(__dirname, `../${file.originalname}`)

        // Write file to temp folder
        fs.writeFileSync(tmpFilePath, file.buffer, function (err) {
            if (err) console.log(`ERROR: ${err}`);
        })

        await this.modifyAudio(file, tmpFilePath, file.originalname, response, modifyAudioDto, projectId);
    }

    async modifyAudio(file, tmpFilePath, originalFileName, @Res() response, @Body() modifyAudioDto: ModifyAudioDto=undefined, projectId: string=undefined) {
        // Cut the old file type from the name
        const fileName = originalFileName.slice(0, -4)

        // We will modify temp file and export the result into ffmpegOutPath
        // var ffmpegInPath = path.join(__dirname, `../../${tmpFilePath}`) // backend/tmp/original_file_name
        var ffmpegInPath = tmpFilePath
        // var ffmpegOutPath = path.join(__dirname, `../../../front-end/public/original-soundtracks/${fileName}.mp3`)
        
        var ffmpegOutPath = path.join(__dirname, `../${fileName}.mp3`) // backend/tmp/new_file_name.mp3
 
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
        await ffmpeg(ffmpegInPath)
        .format('mp3') // convert to mp3
        .on("end", function () {
            // Callback when done
            // Delete temp input file
            fs.unlink(tmpFilePath, (err) => { if (err) throw err; })

            // Then save to GridFS
            const stream = fs.createReadStream(ffmpegOutPath);
            const fd = new formdata();
            fd.append('file', stream);
            const headers = fd.getHeaders();

            axios.post(`http://localhost:3001/files`, fd, { headers: headers })
            .then((res) => {
                // Delete temp output file
                fs.unlink(ffmpegOutPath, (err) => { if (err) throw err; });

                if(!projectId) // Case convert without projectId
                {
                    // Returns saved object
                    console.log("Prematured return");
                    return response.status(201).json(res.data)
                }

                // If projectId is not undefined, try to update projects document
                const audioURL = `http://localhost:3001/files/${res.data[0].id}`;
                const putURL = `http://localhost:3001/projects/${projectId}`;
                return axios.put(putURL, { 'originalAudioURL': audioURL });
            })
            .then((res) => {
                // Return update results
                return response.status(201).json(res.data)
            });
        })
        .on("error", function (err) {
            console.log(`An error happened: ${err}`);
            return response.status(500).json(`An error happened: ${err}`);
        })
        .on('progress', function(progress) {
            // console.log(`Processing: ${progress.percent}% done.`)
        })
        .audioFilters(volumeFilter) // could chain more modification later
        .saveToFile(ffmpegOutPath)
    }

    async export(audioClips: IAudioClip[])
    {
        console.log(`audioClip length: ${audioClips.length}`);

        // Write temp file to back-end/tmp/${idx}.mp3
        // Where idx is index of audioClip array
        const paths = []
        const createTTSFilesPromise = new Promise((resolve, reject) => {
            
            audioClips.map((audioClip, idx) => {
                const base64Data = audioClip.content
                var dir = `tmp`

                if (!fs.existsSync(dir))
                {
                    console.log(`${dir} directory does not exist.. creating one`)
                    fs.mkdirSync(dir);
                }

                const tmpFilePath = path.join(__dirname, `../../tmp/${idx}.mp3`)
                paths.push(tmpFilePath)
                // console.log(`saved at ${tmpFilePath}`)
                fs.writeFileSync(tmpFilePath, Buffer.from(base64Data.replace('data:audio/mp3; codecs=opus;base64,', ''), 'base64'));

                if(idx == audioClips.length - 1)
                {
                    resolve(undefined);
                }
            })
        });
        

        const ffmpegOutPath = path.join(__dirname, `../../tmp/result.mp3`)

        console.log(`Start merging files`)

        // Create a new instance of ffmpeg command
        const command = ffmpeg()

        // Add all input audio files into the command
        paths.forEach((path) => {
            command.input(path)
        })

        // Create complexFilter filter instance
        const filters = []
        const outputs = []
        audioClips.map((audioClip, idx) => {
            const startTimeMs = Math.round(audioClip.startTime * 1000)
            const output = `out${idx}`
            console.log(startTimeMs)
            const filter = {
                filter: 'adelay',
                options: startTimeMs,
                inputs: idx,
                outputs: output,
            }
            
            outputs.push(output)
            filters.push(filter);
        })

        filters.push({
            filter: 'amix',
            options: audioClips.length,
            inputs: outputs
        })

        command
        .complexFilter(filters)
        .saveToFile(ffmpegOutPath)
        .on('end', () => {
            console.log('merging finished!')
        })
        .on('progress', (progress) => {
            console.log(`Merging... ${progress}% done`);
        })
        .on('error', (error) => {
            // When error occurs when concatenating mp3 files
            console.log(`Error occurred when trying to merge files: ${error.message}`);
        })
        
        command.run()

        // Delete temp file once ended
        // for(var i = 0; i < audioClips.length; ++i)
        // {
        //     const tmpFilePath = path.join(__dirname, `../../tmp/${i}.mp3`)
        //     fs.unlink(tmpFilePath, (err) => console.log(err));
        // }
        
        return 'it works!';
    }
}