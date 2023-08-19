import { PartialType } from "@nestjs/mapped-types";
import { CreateJobExpectationDto } from "./create-jobExpectation.dto";

export class UpdateJobExpectationDto extends PartialType(
  CreateJobExpectationDto
) {}
