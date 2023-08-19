import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { InspectionRecord } from "./entities/inspectionRecord.entity";
import { InspectionRecordController } from "./inspectionRecord.controller";
import { InspectionRecordService } from "./inspectionRecord.service";

@Module({
  imports: [TypeOrmModule.forFeature([InspectionRecord])],
  controllers: [InspectionRecordController],
  providers: [InspectionRecordService],
  exports: [TypeOrmModule.forFeature([InspectionRecord])],
})
export class InspectionRecordModule {}
