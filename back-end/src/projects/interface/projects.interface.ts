import { Document } from "mongoose";
import { ITrack } from "./tracks.interface";

export interface IProject extends Document {
    readonly passcode: string;
    readonly videoURL: string;
    readonly tracks: ITrack[];
}