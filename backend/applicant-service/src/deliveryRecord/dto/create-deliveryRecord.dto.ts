import { OmitType } from "@nestjs/mapped-types";
import { DeliveryRecord } from "../entities/deliveryRecord.entity";

export class CreateDeliveryRecordDto extends OmitType(DeliveryRecord, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
