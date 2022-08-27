/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    const exceptionResponse: any = exception.getResponse();
    let validatorMessage = exceptionResponse.message;
    if (typeof validatorMessage === 'object') {
      validatorMessage = exceptionResponse.message[0];
    }
    response.status(status).json({
      code: status,
      message: validatorMessage || message,
    });
  }
}
