export class ForgetPasswordActionDto {
  /**
   * 密码
   */
  password: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 验证码
   */
  verificationCode: string;
}
