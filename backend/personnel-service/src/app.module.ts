import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { Applicant, Company } from "./external.entity";
import { InspectionRecordModule } from "./inspectionRecord/inspectionRecord.module";
import { PersonnelModule } from "./personnel/personnel.module";

@Module({
  imports: [
    CommonModule,
    PersonnelModule,
    InspectionRecordModule,
    TypeOrmModule.forFeature([Applicant, Company]),
  ],
})
export class AppModule {}
