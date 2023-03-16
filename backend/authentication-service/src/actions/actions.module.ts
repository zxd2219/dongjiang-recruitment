import { Module } from "@nestjs/common";
import { AccountModule } from "src/account/account.module";
import { ActionsController } from "./actions.controller";
import { ActionsService } from "./actions.service";

@Module({
  imports: [AccountModule],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
