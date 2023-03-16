export class ChangePasswordActionDto {
  /**
   * 密码
   */
  password: string;
  /**
   * 验证码
   */
  verificationCode: string;
}
