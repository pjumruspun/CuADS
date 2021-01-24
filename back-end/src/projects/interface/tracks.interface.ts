import { IAudioClip } from "./audio-clip.interface";
import { Types } from 'mongoose';

export interface ITrack {
    readonly track_id: Types.ObjectId;
    readonly name: string;
    readonly audioClips: IAudioClip[];
}