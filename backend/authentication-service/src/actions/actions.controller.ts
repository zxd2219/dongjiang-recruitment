import { Public } from "@dongjiang-recruitment/nest-common/dist/auth";
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ActionsService } from "./actions.service";
import { ChangePasswordActionDto } from "./dto/change-password-action.dto";
import { ForgetPasswordActionDto } from "./dto/forget-password-action.dto";
import { LoginActionDto } from "./dto/login-action.dto";
import { RegisterActionDto } from "./dto/register-action.dto";

@Public()
@Controller("authentication/actions")
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post("register")
  register(@Body() registerActionDto: RegisterActionDto) {
    return this.actionsService.register(registerActionDto);
  }

  @Delete("destroy/:id")
  destroy(
    @Param("id") id: string,
    @Query("verificationCode") verificationCode: string
  ) {
    return this.actionsService.destroy(id, verificationCode);
  }

  @Post("login")
  login(@Body() loginActionDto: LoginActionDto) {
    return this.actionsService.login(loginActionDto);
  }

  @Put("changePassword/:id")
  changePassword(
    @Param("id") id: string,
    @Body() changePasswordActionDto: ChangePasswordActionDto
  ) {
    return this.actionsService.changePassword(id, changePasswordActionDto);
  }

  @Put("forget")
  forgetPassword(@Body() forgetPasswordActionDto: ForgetPasswordActionDto) {
    return this.actionsService.forgetPassword(forgetPasswordActionDto);
  }
}
