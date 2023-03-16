import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { Response as _Response } from "./response.dto";

@Catch()
export class TransformExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const ctxResponse = ctx.getResponse<Response<_Response<never>>>();

    if (exception instanceof HttpException) {
      const exceptionName = exception.name;
      const exceptionStatus = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      ctxResponse.status(exception.getStatus()).json({
        timestamp: new Date().toISOString(),
        status: exceptionStatus,
        message: exceptionName,
        error:
          typeof exceptionResponse === "string"
            ? exceptionResponse
            : (exceptionResponse["message"] as Array<string>),
      });
    } else if (exception instanceof Error) {
      console.error(exception);
      ctxResponse.status(500).json({
        timestamp: new Date().toISOString(),
        status: 500,
        message: exception.name,
        error: exception.message,
      });
    }
  }
}
