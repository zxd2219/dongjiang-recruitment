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
import { AuthorityService } from "./authority.service";
import { CreateAuthorityDto } from "./dto/create-authority.dto";
import { UpdateAuthorityDto } from "./dto/update-authority.dto";
import { Authority } from "./entities/authority.entity";

@Controller("authentication/authorities")
export class AuthorityController {
  constructor(private readonly authorityService: AuthorityService) {}

  @Post()
  create(@Body() createAuthorityDto: CreateAuthorityDto) {
    return this.authorityService.create(createAuthorityDto);
  }

  @Get()
  findAll(
    @QueryParam() query: Array<FindOptionsWhere<Authority>>,
    @Page() page: Pagination<Authority>
  ) {
    return this.authorityService.findAll(query, page);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authorityService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateAuthorityDto: UpdateAuthorityDto
  ) {
    return this.authorityService.update(id, updateAuthorityDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authorityService.remove(id);
  }
}
