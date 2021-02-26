import { Document, Schema, Types } from "mongoose";
import { ITrack } from "./tracks.interface";

export interface IProject extends Document {
    name: String;
    passcode: String;
    videoURL: String;
    tracks: [Types.ObjectId];
}