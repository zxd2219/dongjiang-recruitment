import { OmitType } from "@nestjs/mapped-types";
import { Advertise } from "../entities/advertise.entity";

export class CreateAdvertiseDto extends OmitType(Advertise, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
