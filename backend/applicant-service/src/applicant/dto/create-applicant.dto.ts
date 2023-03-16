import { OmitType } from "@nestjs/mapped-types";
import { Applicant } from "../entities/applicant.entity";

export class CreateApplicantDto extends OmitType(Applicant, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
