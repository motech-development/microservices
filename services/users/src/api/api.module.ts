import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerModule } from '@motech-development/logger';
import { PaginationModule } from '@motech-development/pagination';
import ApiController from './api.controller';

@Module({
  controllers: [ApiController],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        options: {
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
          urls: ['amqp://localhost:5672'],
        },
        transport: Transport.RMQ,
      },
    ]),
    LoggerModule,
    PaginationModule,
  ],
})
class ApiModule {}

export default ApiModule;
