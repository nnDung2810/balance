export class Responses<T> {
  statusCode?: 200 | 500 | 404;
  message?: string;
  data?: T;
  count?: number;
}

export class CommonEntity {
  id?: string;
  created_at?: string;
  updated_at?: string;
  isDeleted?: string;
}

export class PaginationQuery<T = object> {
  perPage?: number;
  page?: number;
  filter?: string | T;
  sorts?: string | T;
  extend?: string | T;
  skip?: string | T;
  fullTextSearch?: string;
}
