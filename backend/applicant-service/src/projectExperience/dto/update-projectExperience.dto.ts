import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectExperienceDto } from "./create-projectExperience.dto";

export class UpdateProjectExperienceDto extends PartialType(
  CreateProjectExperienceDto
) {}
