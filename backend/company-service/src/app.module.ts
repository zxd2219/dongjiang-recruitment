import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { CompanyModule } from "./company/company.module";
import { Personnel } from "./external.entity";
import { PositionModule } from "./position/position.module";

@Module({
  imports: [
    CommonModule,
    PositionModule,
    CompanyModule,
    TypeOrmModule.forFeature([Personnel]),
  ],
})
export class AppModule {}
