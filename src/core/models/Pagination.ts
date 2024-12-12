export interface SearchParams {
  q?: string;
}

export interface PaginationParams extends SearchParams {
  page?: number;
}

export interface Pagination<T> {
  data: T[];
  total: number;
  page: number;
  totalPerPage: number;
  lastPage: number;
}
