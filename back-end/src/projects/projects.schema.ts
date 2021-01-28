import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

export const ProjectSchema = new Schema({
    passcode: String,
    videoURL: String,
    tracks: [{
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }]
});