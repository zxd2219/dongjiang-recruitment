import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { Second } from "./entities/second.entity";
import { SecondController } from "./second.controller";
import { SecondService } from "./second.service";

@Module({
  imports: [TypeOrmModule.forFeature([Second])],
  controllers: [SecondController],
  providers: [SecondService],
})
export class SecondModule {}
