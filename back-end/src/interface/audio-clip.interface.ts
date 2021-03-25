import { Document, Types } from 'mongoose';

export interface IAudioClip extends Document {
    content: string;
    startTime: number;
    volume: number;
    speed: number;
    pitch: number;
    audioFileURL: string;
}