// Backend API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  // Users endpoints
  USERS: {
    GET_PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,
  },
  // Drivers endpoints
  DRIVERS: {
    REGISTER: `${API_BASE_URL}/drivers/register`,
    GET_PROFILE: `${API_BASE_URL}/drivers/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/drivers/profile`,
    GET_EARNINGS: `${API_BASE_URL}/drivers/earnings`,
  },
  // Routes endpoints
  ROUTES: {
    GET_ALL: `${API_BASE_URL}/routes`,
    GET_BY_ID: (id) => `${API_BASE_URL}/routes/${id}`,
    SEARCH: `${API_BASE_URL}/routes/search`,
  },
  // Napep endpoints
  NAPEP: {
    GET_NEAREST: `${API_BASE_URL}/napep/nearest`,
    GET_ALL: `${API_BASE_URL}/napep`,
  },
  // Payments endpoints
  PAYMENTS: {
    CREATE: `${API_BASE_URL}/payments`,
    GET_HISTORY: `${API_BASE_URL}/payments/history`,
    GET_RECEIPT: (id) => `${API_BASE_URL}/payments/${id}/receipt`,
  },
};

export default API_ENDPOINTS;
