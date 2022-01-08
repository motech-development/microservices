import { Module } from '@nestjs/common';
import { PrismaModule } from '@motech-development/prisma';
import UserService from './user.service';

@Module({
  exports: [UserService],
  imports: [PrismaModule],
  providers: [UserService],
})
class UserModule {}

export default UserModule;
