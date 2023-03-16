import { OmitType } from "@nestjs/mapped-types";
import { Authority } from "../entities/authority.entity";

export class CreateAuthorityDto extends OmitType(Authority, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
