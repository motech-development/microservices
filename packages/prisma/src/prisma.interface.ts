/** Result ordering. */
export type TOrder = 'asc' | 'desc';

/** Paginated query input. */
export interface IPaginated {
  /** Ordering object. */
  orderBy: {
    [name: string]: TOrder;
  };
  /** Number of items to skip. */
  skip: number;
  /** Number of items to take. */
  take: number;
}

/** Paginated result. */
export type TPaginatedResult<T> = [number, T[]];
