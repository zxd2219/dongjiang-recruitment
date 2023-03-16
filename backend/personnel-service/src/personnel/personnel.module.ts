import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { Personnel } from "./entities/personnel.entity";
import { PersonnelController } from "./personnel.controller";
import { PersonnelService } from "./personnel.service";

@Module({
  imports: [TypeOrmModule.forFeature([Personnel])],
  controllers: [PersonnelController],
  providers: [PersonnelService],
})
export class PersonnelModule {}
