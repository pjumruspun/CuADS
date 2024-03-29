import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema } from "mongoose";

export const TrackSchema = new Schema({
    name: String,
    audioClips: [{
        type: Schema.Types.ObjectId,
        ref: 'AudioClip'
    }],
});