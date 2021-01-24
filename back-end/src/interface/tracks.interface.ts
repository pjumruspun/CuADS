import { IAudioClip } from "./audio-clip.interface";
import { Document, Types } from 'mongoose';

export interface ITrack extends Document {
    readonly track_id: Types.ObjectId;
    readonly name: string;
    readonly audioClips: IAudioClip[];
}