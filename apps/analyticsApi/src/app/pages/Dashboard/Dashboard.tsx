import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutApi, getProductListApi } from '../../services/authService';
import Header from '../../components/Header';
import useIdleDetection from '../../utils/hooks/useIdleDetection';
import {
  IDLE_TIMEOUT_DURATION,
  IDLE_TIMEOUT_DISPLAY_POPUP,
} from '../../utils/constants/constants';
import './Dashboard.css';
import { ButtonLogin } from '@react-monorepo/shared';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
      navigate('/');
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    }
  };

  const { isIdle, closePopup } = useIdleDetection({
    timeout: IDLE_TIMEOUT_DURATION,
    displayMsg: IDLE_TIMEOUT_DISPLAY_POPUP,
    onLogout: handleLogout,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductListApi();
        setProducts(response);
        setError(null);
      } catch (err: unknown) {
        const error = err as Error;
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handlePopupLogout = () => {
    closePopup();
    handleLogout();
  };

  return (
    <div className="dashboard-container">
      <Header title="Dashboard - Product-List" onLogout={handleLogout} />

      {isIdle && (
        <div className="idle-popup-overlay">
          <div className="idle-popup">
            <p className="idle-popup-message">
              Dear user, you have been idle for more than 2 minutes. Please log
              in again.
            </p>

            <ButtonLogin
              text={'Logout'}
              onClick={handlePopupLogout}
              appearance="solid"
              sentiment="negative"
              className="full-width"
            />
          </div>
        </div>
      )}

      <main className="main-content">
        {error && <div className="error-message">{error}</div>}

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h2 className="product-title">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-category">Category: {product.category}</p>
                <ButtonLogin
                  text={'Apply Now'}
                  appearance="solid"
                  sentiment="caution"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
