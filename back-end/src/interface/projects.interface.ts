import { Document, Schema, Types } from "mongoose";
import { ITrack } from "./tracks.interface";

export interface IProject extends Document {
    passcode: String;
    videoURL: String;
    tracks: [Types.ObjectId];
}