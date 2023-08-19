import { OmitType } from "@nestjs/mapped-types";
import { Position } from "../entities/position.entity";

export class CreatePositionDto extends OmitType(Position, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
