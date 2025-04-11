// API Endpoints
export const API_BASE_URL = 'http://localhost:5000/auth';
export const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;
export const LOGOUT_ENDPOINT = `${API_BASE_URL}/logout`;
export const PRODUCT_LIST_ENDPOINT = `${API_BASE_URL}/product`;

// General Messages
export const ERROR_INVALID_CREDENTIALS = 'Invalid credentials. Please check your user ID and password.';
export const ERROR_ACCOUNT_LOCKED = 'Your account is locked. Please contact support.';
export const ERROR_GENERIC = 'An unexpected error occurred. Please try again later.';
export const ERROR_LOGIN_FAILED = 'Login failed. Please try again.';

// Status Codes
export const STATUS_SUCCESS = 200;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_FORBIDDEN = 403;

// Ideal Logout 
export const IDLE_TIMEOUT_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds   
export const IDLE_TIMEOUT_DISPLAY_POPUP = true; // Set to false to log out directly


export const STATIC_TEXT = {
    pageTitle: 'JPMC Graphite',
    pageSubtitle: 'Welcome to the new login page of JPMC Graphite',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    loginButton: 'Login',
};


  export const MESSAGES = {
  errors: {
    missingCredentials: 'Input complete credentials - user id/ password.',
    passwordValidation: 'Please fix the password error before submitting.',
    loginFailed: 'Login failed. Due to server unavaible',
  },
  success: {
    welcomeMessage: 'Welcome to the dashboard!',
  },
};