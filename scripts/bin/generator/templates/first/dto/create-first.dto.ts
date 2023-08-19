import { OmitType } from "@nestjs/mapped-types";
import { First } from "../entities/first.entity";

export class CreateFirstDto extends OmitType(First, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
