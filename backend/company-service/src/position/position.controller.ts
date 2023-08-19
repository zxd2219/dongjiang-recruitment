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
import { CreatePositionDto } from "./dto/create-position.dto";
import { UpdatePositionDto } from "./dto/update-position.dto";
import { Position } from "./entities/position.entity";
import { PositionService } from "./position.service";

@Controller("companies/:companyid/positions")
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create(
    @Param("companyid") companyid: string,
    @Body() createPositionDto: CreatePositionDto
  ) {
    return this.positionService.create(companyid, createPositionDto);
  }

  @Get()
  findAll(
    @Param("companyid") companyid: string,
    @QueryParam() query: Array<FindOptionsWhere<Position>>,
    @Page() page: Pagination<Position>
  ) {
    return this.positionService.findAll(companyid, query, page);
  }

  @Get(":id")
  findOne(@Param("companyid") companyid: string, @Param("id") id: string) {
    return this.positionService.findOne(companyid, id);
  }

  @Put(":id")
  update(
    @Param("companyid") companyid: string,
    @Param("id") id: string,
    @Body() updatePositionDto: UpdatePositionDto
  ) {
    return this.positionService.update(companyid, id, updatePositionDto);
  }

  @Delete(":id")
  remove(@Param("companyid") companyid: string, @Param("id") id: string) {
    return this.positionService.remove(companyid, id);
  }
}
