import apiClient from './apiClient';
import API_ENDPOINTS from '../config/api';

const paymentService = {
  async createPayment(paymentData) {
    return apiClient.post(API_ENDPOINTS.PAYMENTS.CREATE, paymentData);
  },

  async getPaymentHistory() {
    return apiClient.get(API_ENDPOINTS.PAYMENTS.GET_HISTORY);
  },

  async getReceipt(paymentId) {
    return apiClient.get(API_ENDPOINTS.PAYMENTS.GET_RECEIPT(paymentId));
  },
};

export default paymentService;
