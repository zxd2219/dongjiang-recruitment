import { Module } from "@nestjs/common";
import { ApplicantModule } from "./applicant/applicant.module";

@Module({
  imports: [ApplicantModule],
})
export class AppModule {}
