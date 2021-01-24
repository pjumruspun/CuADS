import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AudioClipDocument = AudioClip & Document;

@Schema()
export class AudioClip {
    @Prop()
    content: string;

    @Prop()
    startTime: string;

    @Prop()
    volume: number;

    @Prop()
    speed: number;
    
    @Prop()
    pitch: number;

    @Prop()
    audioFileURL: string;
}

export const AudioClipSchema = SchemaFactory.createForClass(AudioClip);