import { PartialType } from "@nestjs/swagger";
import { ModifyAudioDto } from "./modify-audio.dto";

export class ModifyAudioFromURLDto extends ModifyAudioDto {
    url: string;
}