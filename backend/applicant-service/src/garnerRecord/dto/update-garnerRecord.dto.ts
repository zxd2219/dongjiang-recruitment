import { PartialType } from "@nestjs/mapped-types";
import { CreateGarnerRecordDto } from "./create-garnerRecord.dto";

export class UpdateGarnerRecordDto extends PartialType(CreateGarnerRecordDto) {}
