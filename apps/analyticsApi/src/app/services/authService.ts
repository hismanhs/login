/**
 * Services for user authentication and product listing.
 * Handles login, logout, and fetching product data from the backend API.
 */

import axios from 'axios';
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  PRODUCT_LIST_ENDPOINT,
  STATUS_SUCCESS,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  ERROR_INVALID_CREDENTIALS,
  ERROR_ACCOUNT_LOCKED,
  ERROR_GENERIC,
  ERROR_LOGIN_FAILED,
} from '../utils/constants/constants';

// Types for API responses
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

interface LoginResponseData {
  role: string;
  email: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface ProductListResponse {
  products: Product[];
}

// Login API
export const loginApi = async (
  userId: string,
  password: string
): Promise<ApiResponse<LoginResponseData>> => {
  try {
    const response = await axios.post<LoginResponseData>(
      LOGIN_ENDPOINT,
      {
        userId,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (response.status === STATUS_SUCCESS) {
      return { success: true, data: response.data };
    }

    return { success: false, message: ERROR_GENERIC };
  } catch (error: any) {
    if (error.response?.status === STATUS_UNAUTHORIZED) {
      throw new Error(ERROR_INVALID_CREDENTIALS);
    } else if (error.response?.status === STATUS_FORBIDDEN) {
      throw new Error(ERROR_ACCOUNT_LOCKED);
    } else {
      throw new Error(error.response?.data?.message || ERROR_LOGIN_FAILED);
    }
  }
};

// Logout API
export const logoutApi = async (): Promise<string> => {
  try {
    const response = await axios.get(LOGOUT_ENDPOINT, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

// Product List API (Dashboard)
export const getProductListApi = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<ProductListResponse>(
      PRODUCT_LIST_ENDPOINT,
      {
        withCredentials: true,
      }
    );
    return response.data.products;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch product list'
    );
  }
};
