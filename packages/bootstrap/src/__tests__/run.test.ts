import {
  INestApplication,
  INestMicroservice,
  ValidationPipe,
} from '@nestjs/common';
import { logger } from '../bootstrap';
import { run } from '../run';

jest.mock('@package/logger');

describe('run', () => {
  let api: Promise<INestApplication>;
  let listen: jest.Mock;
  let service: Promise<INestMicroservice>;
  let useGlobalPipes: jest.Mock;
  let useLogger: jest.Mock;

  beforeEach(() => {
    listen = jest.fn();
    useGlobalPipes = jest.fn();
    useLogger = jest.fn();

    api = Promise.resolve({
      listen,
      useGlobalPipes,
      useLogger,
    }) as unknown as Promise<INestApplication>;

    service = Promise.resolve({
      listen,
      useLogger,
    }) as unknown as Promise<INestMicroservice>;
  });

  describe('when api is set', () => {
    it('should use validation pipe', async () => {
      await run(
        {
          api,
        },
        1000,
        logger,
      );

      expect(useGlobalPipes).toHaveBeenCalledWith(expect.any(ValidationPipe));
    });

    it('should use the correct logger', async () => {
      await run(
        {
          api,
        },
        1000,
        logger,
      );

      expect(useLogger).toHaveBeenCalledWith(logger);
    });

    it('should call listen with the correct port', async () => {
      await run(
        {
          api,
        },
        1000,
        logger,
      );

      expect(listen).toHaveBeenLastCalledWith(1000);
    });
  });

  describe('when service is set', () => {
    it('should use the correct logger', async () => {
      await run(
        {
          service,
        },
        1000,
        logger,
      );

      expect(useLogger).toHaveBeenCalledWith(logger);
    });

    it('should call listen', async () => {
      await run(
        {
          service,
        },
        1000,
        logger,
      );

      expect(listen).toHaveBeenLastCalledWith();
    });
  });
});
