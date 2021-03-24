import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

export const ProjectSchema = new Schema({
    name: String,
    passcode: String,
    videoURL: String,
    originalAudioURL: String,
    tracks: [{
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }]
});