import { OmitType } from "@nestjs/mapped-types";
import { GarnerRecord } from "../entities/garnerRecord.entity";

export class CreateGarnerRecordDto extends OmitType(GarnerRecord, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
