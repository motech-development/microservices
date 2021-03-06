import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import Logger from './logger';

/**
 * Logger middleware.
 *
 * Intercept Express router requests and logs them.
 */
@Injectable()
class LoggerMiddleware implements NestMiddleware<Request, Response> {
  /**
   * Logger instance.
   */
  private readonly logger = new Logger();

  /**
   * Write log message.
   *
   * @param message - Message to be logged.
   */
  public write = (message: string): void => {
    this.logger.http(message);
  };

  /**
   * Express middlware.
   *
   * @param req - Express request.
   * @param res - Express response.
   * @param next - Next function.
   */
  public use(req: Request, res: Response, next: NextFunction): void {
    morgan('combined', {
      stream: {
        write: this.write,
      },
    })(req, res, next);
  }
}

export default LoggerMiddleware;
