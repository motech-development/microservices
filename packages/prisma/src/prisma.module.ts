import { Module } from '@nestjs/common';
import PrismaService from './prisma.service';

/**
 * Prisma module.
 */
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
class PrismaModule {}

export default PrismaModule;
