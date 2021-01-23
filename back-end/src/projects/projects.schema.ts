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
        audioClips: [{ 
            content: string,
            startTime: string,
            volume: number,
            speed: number,
            pitch: number,
            audioFileURL: string,
        }],
    }];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);