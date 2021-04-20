import { PartialType } from "@nestjs/swagger";
import { CreateTTSDto } from "./create-tts.dto";

export class UpdateTTSDto extends PartialType(CreateTTSDto) {}