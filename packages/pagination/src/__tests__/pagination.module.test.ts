import { Test } from '@nestjs/testing';
import PaginationInterceptor from '../pagination.interceptor';
import PaginationModule from '../pagination.module';

describe('pagination.module', () => {
  let paginationInterceptor: PaginationInterceptor<string>;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [PaginationModule],
    }).compile();

    paginationInterceptor = app.get(PaginationInterceptor);
  });

  it('should contain the correct providers', () => {
    expect(paginationInterceptor).toBeDefined();
  });
});
