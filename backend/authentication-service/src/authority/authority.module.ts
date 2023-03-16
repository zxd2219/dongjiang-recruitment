import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { AuthorityController } from "./authority.controller";
import { AuthorityService } from "./authority.service";
import { Authority } from "./entities/authority.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Authority])],
  controllers: [AuthorityController],
  providers: [AuthorityService],
})
export class AuthorityModule {}
