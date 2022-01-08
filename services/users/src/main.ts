import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { bootstrap } from '@motech-development/bootstrap';
import { ApiModule } from './api';
import { ServiceModule } from './service';

const api = NestFactory.create(ApiModule, {
  bufferLogs: true,
});
const service = NestFactory.createMicroservice(ServiceModule, {
  bufferLogs: true,
  options: {
    queue: 'user_queue',
    queueOptions: {
      durable: false,
    },
    urls: ['amqp://localhost:5672'],
  },
  transport: Transport.RMQ,
});

bootstrap(
  {
    api,
    service,
  },
  3000,
);
