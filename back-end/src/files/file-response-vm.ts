import { ApiProperty } from '@nestjs/swagger';
import { FileInfoVm } from './file-info-vm';


export class FileResponseVm {
    @ApiProperty() message: string;

    @ApiProperty({ type: FileInfoVm })
    file: FileInfoVm;
}