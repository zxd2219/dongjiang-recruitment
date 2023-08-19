import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { First } from "./entities/first.entity";
import { FirstController } from "./first.controller";
import { FirstService } from "./first.service";

@Module({
  imports: [TypeOrmModule.forFeature([First])],
  controllers: [FirstController],
  providers: [FirstService],
})
export class FirstModule {}
