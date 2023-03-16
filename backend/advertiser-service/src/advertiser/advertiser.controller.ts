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
import { AdvertiserService } from "./advertiser.service";
import { CreateAdvertiserDto } from "./dto/create-advertiser.dto";
import { UpdateAdvertiserDto } from "./dto/update-advertiser.dto";
import { Advertiser } from "./entities/advertiser.entity";

@Controller("advertisers")
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) {}

  @Post()
  create(@Body() createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserService.create(createAdvertiserDto);
  }

  @Get()
  findAll(
    @QueryParam() query: Array<FindOptionsWhere<Advertiser>>,
    @Page() page: Pagination<Advertiser>
  ) {
    return this.advertiserService.findAll(query, page);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.advertiserService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateAdvertiserDto: UpdateAdvertiserDto
  ) {
    return this.advertiserService.update(id, updateAdvertiserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.advertiserService.remove(id);
  }
}
