import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import PaginationEnum from './pagination.enum';
import {
  calculateOrderBy,
  calculateSkip,
  calculateTake,
} from './pagination.utils';

/**
 * Pagination decorator. Generates paginated query from query params.
 */
const Pagination = createParamDecorator<unknown, ExecutionContext>((_, ctx) => {
  const { query } = ctx.switchToHttp().getRequest<Request>();
  const {
    dir = PaginationEnum.Desc,
    page = PaginationEnum.Page,
    limit = PaginationEnum.Size,
    sortBy,
  } = query;
  const take = calculateTake(limit);
  const skip = calculateSkip(page, take);
  const orderBy = calculateOrderBy(dir, sortBy);

  return {
    orderBy,
    skip,
    take,
  };
});

export default Pagination;
