import { OmitType } from "@nestjs/mapped-types";
import { EducationExperience } from "../entities/educationExperience.entity";

export class CreateEducationExperienceDto extends OmitType(
  EducationExperience,
  ["id", "createdAt", "updatedAt", "deletedAt"]
) {}
