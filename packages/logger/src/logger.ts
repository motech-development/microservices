import { Injectable, LoggerService, Scope } from '@nestjs/common';
import {
  config,
  createLogger,
  format,
  Logger as Winston,
  transports,
} from 'winston';

/**
 * Application logger.
 */
@Injectable({
  scope: Scope.TRANSIENT,
})
class Logger implements LoggerService {
  /**
   * Winston instance.
   */
  private winston: Winston;

  constructor() {
    this.winston = createLogger({
      level: process.env.LOG_LEVEL?.toLowerCase() ?? 'http',
      levels: config.npm.levels,
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.splat(),
            format.printf(
              (info) =>
                `${info.timestamp as string} ${info.level}: ${info.message}`,
            ),
          ),
        }),
      ],
    });
  }

  /**
   * Writes info level log message.
   *
   * @param message - Log message.
   * @param optionalParams - Addtional parameters.
   */
  public log(message: string, ...optionalParams: unknown[]): void {
    this.winston.info(message, ...optionalParams);
  }

  /**
   * Writes error level log message.
   *
   * @param message - Log message.
   * @param optionalParams - Addtional parameters.
   */
  public error(message: string, ...optionalParams: unknown[]): void {
    this.winston.error(message, ...optionalParams);
  }

  /**
   * Writes warning level log message.
   *
   * @param message - Log message.
   * @param optionalParams - Addtional parameters.
   */
  public warn(message: string, ...optionalParams: unknown[]): void {
    this.winston.warn(message, ...optionalParams);
  }

  /**
   * Writes debug level log message.
   *
   * @param message - Log message.
   * @param optionalParams - Addtional parameters.
   */
  public debug(message: string, ...optionalParams: unknown[]): void {
    this.winston.debug(message, ...optionalParams);
  }

  /**
   * Writes verbose level log message.
   *
   * @param message - Log message.
   * @param optionalParams - Addtional parameters.
   */
  public verbose(message: string, ...optionalParams: unknown[]): void {
    this.winston.verbose(message, ...optionalParams);
  }

  /**
   * Writes http level log message.
   *
   * @param message - Log message.
   * @param optionalParams - Addtional parameters.
   */
  public http(message: string, ...optionalParams: unknown[]): void {
    this.winston.http(message, ...optionalParams);
  }
}

export default Logger;
