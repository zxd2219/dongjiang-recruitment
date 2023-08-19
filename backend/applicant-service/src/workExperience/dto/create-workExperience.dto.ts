import { OmitType } from "@nestjs/mapped-types";
import { WorkExperience } from "../entities/workExperience.entity";

export class CreateWorkExperienceDto extends OmitType(WorkExperience, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
