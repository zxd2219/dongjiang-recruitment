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
import { AdvertiseService } from "./advertise.service";
import { CreateAdvertiseDto } from "./dto/create-advertise.dto";
import { UpdateAdvertiseDto } from "./dto/update-advertise.dto";
import { Advertise } from "./entities/advertise.entity";

@Controller("advertisers/:advertiserId/advertise")
export class AdvertiseController {
  constructor(private readonly advertiseService: AdvertiseService) {}

  @Post()
  create(
    @Param("advertiserId") advertiserId: string,
    @Body() createAdvertiseDto: CreateAdvertiseDto
  ) {
    return this.advertiseService.create(advertiserId, createAdvertiseDto);
  }

  @Get()
  findAll(
    @Param("advertiserId") advertiserId: string,
    @QueryParam() query: Array<FindOptionsWhere<Advertise>>,
    @Page() page: Pagination<Advertise>
  ) {
    return this.advertiseService.findAll(advertiserId, query, page);
  }

  @Get(":id")
  findOne(
    @Param("advertiserId") advertiserId: string,
    @Param("id") id: string
  ) {
    return this.advertiseService.findOne(advertiserId, id);
  }

  @Put(":id")
  update(
    @Param("advertiserId") advertiserId: string,
    @Param("id") id: string,
    @Body() updateAdvertiseDto: UpdateAdvertiseDto
  ) {
    return this.advertiseService.update(advertiserId, id, updateAdvertiseDto);
  }

  @Delete(":id")
  remove(@Param("advertiserId") advertiserId: string, @Param("id") id: string) {
    return this.advertiseService.remove(advertiserId, id);
  }
}
