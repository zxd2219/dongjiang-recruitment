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
import { DeliveryRecord } from "src/deliveryRecord/entities/deliveryRecord.entity";
import { InspectionRecord } from "src/inspectionRecord/entities/inspectionRecord.entity";
import { ApplicantService } from "./applicant.service";
import { CreateApplicantDto } from "./dto/create-applicant.dto";
import { UpdateApplicantDto } from "./dto/update-applicant.dto";
import { Applicant } from "./entities/applicant.entity";

@Controller("applicant")
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantService.create(createApplicantDto);
  }

  @Get()
  findAll(
    @QueryParam() query: Array<FindOptionsWhere<Applicant>>,
    @Page() page: Pagination<Applicant>
  ) {
    return this.applicantService.findAll(query, page);
  }

  @Get("deliveryRecords")
  findAllDeliveryRecords(
    @QueryParam() query: Array<FindOptionsWhere<DeliveryRecord>>,
    @Page() page: Pagination<DeliveryRecord>
  ) {
    return this.applicantService.findAllDeliveryRecords(query, page);
  }

  @Get("inspectionRecords")
  findAllInspectionRecords(
    @QueryParam() query: Array<FindOptionsWhere<InspectionRecord>>,
    @Page() page: Pagination<InspectionRecord>
  ) {
    return this.applicantService.findAllInspectionRecords(query, page);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.applicantService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateApplicantDto: UpdateApplicantDto
  ) {
    return this.applicantService.update(id, updateApplicantDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.applicantService.remove(id);
  }
}
