export type Product = {
  id: number | string; // id from API (number) or locally created (string e.g. 'local-1')
  title: string;
  price: number;
  description: string;
  category?: string;
  image: string;
  liked?: boolean;
  createdAt?: string;
};
