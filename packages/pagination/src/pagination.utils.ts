import PaginationEnum from './pagination.enum';

/**
 * Calculates the number of items to take and ensures min and max ranges are respected.
 *
 * @param limit - Number of items to return.
 * @returns Number of items to take.
 */
export const calculateTake = (limit: unknown): number => {
  const value = Number(limit);

  if (value > PaginationEnum.Max) {
    return PaginationEnum.Max;
  }

  if (value < PaginationEnum.Min) {
    return PaginationEnum.Min;
  }

  return value;
};

/**
 * Calculates how many items to skip based on page number and items to take.
 *
 * @param page - Page number.
 * @param take - Number of items to take.
 * @returns Number of items to skip.
 */
export const calculateSkip = (page: unknown, take: number): number => {
  const value = Number(page);

  return take * (value - 1);
};

/** Ordering object. */
export interface ICalculateOrderBy {
  /** Property to order by */
  [name: string]: unknown;
}

/**
 * Generates order by object.
 *
 * @param dir - Direction to order results by.
 * @param sortBy - Property to sort by.
 * @returns Order by object
 */
export const calculateOrderBy = (
  dir: unknown,
  sortBy?: unknown,
): ICalculateOrderBy => {
  if (sortBy) {
    const value = String(sortBy);

    return {
      [value]: dir,
    };
  }

  return {};
};

export const calculatePages = (total: number, limit: number): number =>
  total > 0 ? Math.ceil(total / limit) : 0;
