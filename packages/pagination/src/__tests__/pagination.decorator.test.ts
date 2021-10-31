import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ExecutionContext } from '@nestjs/common';
import { paginationFactory } from '../pagination.decorator';

describe('pagination.decorator', () => {
  let ctx: ExecutionContext;

  beforeEach(() => {
    ctx = new ExecutionContextHost([
      {
        query: {},
      },
    ]);
  });

  describe('paginationFactory', () => {
    it('should return the correct data using default values', () => {
      const result = paginationFactory(null, ctx);

      expect(result).toEqual({
        orderBy: {},
        skip: 0,
        take: 10,
      });
    });

    it('should return the correct data using set values', () => {
      ctx = new ExecutionContextHost([
        {
          query: {
            dir: 'asc',
            limit: '20',
            page: '10',
            sortBy: 'name',
          },
        },
      ]);

      const result = paginationFactory(null, ctx);

      expect(result).toEqual({
        orderBy: {
          name: 'asc',
        },
        skip: 180,
        take: 20,
      });
    });
  });
});
