import { Module } from '@nestjs/common';
import PaginationInterceptor from './pagination.interceptor';

/**
 * Pagination module.
 */
@Module({
  exports: [PaginationInterceptor],
  providers: [PaginationInterceptor],
})
class PaginationModule {}

export default PaginationModule;
