import { Global, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {
  authorizationConfig as _authorizationConfig,
  ConfigType,
} from "../config";
import { AUTO_GUARD_KEY } from "./jwt.dec";
import { JwtAuthGuard } from "./jwt.guard";
import { JwtStrategy } from "./jwt.strategy";

export interface AuthOption {
  autoGuard?: boolean;
}

const commonImports = [
  PassportModule,
  JwtModule.registerAsync({
    inject: [_authorizationConfig.KEY],
    useFactory(authorizationConfig: ConfigType<typeof _authorizationConfig>) {
      return {
        secret: authorizationConfig.secret,
        signOptions: {
          expiresIn: authorizationConfig.expiresIn,
        },
      };
    },
  }),
];

const commonProviders = [
  JwtStrategy,
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];

@Global()
@Module({
  imports: [...commonImports],
  providers: [
    ...commonProviders,
    {
      provide: AUTO_GUARD_KEY,
      useValue: true,
    },
  ],
  exports: [...commonImports],
})
export default class AuthModule {
  static forRoot(option?: AuthOption) {
    return {
      module: AuthModule,
      imports: [...commonImports],
      providers: [
        ...commonProviders,
        {
          provide: AUTO_GUARD_KEY,
          useValue: option?.autoGuard ?? true,
        },
      ],
    };
  }
}

export * from "@nestjs/jwt";
export * from "@nestjs/passport";
export {
  authenticate,
  AuthenticateCallback,
  AuthenticateOptions,
  Authenticator,
  authorize,
  AuthorizeCallback,
  deserializeUser,
  DeserializeUserFunction,
  DoneCallback,
  Framework,
  framework,
  initialize,
  InitializeOptions,
  LogInOptions,
  LogOutOptions,
  Passport,
  PassportStatic,
  Profile,
  serializeUser,
  session,
  SessionOptions,
  SessionStrategy,
  SessionStrategyOptions,
  strategies,
  Strategy,
  StrategyCreated,
  StrategyCreatedStatic,
  StrategyFailure,
  transformAuthInfo,
  unuse,
  use,
} from "passport";
export * from "passport-jwt";
export * from "./jwt.dec";
export * from "./jwt.guard";
export * from "./jwt.strategy";
export * from "./user.dto";
