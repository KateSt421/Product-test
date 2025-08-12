// src/components/ProductCard.tsx
import React from 'react';
import type { Product } from '../types/product';
import styles from '../assets/styles/ProductCard.module.css';
import { useAppDispatch } from '../hooks';
import { toggleLike, removeProduct } from '../store/productsSlice';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return; // Игнор кликов по кнопкам
    navigate(`/products/${product.id}`);
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(toggleLike({ id: product.id }));
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(removeProduct({ id: product.id }));
  };

  return (
    <article
      className={styles.card}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') handleCardClick(e as unknown as React.MouseEvent);
      }}

    >
      <div className={styles.media}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.topInfo}>
          <h3 className={styles.title}>{product.title}</h3>
          {product.category && (
            <span className={styles.category}>{product.category}</span>
          )}
          <div className={styles.price}>
            ${Number(product.price).toFixed(2)}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.icon} ${product.liked ? styles.liked : ''}`}
            onClick={handleLike}
            aria-label={product.liked ? 'Unlike' : 'Like'}
            aria-pressed={!!product.liked}
          >
            {product.liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>

          <button
            type="button"
            className={`${styles.icon} ${styles.delete}`}
            onClick={handleRemove}
            aria-label="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;