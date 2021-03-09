import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Schema } from "mongoose";

export const TTSSchema = new Schema({
    project_id: Number,
    tts_id: Number,
    content: String
});