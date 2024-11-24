export interface Pagination<T> {
  data: T[];
  total: number;
  page: number;
  totalPerPage: number;
  lastPage: number;
}
