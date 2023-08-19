import { PartialType } from "@nestjs/mapped-types";
import { CreateDeliveryRecordDto } from "./create-deliveryRecord.dto";

export class UpdateDeliveryRecordDto extends PartialType(
  CreateDeliveryRecordDto
) {}
