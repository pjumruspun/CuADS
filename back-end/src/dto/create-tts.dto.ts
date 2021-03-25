import { ApiProperty } from "@nestjs/swagger";

export class CreateTTSDto {
    @ApiProperty({
        description: 'Content of the TTS audio clip.',
        required: true,
    })
    text: string;

    @ApiProperty({
        description: 'Platform of TTS generation. Either `chula` or `google`',
        required: true,
    })
    source: string;

    @ApiProperty({
        description: 'Start time in second to play this TTS audio clip.',
        required: true,
        default: '0',
    })
    startTime: number;
}