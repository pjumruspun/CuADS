import { Document, Types } from 'mongoose';

export interface IAudioClip extends Document {
    content: string;
    startTime: number;
    text: string;
    volume: number;
    speed: number;
    pitch: number;
    audioFileURL: string;
    source: string;
}