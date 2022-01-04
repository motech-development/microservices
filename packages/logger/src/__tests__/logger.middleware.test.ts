import { Test } from '@nestjs/testing';
import { Request, Response } from 'express';
import morgan from 'morgan';
import Logger from '../logger';
import LoggerMiddleware from '../logger.middleware';

const mockCallback = jest.fn();

jest.mock('../logger');

jest.mock('morgan', () => jest.fn().mockImplementation(() => mockCallback));

describe('logger.middleware', () => {
  let loggerMiddleware: LoggerMiddleware;
  let next: jest.Mock;
  let request: Request;
  let response: Response;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [LoggerMiddleware],
    }).compile();

    loggerMiddleware = app.get(LoggerMiddleware);

    next = jest.fn();

    request = {} as Request;

    response = {} as Response;
  });

  it('should call morgan with the correct args', () => {
    loggerMiddleware.use(request, response, next);

    expect(morgan).toHaveBeenLastCalledWith('combined', {
      stream: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        write: loggerMiddleware.write,
      },
    });
    expect(mockCallback).toHaveBeenCalledWith(request, response, next);
  });

  it('should correctly log a message when written', () => {
    loggerMiddleware.write('Test');

    expect(Logger.prototype.http).toHaveBeenLastCalledWith('Test');
  });
});
