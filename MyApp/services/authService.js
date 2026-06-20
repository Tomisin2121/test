import apiClient from './apiClient';
import API_ENDPOINTS from '../config/api';

const authService = {
  async register(userData) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    if (response.data?.token) {
      await apiClient.setToken(response.data.token);
    }
    return response;
  },

  async login(email, password) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    if (response.data?.token) {
      await apiClient.setToken(response.data.token);
    }
    return response;
  },

  async logout() {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {});
    } catch (error) {
      console.warn('Logout API call failed:', error);
    }
    await apiClient.setToken(null);
  },

  async forgotPassword(email) {
    return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  async verifyOTP(email, otp) {
    return apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });
  },

  async resetPassword(email, otp, newPassword) {
    return apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { email, otp, newPassword });
  },

  async refreshToken() {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, {});
    if (response.data?.token) {
      await apiClient.setToken(response.data.token);
    }
    return response;
  },

  async isLoggedIn() {
    const token = await apiClient.getToken();
    return !!token;
  },
};

export default authService;
