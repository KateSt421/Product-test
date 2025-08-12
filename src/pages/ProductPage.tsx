import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import ProductForm from '../components/ProductForm';
import { updateProduct } from '../store/productsSlice';
import type { Product } from '../types/product';



const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useAppSelector((s) =>
    s.products.items.find((p) => String(p.id) === String(id))
  );

  const [isEditing, setIsEditing] = useState(false);

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Link to="/products">Back</Link>
      </div>
    );
  }

  const onSubmit = (values: Partial<Product>) => {
    const updated: Product = {
      ...product,
      ...values,
      id: product.id,
    } as Product;

    dispatch(updateProduct(updated));
    setIsEditing(false);
    navigate('/products'); // редирект после сохранения
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>{product.title}</h2>
        <div>
          <Link to="/products" style={{ marginRight: 12 }}>
            Back to list
          </Link>
          <button onClick={() => setIsEditing((s) => !s)}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>

      {!isEditing ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: 20,
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: 300, objectFit: 'contain' }}
          />
          <div>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p style={{ whiteSpace: 'pre-wrap' }}>{product.description}</p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            {product.createdAt && (
              <p>
                <em>Created: {product.createdAt}</em>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 8 }}>
          <h3>Edit product</h3>
          <ProductForm
            initial={{
              title: product.title,
              price: product.price,
              description: product.description,
              image: product.image,
              category: product.category,
            }}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;


