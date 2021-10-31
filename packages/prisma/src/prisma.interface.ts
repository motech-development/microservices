export type TOrder = 'asc' | 'desc';

export interface IPaginated {
  orderBy: {
    [name: string]: TOrder;
  };
  skip: number;
  take: number;
}

export type TPaginatedResult<T> = [number, T[]];
