import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty()
    passcode: string;

    @ApiProperty()
    videoURL: string;
}