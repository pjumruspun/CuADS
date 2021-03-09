import { Document } from 'mongoose';

export interface ITTS extends Document {
    project_id: number;
    tts_id: number;
    content: string;
}