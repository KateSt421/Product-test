import React, { useState } from 'react';
import styles from '../assets/styles/ProductForm.module.css';
import type { Product } from '../types/product';

type ProductFormProps = {
  initial?: Partial<Product>;
  onSubmit: (values: Omit<Product, 'id'>) => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ initial, onSubmit }) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [price, setPrice] = useState(initial?.price?.toString() || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [image, setImage] = useState(initial?.image || '');
  const [category, setCategory] = useState(initial?.category || '');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0)
      newErrors.price = 'Price must be a positive number';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!image.trim()) newErrors.image = 'Image URL is required';
    if (!category.trim()) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      price: parseFloat(price),
      description: description.trim(),
      image: image.trim(),
      category: category.trim(),
    } as Omit<Product, 'id'>);

    // Reset only if it's a create form
    if (!initial) {
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.field}>
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <span className={styles.error}>{errors.price}</span>}
      </div>

      <div className={styles.field}>
        <label>Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <span className={styles.error}>{errors.description}</span>
        )}
      </div>

      <div className={styles.field}>
        <label>Image URL</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {errors.image && <span className={styles.error}>{errors.image}</span>}
      </div>

      <div className={styles.field}>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && (
          <span className={styles.error}>{errors.category}</span>
        )}
      </div>

      <button type="submit" className={styles.submitBtn}>
        {initial ? 'Save changes' : 'Create product'}
      </button>
    </form>
  );
};

export default ProductForm;

