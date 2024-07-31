export type Page<T> = {
  items: T[];
  error: boolean;
  error_message: string;
  first: boolean;
  last: boolean;
  max_page: number;
  page: number;
  size: number;
  total: number;
  total_pages: number;
  visible: number;
};
