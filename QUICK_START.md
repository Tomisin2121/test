# Quick Start Guide - MyApp & RouteMe Integration

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend (RouteMe)**

```bash
cd test\routeMe
npm install
```

**Frontend (MyApp)**

```bash
cd test\MyApp
npm install
```

### Step 2: Configure Environment Variables

**Backend** - Create `.env` in `test\routeMe`:

```
NODE_ENV=development
PORT=3000
SUPABASE_DB_HOST=your_db_host
SUPABASE_DB_PORT=5432
SUPABASE_DB_USER=your_user
SUPABASE_DB_PASSWORD=your_password
SUPABASE_DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
OTP_EXPIRY_MINUTES=10
OTP_LENGTH=4
```

**Frontend** - Already configured in `.env` (points to `http://localhost:3000/api`)

### Step 3: Start the Backend

```bash
cd test\routeMe
npm run start:dev
```

Backend will start at: **http://localhost:3000**

### Step 4: Start the Frontend

```bash
cd test\MyApp
npm start
```

Choose platform:

- `w` for web (http://localhost:19006)
- `a` for Android
- `i` for iOS

### Step 5: Test Integration

1. Open frontend in browser/emulator
2. Go to SignUp/Login screen
3. Call backend API endpoints
4. Check `http://localhost:3000/api/docs` for API documentation

---

## 📁 Project Structure

```
test/
├── MyApp/                    (Frontend - React Native)
│   ├── config/
│   │   └── api.js           # API endpoints config
│   ├── services/
│   │   ├── apiClient.js     # HTTP client with auth
│   │   ├── authService.js   # Auth operations
│   │   ├── driverService.js # Driver operations
│   │   ├── routeService.js  # Routes & navigation
│   │   ├── paymentService.js # Payments
│   │   └── userService.js   # User profile
│   ├── screens/             # UI screens
│   ├── .env                 # API URL config
│   └── package.json
│
├── routeMe/                 (Backend - NestJS)
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── drivers/        # Drivers module
│   │   ├── routes/         # Routes module
│   │   ├── users/          # Users module
│   │   ├── payments/       # Payments module
│   │   ├── napep/          # Napep (transport) module
│   │   └── main.ts         # Entry point
│   ├── .env                # Configuration
│   └── package.json
│
└── INTEGRATION.md          # Full integration guide
```

---

## 🔑 Key Features

✅ **Authentication** - JWT-based auth with token storage
✅ **Route Management** - Get routes, search, find nearby transport
✅ **Driver Operations** - Register, manage profile, track earnings
✅ **Payments** - Create payments, view history, get receipts
✅ **User Profiles** - Manage profile, change password
✅ **Error Handling** - Automatic token refresh & error management
✅ **CORS Enabled** - Cross-origin requests supported

---

## 🐛 Troubleshooting

**Backend not starting?**

- Check Node version: `node --version` (need 18+)
- Verify PostgreSQL is running
- Check `.env` configuration

**Frontend API calls failing?**

- Verify backend is running on port 3000
- Check `.env` has correct API URL
- Look at browser console for error messages

**Token issues?**

- Clear app data and login again
- Check `http://localhost:3000/api/docs` for auth endpoints
- Verify JWT_SECRET is set in backend

---

## 📚 Using Services in Components

```javascript
import authService from "./services/authService";
import routeService from "./services/routeService";
import driverService from "./services/driverService";
import paymentService from "./services/paymentService";
import userService from "./services/userService";

// Example: Login
async function handleLogin(email, password) {
  try {
    const response = await authService.login(email, password);
    console.log("Login successful:", response.data);
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}

// Example: Get routes
async function handleGetRoutes() {
  try {
    const response = await routeService.getAllRoutes();
    console.log("Routes:", response.data);
  } catch (error) {
    console.error("Failed to fetch routes:", error.message);
  }
}
```

---

## 🌐 API Documentation

Full API documentation available at:
**http://localhost:3000/api/docs** (when backend is running)

---

## 📝 Next Steps

1. ✅ Set up both projects
2. ✅ Start backend & frontend
3. ✅ Test authentication flow
4. ✅ Test API endpoints
5. ✅ Customize screens as needed
6. ✅ Deploy to production

---

For detailed documentation, see **INTEGRATION.md**
