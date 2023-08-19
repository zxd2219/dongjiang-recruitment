import { OmitType } from "@nestjs/mapped-types";
import { Second } from "../entities/second.entity";

export class CreateSecondDto extends OmitType(Second, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
