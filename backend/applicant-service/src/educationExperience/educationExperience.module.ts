import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { EducationExperience } from "./entities/educationExperience.entity";
import { EducationExperienceController } from "./educationExperience.controller";
import { EducationExperienceService } from "./educationExperience.service";

@Module({
  imports: [TypeOrmModule.forFeature([EducationExperience])],
  controllers: [EducationExperienceController],
  providers: [EducationExperienceService],
})
export class EducationExperienceModule {}
