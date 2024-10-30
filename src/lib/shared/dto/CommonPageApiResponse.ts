export type PaginationInfo<T> = {
  items?: T[];
  page: number;
  size: number;
  max_page?: number;
  total_pages?: number;
  total: number;
  last?: number;
  first?: number;
  visible?: number;
  slug?: string;
  address?: string;
};

export type CommonPageApiResponse<T> = {
  data: PaginationInfo<T>;
  lastUpdated: number;
};
