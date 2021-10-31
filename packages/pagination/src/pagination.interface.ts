export interface IPaginatedResult<T> {
  items: T[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
