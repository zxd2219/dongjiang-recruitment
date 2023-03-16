import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { AccountModule } from "./account/account.module";
import { ActionsModule } from "./actions/actions.module";
import { AuthorityGroupModule } from "./authority-group/authority-group.module";
import { AuthorityModule } from "./authority/authority.module";
import { BcryptModule } from "./bcrypt.module";

@Module({
  imports: [
    CommonModule,
    BcryptModule,
    AccountModule,
    ActionsModule,
    AuthorityModule,
    AuthorityGroupModule,
  ],
})
export class AppModule {}
