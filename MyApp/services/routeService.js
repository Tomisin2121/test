import apiClient from './apiClient';
import API_ENDPOINTS from '../config/api';

const routeService = {
  async getAllRoutes() {
    return apiClient.get(API_ENDPOINTS.ROUTES.GET_ALL);
  },

  async getRouteById(id) {
    return apiClient.get(API_ENDPOINTS.ROUTES.GET_BY_ID(id));
  },

  async searchRoutes(query) {
    return apiClient.get(`${API_ENDPOINTS.ROUTES.SEARCH}?q=${encodeURIComponent(query)}`);
  },

  async getNearestNapep(latitude, longitude) {
    return apiClient.get(`${API_ENDPOINTS.NAPEP.GET_NEAREST}?lat=${latitude}&lng=${longitude}`);
  },

  async getAllNapep() {
    return apiClient.get(API_ENDPOINTS.NAPEP.GET_ALL);
  },
};

export default routeService;
