import { OmitType } from "@nestjs/mapped-types";
import { AttentionRecord } from "../entities/attentionRecord.entity";

export class CreateAttentionRecordDto extends OmitType(AttentionRecord, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
