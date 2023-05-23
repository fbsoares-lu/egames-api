export interface IPaginationRequest {
  data: any;
  page: number;
  total: number;
  pageSize: number;
}

export interface IPaginationResponse {
  data: any;
  currentPage: number;
  total: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export class PaginationResponse {
  static handle({
    data,
    page,
    total,
    pageSize,
  }: IPaginationRequest): IPaginationResponse {
    const lastPage = Math.ceil(total / pageSize);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: [...data],
      currentPage: page,
      total,
      nextPage,
      prevPage,
      lastPage,
    };
  }
}
