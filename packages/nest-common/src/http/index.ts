import { Module } from "@nestjs/common";
import { ClientModule } from "./client.module";
import { HttpModule as _HttpModule } from "./http.module";

@Module({
  imports: [_HttpModule, ClientModule],
})
export default class HttpModule {}

export * from "./client.module";
export * from "./http.module";
