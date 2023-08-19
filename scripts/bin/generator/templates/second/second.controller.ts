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
import { CreateSecondDto } from "./dto/create-second.dto";
import { UpdateSecondDto } from "./dto/update-second.dto";
import { Second } from "./entities/second.entity";
import { SecondService } from "./second.service";

@Controller("firsts/:firstid/seconds")
export class SecondController {
  constructor(private readonly secondService: SecondService) {}

  @Post()
  create(
    @Param("firstid") firstid: string,
    @Body() createSecondDto: CreateSecondDto
  ) {
    return this.secondService.create(firstid, createSecondDto);
  }

  @Get()
  findAll(
    @Param("firstid") firstid: string,
    @QueryParam() query: Array<FindOptionsWhere<Second>>,
    @Page() page: Pagination<Second>
  ) {
    return this.secondService.findAll(firstid, query, page);
  }

  @Get(":id")
  findOne(@Param("firstid") firstid: string, @Param("id") id: string) {
    return this.secondService.findOne(firstid, id);
  }

  @Put(":id")
  update(
    @Param("firstid") firstid: string,
    @Param("id") id: string,
    @Body() updateSecondDto: UpdateSecondDto
  ) {
    return this.secondService.update(firstid, id, updateSecondDto);
  }

  @Delete(":id")
  remove(@Param("firstid") firstid: string, @Param("id") id: string) {
    return this.secondService.remove(firstid, id);
  }
}
