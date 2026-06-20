import apiClient from './apiClient';
import API_ENDPOINTS from '../config/api';

const driverService = {
  async registerDriver(driverData) {
    return apiClient.post(API_ENDPOINTS.DRIVERS.REGISTER, driverData);
  },

  async getProfile() {
    return apiClient.get(API_ENDPOINTS.DRIVERS.GET_PROFILE);
  },

  async updateProfile(profileData) {
    return apiClient.put(API_ENDPOINTS.DRIVERS.UPDATE_PROFILE, profileData);
  },

  async getEarnings() {
    return apiClient.get(API_ENDPOINTS.DRIVERS.GET_EARNINGS);
  },
};

export default driverService;
