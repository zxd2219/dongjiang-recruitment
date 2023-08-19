import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { ProjectExperience } from "./entities/projectExperience.entity";
import { ProjectExperienceController } from "./projectExperience.controller";
import { ProjectExperienceService } from "./projectExperience.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectExperience])],
  controllers: [ProjectExperienceController],
  providers: [ProjectExperienceService],
})
export class ProjectExperienceModule {}
