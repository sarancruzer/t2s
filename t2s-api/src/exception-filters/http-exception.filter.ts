import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let message = "";
    let errors = "";

    console.log('HttpExceptionFilter -> exception.message', exception.message);
      
    if(exception.message && exception.message.message) {       
       message = exception.message.message;
    }
    if(exception.message && exception.message.errors) {
      errors = exception.message.errors;
    }
    if(exception.message && exception.message.error) {
       errors = exception.message.error;
    }

    if(exception.message && exception.message.message) {       
      if(exception.message.message === "TokenExpiredError") {
        message = "Invalid token or Token expired!";
      }else if(exception.message.message === "JsonWebTokenError") {
        message = "Invlid token or Invalid secretkey!";
      }
   }

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message:message,
        errors:errors
      });
  }
}