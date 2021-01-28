import { Document, Types } from 'mongoose';

export interface IAudioClip extends Document {
    content: string;
    startTime: string;
    volume: number;
    speed: number;
    pitch: number;
    audioFileURL: string;
}