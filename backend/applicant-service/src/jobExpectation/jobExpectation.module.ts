import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { JobExpectation } from "./entities/jobExpectation.entity";
import { JobExpectationController } from "./jobExpectation.controller";
import { JobExpectationService } from "./jobExpectation.service";

@Module({
  imports: [TypeOrmModule.forFeature([JobExpectation])],
  controllers: [JobExpectationController],
  providers: [JobExpectationService],
})
export class JobExpectationModule {}
