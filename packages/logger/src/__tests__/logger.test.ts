import { Test } from '@nestjs/testing';
import { config, format, transports } from 'winston';
import Logger from '../logger';

const mockDebug = jest.fn<string, unknown[]>();
const mockError = jest.fn<string, unknown[]>();
const mockHttp = jest.fn<string, unknown[]>();
const mockInfo = jest.fn<string, unknown[]>();
const mockVerbose = jest.fn<string, unknown[]>();
const mockWarn = jest.fn<string, unknown[]>();
const mockCreateLogger = jest.fn<unknown, unknown[]>().mockReturnValue({
  debug: (message: string, ...optionalParams: unknown[]) =>
    mockDebug(message, optionalParams),
  error: (message: string, ...optionalParams: unknown[]) =>
    mockError(message, optionalParams),
  http: (message: string, ...optionalParams: unknown[]) =>
    mockHttp(message, optionalParams),
  info: (message: string, ...optionalParams: unknown[]) =>
    mockInfo(message, optionalParams),
  verbose: (message: string, ...optionalParams: unknown[]) =>
    mockVerbose(message, optionalParams),
  warn: (message: string, ...optionalParams: unknown[]) =>
    mockWarn(message, optionalParams),
});

jest.mock('winston', () => {
  const winston = jest.requireActual<Record<string, unknown>>('winston');

  return {
    ...winston,
    createLogger: (opts: Record<string, unknown>) => mockCreateLogger(opts),
    format: {
      colorize: jest.fn(),
      combine: jest.fn(),
      printf: jest.fn(),
      splat: jest.fn(),
      timestamp: jest.fn(),
    },
    transports: {
      Console: jest.fn(),
    },
  };
});

describe('logger', () => {
  let logger: Logger;
  let env: NodeJS.ProcessEnv;

  beforeEach(async () => {
    env = {
      ...process.env,
    };

    const app = await Test.createTestingModule({
      providers: [Logger],
    }).compile();

    logger = await app.resolve(Logger);
  });

  afterEach(() => {
    process.env = env;
  });

  it('should init Winston with the correct settings', () => {
    expect(mockCreateLogger).toHaveBeenCalledWith({
      level: 'http',
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
  });

  it('should init Winston with the correct log level when set', async () => {
    process.env.LOG_LEVEL = 'INFO';

    const app = await Test.createTestingModule({
      providers: [Logger],
    }).compile();

    logger = await app.resolve(Logger);

    expect(mockCreateLogger).toHaveBeenCalledWith({
      level: 'info',
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
  });

  it('should call winston.info with the correct args', () => {
    logger.log('Message', 'Additional', {
      info: true,
    });

    expect(mockInfo).toHaveBeenCalledWith('Message', [
      'Additional',
      {
        info: true,
      },
    ]);
  });

  it('should call winston.error with the correct args', () => {
    logger.error('Message', 'Additional', {
      error: true,
    });

    expect(mockError).toHaveBeenCalledWith('Message', [
      'Additional',
      {
        error: true,
      },
    ]);
  });

  it('should call winston.warn with the correct args', () => {
    logger.warn('Message', 'Additional', {
      warn: true,
    });

    expect(mockWarn).toHaveBeenCalledWith('Message', [
      'Additional',
      {
        warn: true,
      },
    ]);
  });

  it('should call winston.debug with the correct args', () => {
    logger.debug('Message', 'Additional', {
      debug: true,
    });

    expect(mockDebug).toHaveBeenCalledWith('Message', [
      'Additional',
      {
        debug: true,
      },
    ]);
  });

  it('should call winston.verbose with the correct args', () => {
    logger.verbose('Message', 'Additional', {
      verbose: true,
    });

    expect(mockVerbose).toHaveBeenCalledWith('Message', [
      'Additional',
      {
        verbose: true,
      },
    ]);
  });

  it('should call winston.http with the correct args', () => {
    logger.http('Message', 'Additional', {
      http: true,
    });

    expect(mockHttp).toHaveBeenCalledWith('Message', [
      'Additional',
      {
        http: true,
      },
    ]);
  });
});
