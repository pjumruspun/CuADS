import { IAudioClip } from "./audio-clip.interface";
import { Document, Types } from 'mongoose';

export interface ITrack extends Document {
    name: string;
    test: string;
    audioClips: [Types.ObjectId];
}