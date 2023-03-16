import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "../config";
import _authorizationConfig from "../config/authorization.config";
import { User } from "./user.dto";

interface JwtPayload {
  /**
   * 用户ID
   */
  uid: string;
  /**
   * 权限列表
   */
  pms: User["permissions"];
  /**
   * 签发时间
   */
  iat: number;
  /**
   * 过期时间
   */
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(_authorizationConfig.KEY)
    readonly authorizationConfig: ConfigType<typeof _authorizationConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authorizationConfig.secret,
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        ignoreNotBefore: true,
      },
    });
  }

  validate(payload: JwtPayload): User {
    return {
      id: payload.uid,
      permissions: payload.pms,
    };
  }
}
