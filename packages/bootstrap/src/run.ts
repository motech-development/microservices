import {
  INestApplication,
  INestMicroservice,
  ValidationPipe,
} from '@nestjs/common';
import { Logger } from '@motech-development/logger';

/** Application bootstrap options. */
export interface IApplications {
  /** Nest API application */
  api?: Promise<INestApplication>;
  /** Nest microservice application */
  service?: Promise<INestMicroservice>;
}

/**
 * Factory that runs applications.
 *
 * @param applications - API and service applications.
 * @param port - API port number.
 * @param logger - Application logger.
 */
export const run = async (
  applications: IApplications,
  port: number,
  logger: Logger,
): Promise<void> => {
  const { api, service } = applications;

  if (api) {
    const internalApi = await api;

    internalApi.useGlobalPipes(new ValidationPipe());

    internalApi.useLogger(logger);

    await internalApi.listen(port);
  }

  if (service) {
    const internalService = await service;

    internalService.useLogger(logger);

    await internalService.listen();
  }
};
