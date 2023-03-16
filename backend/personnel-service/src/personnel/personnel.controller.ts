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
import { CreatePersonnelDto } from "./dto/create-personnel.dto";
import { UpdatePersonnelDto } from "./dto/update-personnel.dto";
import { Personnel } from "./entities/personnel.entity";
import { PersonnelService } from "./personnel.service";

@Controller("personnel")
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @Post()
  create(@Body() createPersonnelDto: CreatePersonnelDto) {
    return this.personnelService.create(createPersonnelDto);
  }

  @Get()
  findAll(
    @QueryParam() query: Array<FindOptionsWhere<Personnel>>,
    @Page() page: Pagination<Personnel>
  ) {
    return this.personnelService.findAll(query, page);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.personnelService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updatePersonnelDto: UpdatePersonnelDto
  ) {
    return this.personnelService.update(id, updatePersonnelDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.personnelService.remove(id);
  }
}
