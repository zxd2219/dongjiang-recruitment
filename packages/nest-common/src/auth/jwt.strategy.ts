import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as zlib from "zlib";
import { ConfigType } from "../config";
import _authorizationConfig from "../config/authorization.config";
import { DetailId, User } from "./user.dto";

interface JwtPayload {
  /**
   * ID
   */
  id: string;
  /**
   * DID
   */
  did: DetailId;
  /**
   * 权限
   */
  auth: string;
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
    const { id, auth: _auth, did } = payload;
    const auth = JSON.parse(
      zlib.unzipSync(Buffer.from(_auth, "base64")).toString()
    ) as User["authorities"];

    return {
      id: id,
      detailId: did,
      authorities: auth,
    };
  }
}
