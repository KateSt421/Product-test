import React from 'react';
import styles from '../assets/styles/Pagination.module.css';

type PaginationProps = {
  page: number;                 // текущая страница
  total: number;                // общее количество страниц
  onChange: (page: number) => void; // коллбэк при смене страницы
};

const Pagination: React.FC<PaginationProps> = ({ page, total, onChange }) => {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  const goTo = (p: number) => {
    if (p < 1 || p > total) return;
    onChange(p);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageBtn}
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="previous page"
      >
        ← Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.pageBtn} ${p === page ? styles.active : ''}`}
          onClick={() => goTo(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className={styles.pageBtn}
        onClick={() => goTo(page + 1)}
        disabled={page === total}
        aria-label="next page"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
