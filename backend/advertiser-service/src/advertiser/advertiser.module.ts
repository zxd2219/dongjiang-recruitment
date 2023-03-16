import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { AdvertiserController } from "./advertiser.controller";
import { AdvertiserService } from "./advertiser.service";
import { Advertiser } from "./entities/advertiser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Advertiser])],
  controllers: [AdvertiserController],
  providers: [AdvertiserService],
})
export class AdvertiserModule {}
