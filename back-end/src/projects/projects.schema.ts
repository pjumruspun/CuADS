import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop()
    passcode: string;

    @Prop()
    videoURL: string;

    @Prop()
    tracks: [{
        name: string,
        audioClips: [{ type: audioClips }],
    }];
}

export class audioClips {
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

export const ProjectSchema = SchemaFactory.createForClass(Project);