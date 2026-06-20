# MyApp & RouteMe Integration Guide

## Overview
This document provides a complete guide to integrate the **MyApp** React Native frontend with the **RouteMe** NestJS backend API.

## Setup Instructions

### 1. Backend Setup (RouteMe)

#### Prerequisites
- Node.js 18+
- PostgreSQL
- Supabase account

#### Installation
```bash
cd routeMe
npm install
```

#### Environment Configuration
Copy `.env.example` to `.env` and configure:
```
NODE_ENV=development
PORT=3000
SUPABASE_DB_HOST=<your-host>
SUPABASE_DB_PORT=5432
SUPABASE_DB_USER=<your-user>
SUPABASE_DB_PASSWORD=<your-password>
SUPABASE_DB_NAME=<your-db-name>
JWT_SECRET=<generate-random-secret>
JWT_EXPIRES_IN=7d
```

#### Run Backend
```bash
npm run start:dev
```
Backend will be available at `http://localhost:3000`
API docs available at `http://localhost:3000/api/docs`

---

### 2. Frontend Setup (MyApp)

#### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)

#### Installation
```bash
cd MyApp
npm install
```

#### Environment Configuration
The `.env` file is already configured to point to `http://localhost:3000/api`

For production, update `.env`:
```
REACT_APP_API_URL=https://your-backend-domain/api
REACT_APP_ENV=production
```

#### Run Frontend
```bash
npm start
# Then select: web, android, or ios
```

---

## API Integration Structure

### Service Architecture
```
services/
├── apiClient.js       # HTTP client with auth
├── authService.js     # Authentication
├── routeService.js    # Routes & navigation
├── driverService.js   # Driver operations
├── paymentService.js  # Payment operations
└── userService.js     # User profile
```

### Configuration
```
config/
└── api.js            # API endpoints & configuration
```

---

## Usage Examples

### 1. Authentication

```javascript
import authService from './services/authService';

// Register
const registerUser = async (email, password, name, role) => {
  try {
    const response = await authService.register({
      email,
      password,
      name,
      role, // 'driver' or 'rider'
    });
    console.log('Registration successful:', response);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};

// Login
const loginUser = async (email, password) => {
  try {
    const response = await authService.login(email, password);
    console.log('Login successful');
    navigation.navigate('Home');
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Logout
const logoutUser = async () => {
  await authService.logout();
  navigation.navigate('Landing');
};

// Check if logged in
const checkLogin = async () => {
  const loggedIn = await authService.isLoggedIn();
  return loggedIn;
};
```

### 2. Routes & Navigation

```javascript
import routeService from './services/routeService';

// Get all routes
const fetchRoutes = async () => {
  try {
    const response = await routeService.getAllRoutes();
    setRoutes(response.data);
  } catch (error) {
    console.error('Failed to fetch routes:', error.message);
  }
};

// Search routes
const searchRoutes = async (searchTerm) => {
  try {
    const response = await routeService.searchRoutes(searchTerm);
    setSearchResults(response.data);
  } catch (error) {
    console.error('Search failed:', error.message);
  }
};

// Get nearest Napep
const getNearestTransport = async (latitude, longitude) => {
  try {
    const response = await routeService.getNearestNapep(latitude, longitude);
    setNearestNapep(response.data);
  } catch (error) {
    console.error('Failed to fetch nearest Napep:', error.message);
  }
};
```

### 3. Driver Operations

```javascript
import driverService from './services/driverService';

// Register as driver
const registerDriver = async (driverData) => {
  try {
    const response = await driverService.registerDriver({
      licenseNumber: driverData.license,
      vehicleType: driverData.vehicleType,
      vehiclePlate: driverData.plate,
      // ... other fields
    });
    console.log('Driver registration successful');
  } catch (error) {
    console.error('Driver registration failed:', error.message);
  }
};

// Get driver profile
const fetchDriverProfile = async () => {
  try {
    const response = await driverService.getProfile();
    setDriver(response.data);
  } catch (error) {
    console.error('Failed to fetch driver profile:', error.message);
  }
};

// Get driver earnings
const fetchEarnings = async () => {
  try {
    const response = await driverService.getEarnings();
    setEarnings(response.data);
  } catch (error) {
    console.error('Failed to fetch earnings:', error.message);
  }
};
```

### 4. Payments

```javascript
import paymentService from './services/paymentService';

// Create payment
const processPayment = async (paymentData) => {
  try {
    const response = await paymentService.createPayment({
      amount: paymentData.amount,
      rideId: paymentData.rideId,
      method: paymentData.method, // 'card', 'wallet', etc
    });
    console.log('Payment successful');
  } catch (error) {
    console.error('Payment failed:', error.message);
  }
};

// Get payment history
const fetchPaymentHistory = async () => {
  try {
    const response = await paymentService.getPaymentHistory();
    setPayments(response.data);
  } catch (error) {
    console.error('Failed to fetch payment history:', error.message);
  }
};

// Get receipt
const getReceipt = async (paymentId) => {
  try {
    const response = await paymentService.getReceipt(paymentId);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch receipt:', error.message);
  }
};
```

### 5. User Profile

```javascript
import userService from './services/userService';

// Get user profile
const fetchProfile = async () => {
  try {
    const response = await userService.getProfile();
    setProfile(response.data);
  } catch (error) {
    console.error('Failed to fetch profile:', error.message);
  }
};

// Update profile
const updateUserProfile = async (profileData) => {
  try {
    const response = await userService.updateProfile(profileData);
    console.log('Profile updated successfully');
  } catch (error) {
    console.error('Profile update failed:', error.message);
  }
};

// Change password
const changeUserPassword = async (oldPassword, newPassword) => {
  try {
    const response = await userService.changePassword(oldPassword, newPassword);
    console.log('Password changed successfully');
  } catch (error) {
    console.error('Password change failed:', error.message);
  }
};
```

---

## Error Handling

The `apiClient` automatically handles:
- **401 Unauthorized**: Clears stored token and throws error
- **Network errors**: Logs to console and throws error
- **JSON parsing errors**: Throws descriptive error

```javascript
try {
  const data = await authService.login(email, password);
} catch (error) {
  if (error.message === 'Unauthorized - Please login again') {
    // Redirect to login
  } else {
    // Show generic error
    Alert.alert('Error', error.message);
  }
}
```

---

## Token Management

Tokens are automatically:
- **Stored** in AsyncStorage when login/register succeeds
- **Retrieved** and added to Authorization header for all requests
- **Cleared** when logout is called or 401 error occurs

### Manual Token Access
```javascript
import apiClient from './services/apiClient';

// Get current token
const token = await apiClient.getToken();

// Clear token
await apiClient.setToken(null);

// Set custom token
await apiClient.setToken(newToken);
```

---

## Troubleshooting

### Connection Issues
1. Ensure backend is running: `npm run start:dev` in `routeMe` directory
2. Check `REACT_APP_API_URL` in `.env` matches backend URL
3. Verify CORS is enabled (it is by default in NestJS config)

### Authentication Issues
1. Check JWT_SECRET is set in backend `.env`
2. Verify token is being stored: Check AsyncStorage in app
3. Try clearing app data and logging in again

### API Errors
- Check `/api/docs` for available endpoints
- Review response format in Swagger documentation
- Enable verbose logging in `apiClient.js` for debugging

---

## Backend API Endpoints

All endpoints are protected with JWT Bearer token (except auth registration/login).

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout (optional server-side)
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/verify-otp` - Verify OTP code
- `POST /auth/reset-password` - Reset password with OTP

### Users
- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update user profile
- `POST /users/change-password` - Change password

### Drivers
- `POST /drivers/register` - Register as driver
- `GET /drivers/profile` - Get driver profile
- `PUT /drivers/profile` - Update driver profile
- `GET /drivers/earnings` - Get driver earnings

### Routes
- `GET /routes` - Get all routes
- `GET /routes/:id` - Get specific route
- `GET /routes/search?q=query` - Search routes

### Napep
- `GET /napep` - Get all Napep (minibuses)
- `GET /napep/nearest?lat=X&lng=Y` - Find nearest Napep

### Payments
- `POST /payments` - Create payment
- `GET /payments/history` - Get payment history
- `GET /payments/:id/receipt` - Get payment receipt

---

## Development Workflow

1. **Make changes** to frontend screens or backend services
2. **Test locally** with `npm start` (frontend) and `npm run start:dev` (backend)
3. **Verify API calls** in browser DevTools or Expo debugger
4. **Check backend logs** for request/response details
5. **Deploy** when ready

---

## Production Deployment

### Backend (RouteMe)
```bash
npm run build
npm run start:prod
```

### Frontend (MyApp)
```bash
expo build:android
# or
eas build --platform android
```

Update `.env` to point to production API URL before building.

---

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [API Swagger Docs](http://localhost:3000/api/docs)

