import { OmitType } from "@nestjs/mapped-types";
import { AuthorityGroup } from "../entities/authority-group.entity";

export class CreateAuthorityGroupDto extends OmitType(AuthorityGroup, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
