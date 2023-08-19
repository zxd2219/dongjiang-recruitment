import { OmitType } from "@nestjs/mapped-types";
import { InspectionRecord } from "../entities/inspectionRecord.entity";

export class CreateInspectionRecordDto extends OmitType(InspectionRecord, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
