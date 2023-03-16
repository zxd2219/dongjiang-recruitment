import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import * as dayjs from "dayjs";
import { Request, Response } from "express";
import { map, Observable } from "rxjs";
import { Response as _Response } from "./response.dto";

export class TransformNormalInterceptor<T>
  implements NestInterceptor<T, _Response<Record<string, unknown>>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<_Response<Record<string, unknown>>> {
    return next.handle().pipe(
      map<T, _Response<Record<string, unknown>>>((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response<_Response<T>>>();
        const request = ctx.getRequest<Request>();
        const message = HttpStatus[response.statusCode];

        return {
          requestId: request.params["reqid"],
          timestamp: dayjs().toISOString(),
          status: response.statusCode,
          message: message,
          body: instanceToPlain(data),
        };
      })
    );
  }
}
