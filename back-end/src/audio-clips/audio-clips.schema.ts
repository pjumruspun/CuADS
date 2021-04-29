import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema } from "mongoose";

export const AudioClipSchema = new Schema({
    content: String,
    startTime: Number,
    text: String,
    volume: Number,
    speed: Number,
    pitch: Number,
    audioFileURL: String,
    source: String,
});