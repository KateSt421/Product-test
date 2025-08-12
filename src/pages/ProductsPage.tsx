import React, { useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import ProductCard from '../components/ProductCard';
import styles from '../assets/styles/ProductsPage.module.css';
import { setPage } from '../store/productsSlice';
import Pagination from '../components/Pagination';

const ProductsPage: React.FC = () => {
  const { items, page, perPage } = useAppSelector((s) => s.products);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let arr = items;
    if (filter === 'liked') arr = arr.filter((p) => p.liked);
    if (query.trim()) arr = arr.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    return arr;
  }, [items, filter, query]);

  const total = Math.ceil(filtered.length / perPage);
  const currentList = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div className={styles.controls}>
        <div>
          <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.active : ''}>All</button>
          <button onClick={() => setFilter('liked')} className={filter === 'liked' ? styles.active : ''}>Liked</button>
        </div>
        <input
          placeholder="Search... (no button)"
          value={query}
          onChange={(e) => { setQuery(e.target.value); dispatch(setPage(1)); }}
        />
      </div>

      <div className={styles.grid}>
        {currentList.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>

      <Pagination page={page} total={total} onChange={(p) => dispatch(setPage(p))} />
    </div>
  );
};

export default ProductsPage;
