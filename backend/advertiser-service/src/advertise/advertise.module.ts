import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { AdvertiseController } from "./advertise.controller";
import { AdvertiseService } from "./advertise.service";
import { Advertise } from "./entities/advertise.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Advertise])],
  controllers: [AdvertiseController],
  providers: [AdvertiseService],
})
export class AdvertiseModule {}
