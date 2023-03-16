import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { PersonnelModule } from "./personnel/personnel.module";

@Module({
  imports: [CommonModule, PersonnelModule],
})
export class AppModule {}
