import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema } from "mongoose";
import { AudioClip } from '../audio-clips/audio-clips.schema';

export const TrackSchema = new Schema({
    name: String,
    audioClips: [{
        type: Schema.Types.ObjectId,
        ref: 'AudioClip'
    }],
});