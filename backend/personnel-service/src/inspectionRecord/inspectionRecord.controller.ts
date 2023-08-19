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

@Controller("personnel/:personnelid/inspectionRecords")
export class InspectionRecordController {
  constructor(
    private readonly inspectionRecordService: InspectionRecordService
  ) {}

  @Post()
  create(
    @Param("personnelid") personnelid: string,
    @Body() createInspectionRecordDto: CreateInspectionRecordDto
  ) {
    return this.inspectionRecordService.create(
      personnelid,
      createInspectionRecordDto
    );
  }

  @Get()
  findAll(
    @Param("personnelid") personnelid: string,
    @QueryParam() query: Array<FindOptionsWhere<InspectionRecord>>,
    @Page() page: Pagination<InspectionRecord>
  ) {
    return this.inspectionRecordService.findAll(personnelid, query, page);
  }

  @Get(":id")
  findOne(@Param("personnelid") personnelid: string, @Param("id") id: string) {
    return this.inspectionRecordService.findOne(personnelid, id);
  }

  @Put(":id")
  update(
    @Param("personnelid") personnelid: string,
    @Param("id") id: string,
    @Body() updateInspectionRecordDto: UpdateInspectionRecordDto
  ) {
    return this.inspectionRecordService.update(
      personnelid,
      id,
      updateInspectionRecordDto
    );
  }

  @Delete(":id")
  remove(@Param("personnelid") personnelid: string, @Param("id") id: string) {
    return this.inspectionRecordService.remove(personnelid, id);
  }
}
