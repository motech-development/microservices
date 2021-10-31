import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { cold } from 'jest-marbles';
import PaginationInterceptor from '../pagination.interceptor';

describe('pagination.interceptor', () => {
  let next: CallHandler<[number, string[]]>;
  let ctx: ExecutionContext;
  let paginationInterceptor: PaginationInterceptor<string>;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [PaginationInterceptor],
    }).compile();

    paginationInterceptor = app.get(PaginationInterceptor);

    next = {
      handle: () =>
        cold('a', {
          a: [2, ['A', 'B']],
        }),
    };
  });

  it('should transform response to the correct paginated shape using default values', () => {
    ctx = new ExecutionContextHost([
      {
        query: {},
      },
    ]);

    const result$ = paginationInterceptor.intercept(ctx, next);
    const expected$ = cold('a', {
      a: {
        items: ['A', 'B'],
        limit: 10,
        page: 1,
        pages: 1,
        total: 2,
      },
    });

    expect(result$).toBeObservable(expected$);
  });

  it('should transform response to the correct paginated shape using set values', () => {
    ctx = new ExecutionContextHost([
      {
        query: {
          dir: 'asc',
          limit: '2',
          page: '1',
          sortBy: 'name',
        },
      },
    ]);

    const result$ = paginationInterceptor.intercept(ctx, next);
    const expected$ = cold('a', {
      a: {
        items: ['A', 'B'],
        limit: 5,
        page: 1,
        pages: 1,
        total: 2,
      },
    });

    expect(result$).toBeObservable(expected$);
  });
});
