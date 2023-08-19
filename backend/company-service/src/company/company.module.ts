import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { PositionModule } from "src/position/position.module";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { Company } from "./entities/company.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Company]), PositionModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
