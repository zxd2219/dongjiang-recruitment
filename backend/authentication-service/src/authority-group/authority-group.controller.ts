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
import { AuthorityGroupService } from "./authority-group.service";
import { CreateAuthorityGroupDto } from "./dto/create-authority-group.dto";
import { UpdateAuthorityGroupDto } from "./dto/update-authority-group.dto";
import { AuthorityGroup } from "./entities/authority-group.entity";

@Controller("authentication/authorityGroups")
export class AuthorityGroupController {
  constructor(private readonly authorityGroupService: AuthorityGroupService) {}

  @Post()
  create(@Body() createAuthorityGroupDto: CreateAuthorityGroupDto) {
    return this.authorityGroupService.create(createAuthorityGroupDto);
  }

  @Get()
  findAll(
    @QueryParam() query: Array<FindOptionsWhere<AuthorityGroup>>,
    @Page() page: Pagination<AuthorityGroup>
  ) {
    return this.authorityGroupService.findAll(query, page);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authorityGroupService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateAuthorityGroupDto: UpdateAuthorityGroupDto
  ) {
    return this.authorityGroupService.update(id, updateAuthorityGroupDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authorityGroupService.remove(id);
  }
}
