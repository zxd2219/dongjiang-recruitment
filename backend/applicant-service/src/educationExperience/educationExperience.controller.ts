import {
  Page,
  Pagination,
  QueryParam,
} from "@dongjiang-recruitment/nest-common/dist/decorator";
import { FindOptionsWhere } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateEducationExperienceDto } from "./dto/create-educationExperience.dto";
import { UpdateEducationExperienceDto } from "./dto/update-educationExperience.dto";
import { EducationExperienceService } from "./educationExperience.service";
import { EducationExperience } from "./entities/educationExperience.entity";

@Controller("applicant/:applicantid/eduExperiences")
export class EducationExperienceController {
  constructor(
    private readonly educationExperienceService: EducationExperienceService
  ) {}

  @Post()
  create(
    @Param("applicantid") applicantid: string,
    @Body() createEducationExperienceDto: CreateEducationExperienceDto
  ) {
    return this.educationExperienceService.create(
      applicantid,
      createEducationExperienceDto
    );
  }

  @Get()
  findAll(
    @Param("applicantid") applicantid: string,
    @QueryParam() query: Array<FindOptionsWhere<EducationExperience>>,
    @Page() page: Pagination<EducationExperience>
  ) {
    return this.educationExperienceService.findAll(applicantid, query, page);
  }

  @Get(":id")
  findOne(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.educationExperienceService.findOne(applicantid, id);
  }

  @Put(":id")
  update(
    @Param("applicantid") applicantid: string,
    @Param("id") id: string,
    @Body() updateEducationExperienceDto: UpdateEducationExperienceDto
  ) {
    return this.educationExperienceService.update(
      applicantid,
      id,
      updateEducationExperienceDto
    );
  }

  @Delete(":id")
  remove(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.educationExperienceService.remove(applicantid, id);
  }
}
