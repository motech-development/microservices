import { Module } from '@nestjs/common';
import { UserModule } from '../shared/user';
import ServiceController from './service.controller';

@Module({
  controllers: [ServiceController],
  imports: [UserModule],
})
class ServiceModule {}

export default ServiceModule;
