import { PartialType } from "@nestjs/mapped-types";
import { CreateEducationExperienceDto } from "./create-educationExperience.dto";

export class UpdateEducationExperienceDto extends PartialType(
  CreateEducationExperienceDto
) {}
