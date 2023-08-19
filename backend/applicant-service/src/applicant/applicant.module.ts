import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { DeliveryRecordModule } from "src/deliveryRecord/deliveryRecord.module";
import { InspectionRecordModule } from "src/inspectionRecord/inspectionRecord.module";
import { ApplicantController } from "./applicant.controller";
import { ApplicantService } from "./applicant.service";
import { Applicant } from "./entities/applicant.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Applicant]),
    DeliveryRecordModule,
    InspectionRecordModule,
  ],
  controllers: [ApplicantController],
  providers: [ApplicantService],
})
export class ApplicantModule {}
