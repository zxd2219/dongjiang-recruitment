import { OmitType } from "@nestjs/mapped-types";
import { Personnel } from "../entities/personnel.entity";

export class CreatePersonnelDto extends OmitType(Personnel, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
