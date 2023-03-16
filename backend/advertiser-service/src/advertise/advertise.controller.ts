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

@Controller("advertisers/{advertiserid}/advertise")
export class AdvertiseController {
  constructor(private readonly advertiseService: AdvertiseService) {}

  @Post()
  create(
    @Param("advertiserid") advertiserid: string,
    @Body() createAdvertiseDto: CreateAdvertiseDto
  ) {
    return this.advertiseService.create(advertiserid, createAdvertiseDto);
  }

  @Get()
  findAll(
    @Param("advertiserid") advertiserid: string,
    @QueryParam() query: Array<FindOptionsWhere<Advertise>>,
    @Page() page: Pagination<Advertise>
  ) {
    return this.advertiseService.findAll(advertiserid, query, page);
  }

  @Get(":id")
  findOne(
    @Param("advertiserid") advertiserid: string,
    @Param("id") id: string
  ) {
    return this.advertiseService.findOne(advertiserid, id);
  }

  @Put(":id")
  update(
    @Param("advertiserid") advertiserid: string,
    @Param("id") id: string,
    @Body() updateAdvertiseDto: UpdateAdvertiseDto
  ) {
    return this.advertiseService.update(advertiserid, id, updateAdvertiseDto);
  }

  @Delete(":id")
  remove(@Param("advertiserid") advertiserid: string, @Param("id") id: string) {
    return this.advertiseService.remove(advertiserid, id);
  }
}
