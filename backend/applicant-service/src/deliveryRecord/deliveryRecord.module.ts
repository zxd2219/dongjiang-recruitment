import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { DeliveryRecordController } from "./deliveryRecord.controller";
import { DeliveryRecordService } from "./deliveryRecord.service";
import { DeliveryRecord } from "./entities/deliveryRecord.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryRecord])],
  controllers: [DeliveryRecordController],
  providers: [DeliveryRecordService],
  exports: [TypeOrmModule.forFeature([DeliveryRecord])],
})
export class DeliveryRecordModule {}
