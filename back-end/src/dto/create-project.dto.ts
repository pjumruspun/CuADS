import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';
import { Types } from 'mongoose';

export class CreateProjectDto {
    @ApiProperty({
        description: 'Passcode of the project, can be blank.',
    })
    passcode: string;

    @ApiProperty({
        description: 'Video URL of this project.'
    })
    videoURL: string;

    @ApiProperty({
        description: 'List of all tracks in this project.',
        default: [],
        type: Types.ObjectId,
    })
    tracks: [Types.ObjectId]
}
