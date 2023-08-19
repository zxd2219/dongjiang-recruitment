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
import { CreateJobExpectationDto } from "./dto/create-jobExpectation.dto";
import { UpdateJobExpectationDto } from "./dto/update-jobExpectation.dto";
import { JobExpectation } from "./entities/jobExpectation.entity";
import { JobExpectationService } from "./jobExpectation.service";

@Controller("applicant/:applicantid/jobExpectations")
export class JobExpectationController {
  constructor(private readonly jobExpectationService: JobExpectationService) {}

  @Post()
  create(
    @Param("applicantid") applicantid: string,
    @Body() createJobExpectationDto: CreateJobExpectationDto
  ) {
    return this.jobExpectationService.create(
      applicantid,
      createJobExpectationDto
    );
  }

  @Get()
  findAll(
    @Param("applicantid") applicantid: string,
    @QueryParam() query: Array<FindOptionsWhere<JobExpectation>>,
    @Page() page: Pagination<JobExpectation>
  ) {
    return this.jobExpectationService.findAll(applicantid, query, page);
  }

  @Get(":id")
  findOne(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.jobExpectationService.findOne(applicantid, id);
  }

  @Put(":id")
  update(
    @Param("applicantid") applicantid: string,
    @Param("id") id: string,
    @Body() updateJobExpectationDto: UpdateJobExpectationDto
  ) {
    return this.jobExpectationService.update(
      applicantid,
      id,
      updateJobExpectationDto
    );
  }

  @Delete(":id")
  remove(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.jobExpectationService.remove(applicantid, id);
  }
}
