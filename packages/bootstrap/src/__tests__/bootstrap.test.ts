import { INestApplication, INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import bootstrap, { logger } from '../bootstrap';
import { run } from '../run';

jest.mock('@package/logger');

jest.mock('@nestjs/core');

jest.mock('../run');

jest.spyOn(logger, 'error');

describe('bootstrap', () => {
  let api: Promise<INestApplication>;
  let env: NodeJS.ProcessEnv;
  let service: Promise<INestMicroservice>;

  beforeEach(() => {
    api = NestFactory.create({});

    env = {
      ...process.env,
    };

    (run as jest.Mock).mockResolvedValue({});

    service = NestFactory.createMicroservice({});
  });

  afterEach(() => {
    process.env = env;
  });

  it('should call run with the correct params', () => {
    bootstrap({
      api,
      service,
    });

    expect(run).toHaveBeenCalledWith(
      {
        api,
        service,
      },
      3000,
      logger,
    );
  });

  it('should call run with the correct port when set', () => {
    bootstrap(
      {
        api,
      },
      9000,
    );

    expect(run).toHaveBeenCalledWith(
      {
        api,
      },
      9000,
      logger,
    );
  });

  it('should call run with the correct port when set with an environment variable', () => {
    process.env.PORT = '8080';

    bootstrap({
      service,
    });

    expect(run).toHaveBeenCalledWith(
      {
        service,
      },
      8080,
      logger,
    );
  });

  it('should catch any errors and log them', async () => {
    const err = new Error('Something went wrong');
    const { message, ...rest } = err;

    (run as jest.Mock).mockRejectedValueOnce(err);

    bootstrap({
      api,
      service,
    });

    await new Promise(setImmediate);

    expect(logger.error).toHaveBeenCalledWith('Something went wrong', rest);
  });
});
