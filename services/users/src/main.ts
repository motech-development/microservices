import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ApiModule } from './api';
import { ServiceModule } from './service';

async function bootstrap() {
  const api = await NestFactory.create(ApiModule);
  const service = await NestFactory.createMicroservice(ServiceModule, {
    options: {
      queue: 'user_queue',
      queueOptions: {
        durable: false,
      },
      urls: ['amqp://localhost:5672'],
    },
    transport: Transport.RMQ,
  });

  await api.listen(3000);

  await service.listen();
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
