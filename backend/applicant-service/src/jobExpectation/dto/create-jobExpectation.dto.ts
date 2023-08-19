import { OmitType } from "@nestjs/mapped-types";
import { JobExpectation } from "../entities/jobExpectation.entity";

export class CreateJobExpectationDto extends OmitType(JobExpectation, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
