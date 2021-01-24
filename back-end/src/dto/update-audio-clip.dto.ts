import { PartialType } from "@nestjs/swagger";
import { CreateAudioClipDto } from "./create-audio-clip.dto";

export class UpdateAudioClipDto extends PartialType(CreateAudioClipDto) {}