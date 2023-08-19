import { PartialType } from "@nestjs/mapped-types";
import { CreateAttentionRecordDto } from "./create-attentionRecord.dto";

export class UpdateAttentionRecordDto extends PartialType(
  CreateAttentionRecordDto
) {}
