import { Module } from "@nestjs/common";
import { CommonController } from "./common.controller";
import { CommonService } from "./common.service";
import { MessageGateWay } from "./message.gateway";

@Module({
  imports: [MessageGateWay],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
