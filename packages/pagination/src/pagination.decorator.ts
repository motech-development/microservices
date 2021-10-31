import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomParamFactory } from '@nestjs/common/interfaces';
import { Request } from 'express';
import PaginationEnum from './pagination.enum';
import {
  calculateOrderBy,
  calculateSkip,
  calculateTake,
  ICalculateOrderBy,
} from './pagination.utils';

/** Paginated query object. */
export interface IPaginationDecorator {
  /** Ordering object. */
  orderBy: ICalculateOrderBy;
  /** Number of items to skip. */
  skip: number;
  /** Number of items to take. */
  take: number;
}

/**
 * Pagination decorator factory.
 *
 * @param _ - Decorator data.
 * @param ctx - Execution context.
 * @returns Pagination query object.
 */
export const paginationFactory: CustomParamFactory<
  unknown,
  ExecutionContext,
  IPaginationDecorator
> = (_, ctx) => {
  const { query } = ctx.switchToHttp().getRequest<Request>();
  const {
    dir = PaginationEnum.Desc,
    limit = PaginationEnum.Size,
    page = PaginationEnum.Page,
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
};

/**
 * Pagination decorator. Generates paginated query from query params.
 */
const Pagination = createParamDecorator<
  unknown,
  ExecutionContext,
  IPaginationDecorator
>(paginationFactory);

export default Pagination;
