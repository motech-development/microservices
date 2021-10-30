export type TOrder = 'asc' | 'desc';

export interface IPaginated {
  orderBy?: TOrder;
  skip?: number;
  take?: number;
}
