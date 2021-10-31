import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaginationModule } from '@package/pagination';
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
    PaginationModule,
  ],
})
class ApiModule {}

export default ApiModule;
