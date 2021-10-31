/* eslint-disable class-methods-use-this */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import PaginationEnum from './pagination.enum';
import { calculatePages, calculateTake } from './pagination.utils';

export interface IPaginatedResult<T> {
  /** List of items returned. */
  items: T[];
  /** Maximum number of items to be returned. */
  limit: number;
  /** Current page number. */
  page: number;
  /** Total number of pages available. */
  pages: number;
  /** Total number of items available. */
  total: number;
}

/**
 * Transforms response into a paginated response.
 */
@Injectable()
class PaginationInterceptor<T>
  implements NestInterceptor<[number, T[]], IPaginatedResult<T>>
{
  public intercept(
    ctx: ExecutionContext,
    next: CallHandler<[number, T[]]>,
  ): Observable<IPaginatedResult<T>> {
    const { query } = ctx.switchToHttp().getRequest<Request>();
    const { limit = PaginationEnum.Size, page = PaginationEnum.Page } = query;
    const take = calculateTake(limit);

    return next.handle().pipe(
      map(([total, items]) => {
        const pages = calculatePages(total, take);

        return {
          items,
          limit: take,
          page: Number(page),
          pages,
          total,
        };
      }),
    );
  }
}

export default PaginationInterceptor;
