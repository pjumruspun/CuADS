import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';
import { Types } from 'mongoose';

export class CreateProjectDto {
    @ApiProperty({
        description: 'Name of the project.'
    })
    name: string;

    @ApiProperty({
        description: 'Passcode of the project, can be blank.',
        default: "",
        type: String
    })
    passcode: string;

    @ApiProperty({
        description: 'Video URL of this project.',
        default: "",
        type: String
    })
    videoURL: string;

    @ApiProperty({
        description: 'Original audio URL of this project.',
        default: "",
        type: String
    })
    originalAudioURL: string;

    @ApiProperty({
        description: 'List of all tracks in this project.',
        default: [],
        type: Types.ObjectId,
    })
    tracks: [Types.ObjectId]
}
