import { Types } from 'mongoose';

export interface IAudioClip {
    readonly audioClip_id: Types.ObjectId;
    readonly content: string;
    readonly startTime: string;
    readonly volume: number;
    readonly speed: number;
    readonly pitch: number;
    readonly audioFileURL: string;
}