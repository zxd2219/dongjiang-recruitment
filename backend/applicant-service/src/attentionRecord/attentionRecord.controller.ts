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
import { AttentionRecordService } from "./attentionRecord.service";
import { CreateAttentionRecordDto } from "./dto/create-attentionRecord.dto";
import { UpdateAttentionRecordDto } from "./dto/update-attentionRecord.dto";
import { AttentionRecord } from "./entities/attentionRecord.entity";

@Controller("applicant/:applicantid/attentionRecords")
export class AttentionRecordController {
  constructor(
    private readonly attentionRecordService: AttentionRecordService
  ) {}

  @Post()
  create(
    @Param("applicantid") applicantid: string,
    @Body() createAttentionRecordDto: CreateAttentionRecordDto
  ) {
    return this.attentionRecordService.create(
      applicantid,
      createAttentionRecordDto
    );
  }

  @Get()
  findAll(
    @Param("applicantid") applicantid: string,
    @QueryParam() query: Array<FindOptionsWhere<AttentionRecord>>,
    @Page() page: Pagination<AttentionRecord>
  ) {
    return this.attentionRecordService.findAll(applicantid, query, page);
  }

  @Get(":id")
  findOne(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.attentionRecordService.findOne(applicantid, id);
  }

  @Put(":id")
  update(
    @Param("applicantid") applicantid: string,
    @Param("id") id: string,
    @Body() updateAttentionRecordDto: UpdateAttentionRecordDto
  ) {
    return this.attentionRecordService.update(
      applicantid,
      id,
      updateAttentionRecordDto
    );
  }

  @Delete(":id")
  remove(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.attentionRecordService.remove(applicantid, id);
  }
}
