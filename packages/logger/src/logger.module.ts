import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import Logger from './logger';
import LoggerMiddleware from './logger.middleware';

/**
 * Logger module.
 */
@Module({
  exports: [Logger],
  providers: [Logger],
})
class LoggerModule implements NestModule {
  // eslint-disable-next-line class-methods-use-this
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

export default LoggerModule;
