import axios from 'axios';
import type { Product } from '../types/product';

const API = axios.create({ baseURL: 'https://fakestoreapi.com' });

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await API.get('/products');
  return res.data as Product[];
};

export default { fetchProducts };
