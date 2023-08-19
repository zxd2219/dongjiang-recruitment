import { PartialType } from "@nestjs/mapped-types";
import { CreateInspectionRecordDto } from "./create-inspectionRecord.dto";

export class UpdateInspectionRecordDto extends PartialType(
  CreateInspectionRecordDto
) {}
