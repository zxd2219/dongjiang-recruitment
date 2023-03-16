import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { CommonModule as _CommonModule } from "./common/common.module";

@Module({
  imports: [CommonModule, _CommonModule],
})
export class AppModule {}
