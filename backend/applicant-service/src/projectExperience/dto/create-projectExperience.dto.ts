import { OmitType } from "@nestjs/mapped-types";
import { ProjectExperience } from "../entities/projectExperience.entity";

export class CreateProjectExperienceDto extends OmitType(ProjectExperience, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
