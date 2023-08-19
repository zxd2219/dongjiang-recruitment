import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { GarnerRecord } from "./entities/garnerRecord.entity";
import { GarnerRecordController } from "./garnerRecord.controller";
import { GarnerRecordService } from "./garnerRecord.service";

@Module({
  imports: [TypeOrmModule.forFeature([GarnerRecord])],
  controllers: [GarnerRecordController],
  providers: [GarnerRecordService],
})
export class GarnerRecordModule {}
