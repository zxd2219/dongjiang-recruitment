import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { AdvertiserModule } from "./advertiser/advertiser.module";
import { AdvertiseModule } from "./advertise/advertise.module";

@Module({
  imports: [CommonModule, AdvertiserModule, AdvertiseModule],
})
export class AppModule {}
