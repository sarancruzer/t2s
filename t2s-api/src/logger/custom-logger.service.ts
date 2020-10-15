import { LoggerService, Logger } from '@nestjs/common';

export class CustomLoggerService extends Logger {

  log(message: string) {
    /* your implementation */
  }
  error(message: string, trace: string) {
    /* your implementation */
    super.error(message, trace);
  }
  warn(message: string) {
    /* your implementation */
  }
  debug(message: string) {
    /* your implementation */
  }
  verbose(message: string) {
    /* your implementation */
  }
}