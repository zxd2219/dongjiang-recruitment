import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { Position } from "./entities/position.entity";
import { PositionController } from "./position.controller";
import { PositionService } from "./position.service";

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [TypeOrmModule.forFeature([Position])],
})
export class PositionModule {}
