import { Public } from "@dongjiang-recruitment/nest-common/dist/auth";
import type {
  Areas,
  Cities,
  DirectionTags,
  FilterCriteria,
  PositionTypes,
} from "@dongjiang-recruitment/nest-common/dist/http";
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CommonService } from "./common.service";

@Public()
@Controller("common")
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get("areas")
  getAreas(@Query("cityName") cityName: string): Areas {
    return this.commonService.getAreas(cityName);
  }

  @Get("cities")
  getCities(): Cities {
    return this.commonService.getCities();
  }

  @Get("filterCriteria")
  getFilterCriteria(): FilterCriteria {
    return this.commonService.getFilterCriteria();
  }

  @Get("positionTypes")
  getPositionTypes(): PositionTypes {
    return this.commonService.getPositionTypes();
  }

  @Get("directionTags")
  getDirectionTags(): DirectionTags {
    return this.commonService.getDirectionTags();
  }

  @Post("sendRecommend")
  sendEmail(@Body() recommend: { userId: string; positionId: string }) {
    return this.commonService.sendRecommend(recommend);
  }

  @Get("verificationCode")
  getVerificationCode(@Query("email") email: string) {
    return this.commonService.getVerificationCode(email);
  }

  @Get("newVersion")
  getNewVersion() {
    return this.commonService.getNewVersion();
  }

  @Post("files")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.commonService.uploadFile(file);
  }

  @Post("avatars")
  @UseInterceptors(FileInterceptor("avatar"))
  uploadAvatar(@UploadedFile() avatar: Express.Multer.File) {
    return this.commonService.uploadAvatar(avatar);
  }

  @Post("payment")
  payment(@Body() { name, total }: { name: string; total: number }) {
    return this.commonService.payment(name, total);
  }

  @Get("payment")
  getPaymentStatus(@Query("outTradeNo") outTradeNo: string) {
    return this.commonService.getPaymentStatus(outTradeNo);
  }
}
