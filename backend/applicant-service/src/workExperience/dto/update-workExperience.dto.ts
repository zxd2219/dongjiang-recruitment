import { PartialType } from "@nestjs/mapped-types";
import { CreateWorkExperienceDto } from "./create-workExperience.dto";

export class UpdateWorkExperienceDto extends PartialType(
  CreateWorkExperienceDto
) {}
