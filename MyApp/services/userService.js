import apiClient from './apiClient';
import API_ENDPOINTS from '../config/api';

const userService = {
  async getProfile() {
    return apiClient.get(API_ENDPOINTS.USERS.GET_PROFILE);
  },

  async updateProfile(profileData) {
    return apiClient.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, profileData);
  },

  async changePassword(oldPassword, newPassword) {
    return apiClient.post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    });
  },
};

export default userService;
