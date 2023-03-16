import { PartialType } from "@nestjs/mapped-types";
import { Account } from "../entities/account.entity";

export class UpdateAccountDto extends PartialType(Account) {}
