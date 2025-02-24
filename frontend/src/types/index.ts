export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
}

export interface Supplier {
  id: string;
  name: string;
  description: string;
}

export interface Quote {
  id: string;
  amount: string;
  created: string;
  title: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
