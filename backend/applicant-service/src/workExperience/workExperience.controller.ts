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
import { CreateWorkExperienceDto } from "./dto/create-workExperience.dto";
import { UpdateWorkExperienceDto } from "./dto/update-workExperience.dto";
import { WorkExperience } from "./entities/workExperience.entity";
import { WorkExperienceService } from "./workExperience.service";

@Controller("applicant/:applicantid/workExperiences")
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Post()
  create(
    @Param("applicantid") applicantid: string,
    @Body() createWorkExperienceDto: CreateWorkExperienceDto
  ) {
    return this.workExperienceService.create(
      applicantid,
      createWorkExperienceDto
    );
  }

  @Get()
  findAll(
    @Param("applicantid") applicantid: string,
    @QueryParam() query: Array<FindOptionsWhere<WorkExperience>>,
    @Page() page: Pagination<WorkExperience>
  ) {
    return this.workExperienceService.findAll(applicantid, query, page);
  }

  @Get(":id")
  findOne(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.workExperienceService.findOne(applicantid, id);
  }

  @Put(":id")
  update(
    @Param("applicantid") applicantid: string,
    @Param("id") id: string,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto
  ) {
    return this.workExperienceService.update(
      applicantid,
      id,
      updateWorkExperienceDto
    );
  }

  @Delete(":id")
  remove(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.workExperienceService.remove(applicantid, id);
  }
}
