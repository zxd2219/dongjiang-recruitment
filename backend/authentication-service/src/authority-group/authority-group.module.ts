import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { AuthorityGroupController } from "./authority-group.controller";
import { AuthorityGroupService } from "./authority-group.service";
import { AuthorityGroup } from "./entities/authority-group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthorityGroup])],
  controllers: [AuthorityGroupController],
  providers: [AuthorityGroupService],
})
export class AuthorityGroupModule {}
