import { Document } from "mongoose";
import { audioClips } from "./projects.schema";

export interface IProject extends Document {
    readonly passcode: string;
    readonly videoURL: string;
    readonly tracks: [{ 
        name: string,
        audioClips: [{
            type: audioClips,
        }];
    }],
}