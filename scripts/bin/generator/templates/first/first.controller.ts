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
import { CreateFirstDto } from "./dto/create-first.dto";
import { UpdateFirstDto } from "./dto/update-first.dto";
import { First } from "./entities/first.entity";
import { FirstService } from "./first.service";

@Controller("firsts")
export class FirstController {
  constructor(private readonly firstService: FirstService) {}

  @Post()
  create(@Body() createFirstDto: CreateFirstDto) {
    return this.firstService.create(createFirstDto);
  }

  @Get()
  findAll(
    @QueryParam() query: Array<FindOptionsWhere<First>>,
    @Page() page: Pagination<First>
  ) {
    return this.firstService.findAll(query, page);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.firstService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateFirstDto: UpdateFirstDto) {
    return this.firstService.update(id, updateFirstDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.firstService.remove(id);
  }
}
