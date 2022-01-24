import { Injectable, HttpException } from '@nestjs/common';
import { successResponse } from './interfaces/response.interface';
@Injectable()
export class ResponseService {
  successResponse(statusCode: number, message: {}) {
    const result: successResponse = {
      statusCode,
      message,
    };
    return result;
  }
  exceptionResponse(httpStatus: number, message: string) {
    throw new HttpException(message, httpStatus);
  }
}
