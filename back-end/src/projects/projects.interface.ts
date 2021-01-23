import { Document } from "mongoose";

export interface IProject extends Document {
    readonly passcode: string;
    readonly videoURL: string;
    readonly tracks: [{ 
        name: string,
        audioClips: [{ 
            content: string,
            startTime: string,
            volume: number,
            speed: number,
            pitch: number,
            audioFileURL: string,
        }],
    }],
}