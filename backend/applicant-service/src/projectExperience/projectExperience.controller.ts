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
import { CreateProjectExperienceDto } from "./dto/create-projectExperience.dto";
import { UpdateProjectExperienceDto } from "./dto/update-projectExperience.dto";
import { ProjectExperience } from "./entities/projectExperience.entity";
import { ProjectExperienceService } from "./projectExperience.service";

@Controller("applicant/:applicantid/projectExperiences")
export class ProjectExperienceController {
  constructor(
    private readonly projectExperienceService: ProjectExperienceService
  ) {}

  @Post()
  create(
    @Param("applicantid") applicantid: string,
    @Body() createProjectExperienceDto: CreateProjectExperienceDto
  ) {
    return this.projectExperienceService.create(
      applicantid,
      createProjectExperienceDto
    );
  }

  @Get()
  findAll(
    @Param("applicantid") applicantid: string,
    @QueryParam() query: Array<FindOptionsWhere<ProjectExperience>>,
    @Page() page: Pagination<ProjectExperience>
  ) {
    return this.projectExperienceService.findAll(applicantid, query, page);
  }

  @Get(":id")
  findOne(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.projectExperienceService.findOne(applicantid, id);
  }

  @Put(":id")
  update(
    @Param("applicantid") applicantid: string,
    @Param("id") id: string,
    @Body() updateProjectExperienceDto: UpdateProjectExperienceDto
  ) {
    return this.projectExperienceService.update(
      applicantid,
      id,
      updateProjectExperienceDto
    );
  }

  @Delete(":id")
  remove(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.projectExperienceService.remove(applicantid, id);
  }
}
