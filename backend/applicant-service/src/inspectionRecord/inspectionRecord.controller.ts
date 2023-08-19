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
import { CreateInspectionRecordDto } from "./dto/create-inspectionRecord.dto";
import { UpdateInspectionRecordDto } from "./dto/update-inspectionRecord.dto";
import { InspectionRecord } from "./entities/inspectionRecord.entity";
import { InspectionRecordService } from "./inspectionRecord.service";

@Controller("applicant/:applicantid/inspectionRecords")
export class InspectionRecordController {
  constructor(
    private readonly inspectionRecordService: InspectionRecordService
  ) {}

  @Post()
  create(
    @Param("applicantid") applicantid: string,
    @Body() createInspectionRecordDto: CreateInspectionRecordDto
  ) {
    return this.inspectionRecordService.create(
      applicantid,
      createInspectionRecordDto
    );
  }

  @Get()
  findAll(
    @Param("applicantid") applicantid: string,
    @QueryParam() query: Array<FindOptionsWhere<InspectionRecord>>,
    @Page() page: Pagination<InspectionRecord>
  ) {
    return this.inspectionRecordService.findAll(applicantid, query, page);
  }

  @Get(":id")
  findOne(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.inspectionRecordService.findOne(applicantid, id);
  }

  @Put(":id")
  update(
    @Param("applicantid") applicantid: string,
    @Param("id") id: string,
    @Body() updateInspectionRecordDto: UpdateInspectionRecordDto
  ) {
    return this.inspectionRecordService.update(
      applicantid,
      id,
      updateInspectionRecordDto
    );
  }

  @Delete(":id")
  remove(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.inspectionRecordService.remove(applicantid, id);
  }
}
