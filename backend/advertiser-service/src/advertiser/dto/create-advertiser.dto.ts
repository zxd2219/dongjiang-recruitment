import { OmitType } from "@nestjs/mapped-types";
import { Advertiser } from "../entities/advertiser.entity";

export class CreateAdvertiserDto extends OmitType(Advertiser, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
