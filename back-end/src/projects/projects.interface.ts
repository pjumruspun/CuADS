import { Document } from "mongoose";

export interface IProject extends Document {
    readonly passcode: string;
    readonly videoURL: string;
}