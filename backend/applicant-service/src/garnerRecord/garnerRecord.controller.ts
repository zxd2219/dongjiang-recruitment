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
import { CreateGarnerRecordDto } from "./dto/create-garnerRecord.dto";
import { UpdateGarnerRecordDto } from "./dto/update-garnerRecord.dto";
import { GarnerRecord } from "./entities/garnerRecord.entity";
import { GarnerRecordService } from "./garnerRecord.service";

@Controller("applicant/:applicantid/garnerRecords")
export class GarnerRecordController {
  constructor(private readonly garnerRecordService: GarnerRecordService) {}

  @Post()
  create(
    @Param("applicantid") applicantid: string,
    @Body() createGarnerRecordDto: CreateGarnerRecordDto
  ) {
    return this.garnerRecordService.create(applicantid, createGarnerRecordDto);
  }

  @Get()
  findAll(
    @Param("applicantid") applicantid: string,
    @QueryParam() query: Array<FindOptionsWhere<GarnerRecord>>,
    @Page() page: Pagination<GarnerRecord>
  ) {
    return this.garnerRecordService.findAll(applicantid, query, page);
  }

  @Get(":id")
  findOne(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.garnerRecordService.findOne(applicantid, id);
  }

  @Put(":id")
  update(
    @Param("applicantid") applicantid: string,
    @Param("id") id: string,
    @Body() updateGarnerRecordDto: UpdateGarnerRecordDto
  ) {
    return this.garnerRecordService.update(
      applicantid,
      id,
      updateGarnerRecordDto
    );
  }

  @Delete(":id")
  remove(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.garnerRecordService.remove(applicantid, id);
  }
}
