import { MiddlewareConsumer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import Logger from '../logger';
import LoggerMiddleware from '../logger.middleware';
import LoggerModule from '../logger.module';

describe('logger.module', () => {
  let apply: jest.Mock;
  let consumer: MiddlewareConsumer;
  let forRoutes: jest.Mock;
  let logger: Logger;
  let loggerModule: LoggerModule;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [LoggerModule],
    }).compile();

    forRoutes = jest.fn();

    apply = jest.fn().mockReturnValue({
      forRoutes,
    });

    consumer = {
      apply,
    };

    logger = await app.resolve(Logger);

    loggerModule = app.get(LoggerModule);
  });

  it('should contain the correct providers', () => {
    expect(logger).toBeDefined();
  });

  it('should apply logger middleware for all routes', () => {
    loggerModule.configure(consumer);

    expect(apply).toHaveBeenLastCalledWith(LoggerMiddleware);
    expect(forRoutes).toHaveBeenCalledWith('*');
  });
});
