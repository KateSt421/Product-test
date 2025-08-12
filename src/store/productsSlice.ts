import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product';
import api from '../api/productsApi';

type State = {
  items: Product[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  page: number;
  perPage: number;
};

const initialState: State = {
  items: [],
  status: 'idle',
  page: 1,
  perPage: 8,
};

export const loadProducts = createAsyncThunk('products/load', async () => {
  const data = await api.fetchProducts();
  return data as Product[];
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<{ id: number | string }>) {
      const p = state.items.find((i) => i.id === action.payload.id);
      if (p) p.liked = !p.liked;
    },
    removeProduct(state, action: PayloadAction<{ id: number | string }>) {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.items = state.items.map((i) => (i.id === action.payload.id ? action.payload : i));
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (s) => {
        s.status = 'loading';
      })
      .addCase(loadProducts.fulfilled, (s, a) => {
        s.status = 'succeeded';
        // normalize API products slightly (set liked false by default)
        s.items = a.payload.map((p) => ({ ...p, liked: false }));
      })
      .addCase(loadProducts.rejected, (s) => {
        s.status = 'failed';
      });
  },
});

export const { toggleLike, removeProduct, addProduct, updateProduct, setPage } = productsSlice.actions;
export default productsSlice.reducer;
