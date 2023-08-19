import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { WorkExperience } from "./entities/workExperience.entity";
import { WorkExperienceController } from "./workExperience.controller";
import { WorkExperienceService } from "./workExperience.service";

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperience])],
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService],
})
export class WorkExperienceModule {}
