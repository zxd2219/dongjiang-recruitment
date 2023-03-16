import {
  ApiClient,
  BaseHttpRequest,
  OpenAPIConfig,
} from "@dongjiang-recruitment/service-common";
import { Global, Injectable, Module, Scope } from "@nestjs/common";
import { ConfigType, serviceConfig as _serviceConfig } from "../config";

@Injectable({ scope: Scope.REQUEST })
export class ServiceClient extends ApiClient {
  constructor(
    private readonly serviceConfig: ConfigType<typeof _serviceConfig>,
    config?: Partial<OpenAPIConfig>,
    HttpRequest?: new (config: OpenAPIConfig) => BaseHttpRequest
  ) {
    super(
      {
        ...config,
        BASE: config?.BASE || serviceConfig.baseUrl,
      },
      HttpRequest
    );
  }
  async loginAsAdmin() {
    const { token } = (
      await this.authentication.loginAccount({
        requestBody: {
          userName: this.serviceConfig.username,
          password: this.serviceConfig.password,
        },
      })
    ).body;
    this.request.config.TOKEN = token;
  }
}

@Global()
@Module({
  providers: [
    {
      provide: ServiceClient,
      scope: Scope.REQUEST,
      inject: [_serviceConfig.KEY],
      useFactory(serviceConfig: ConfigType<typeof _serviceConfig>) {
        return new ServiceClient(serviceConfig);
      },
    },
  ],
  exports: [ServiceClient],
})
export class ClientModule {}

export * from "@dongjiang-recruitment/service-common";
