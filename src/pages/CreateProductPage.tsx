import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import ProductForm from '../components/ProductForm';
import { addProduct } from '../store/productsSlice';
import type { Product } from '../types/product';

const CreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreate = (values: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...values,
      id: Date.now(), // локальный id, т.к. API мы не дергаем
      createdAt: new Date().toISOString(),
    };

    dispatch(addProduct(newProduct));
    navigate('/products');
  };

  return (
    <div>
      <h2>Create new product</h2>
      <ProductForm onSubmit={handleCreate} />
      <div style={{ marginTop: 12 }}>
        <Link to="/products">Back to list</Link>
      </div>
    </div>
  );
};

export default CreateProductPage;

