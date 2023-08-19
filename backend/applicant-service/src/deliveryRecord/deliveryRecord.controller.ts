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
import { DeliveryRecordService } from "./deliveryRecord.service";
import { CreateDeliveryRecordDto } from "./dto/create-deliveryRecord.dto";
import { UpdateDeliveryRecordDto } from "./dto/update-deliveryRecord.dto";
import { DeliveryRecord } from "./entities/deliveryRecord.entity";

@Controller("applicant/:applicantid/deliveryRecords")
export class DeliveryRecordController {
  constructor(private readonly deliveryRecordService: DeliveryRecordService) {}

  @Post()
  create(
    @Param("applicantid") applicantid: string,
    @Body() createDeliveryRecordDto: CreateDeliveryRecordDto
  ) {
    return this.deliveryRecordService.create(
      applicantid,
      createDeliveryRecordDto
    );
  }

  @Get()
  findAll(
    @Param("applicantid") applicantid: string,
    @QueryParam() query: Array<FindOptionsWhere<DeliveryRecord>>,
    @Page() page: Pagination<DeliveryRecord>
  ) {
    return this.deliveryRecordService.findAll(applicantid, query, page);
  }

  @Get(":id")
  findOne(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.deliveryRecordService.findOne(applicantid, id);
  }

  @Put(":id")
  update(
    @Param("applicantid") applicantid: string,
    @Param("id") id: string,
    @Body() updateDeliveryRecordDto: UpdateDeliveryRecordDto
  ) {
    return this.deliveryRecordService.update(
      applicantid,
      id,
      updateDeliveryRecordDto
    );
  }

  @Delete(":id")
  remove(@Param("applicantid") applicantid: string, @Param("id") id: string) {
    return this.deliveryRecordService.remove(applicantid, id);
  }
}
