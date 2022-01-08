import { Logger } from '@motech-development/logger';
import { IApplications, run } from './run';

export const logger = new Logger();

/**
 * Helper function that bwootstraps applications.
 *
 * @param applications - API and service applications.
 * @param defautPort - Default API port number.
 */
const bootstrap = (applications: IApplications, defautPort = 3000): void => {
  const port = process.env.PORT ? Number(process.env.PORT) : defautPort;

  run(applications, port, logger).catch((err: Error) => {
    const { message, ...rest } = err;

    logger.error(err.message, rest);
  });
};

export default bootstrap;
