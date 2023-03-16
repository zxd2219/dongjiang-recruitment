import { RequestMethod } from "@nestjs/common";

export interface User {
  id: string;
  permissions?: Array<[string, RequestMethod]>;
}
