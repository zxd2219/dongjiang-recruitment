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
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { Account } from "./entities/account.entity";

@Controller("authentication/accounts")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll(
    @QueryParam() query: Array<FindOptionsWhere<Account>>,
    @Page() page: Pagination<Account>
  ) {
    return this.accountService.findAll(query, page);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.accountService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.accountService.remove(id);
  }
}
