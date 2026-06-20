# Integrating Services into Your Screens - Quick Reference

## Copy-Paste Examples for Each Screen

### 1. LoginScreen - Add API Integration

```javascript
// LoginScreen.jsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import authService from "../services/authService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(email, password);
      // Token is automatically stored
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TouchableOpacity onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ textAlign: "center", padding: 15 }}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
```

### 2. SignUpScreen - Add Registration

```javascript
// SignUpScreen.jsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import authService from "../services/authService";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("rider"); // 'rider' or 'driver'
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await authService.register({
        email,
        password,
        name,
        role,
      });
      Alert.alert("Success", "Account created! Please log in.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} disabled={loading}>
        <Text>{loading ? "Creating..." : "Sign Up"}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### 3. RouteMapScreen - Display Routes & Find Napep

```javascript
// RouteMapScreen.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import routeService from "../services/routeService";

export default function RouteMapScreen({ navigation }) {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    fetchRoutes();
    // Get user's current location here
    getCurrentLocation();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await routeService.getAllRoutes();
      setRoutes(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch routes");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    // Use expo-location or react-native-geolocation
    // Then call findNearestNapep
  };

  const findNearestNapep = async () => {
    try {
      const response = await routeService.getNearestNapep(latitude, longitude);
      Alert.alert(
        "Nearest Transport",
        `${response.data.name} - ${response.data.distance}m away`,
      );
    } catch (error) {
      Alert.alert("Error", "Could not find nearest transport");
    }
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={findNearestNapep}>
        <Text>Find Nearest Napep</Text>
      </TouchableOpacity>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
            <Text>
              {item.from} → {item.to}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
```

### 4. DriversRegistrationScreen - Register as Driver

```javascript
// DriversRegistrationScreen.jsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import driverService from "../services/driverService";

export default function DriversRegistrationScreen({ navigation }) {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("napep");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await driverService.registerDriver({
        licenseNumber,
        vehicleType,
        vehiclePlate,
      });
      Alert.alert("Success", "Driver registration complete!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="License Number"
        value={licenseNumber}
        onChangeText={setLicenseNumber}
      />
      <TextInput
        placeholder="Vehicle Type"
        value={vehicleType}
        onChangeText={setVehicleType}
      />
      <TextInput
        placeholder="Vehicle Plate"
        value={vehiclePlate}
        onChangeText={setVehiclePlate}
      />
      <TouchableOpacity onPress={handleRegister} disabled={loading}>
        <Text>{loading ? "Registering..." : "Register"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
```

### 5. DriverPaymentScreen - Process Payment

```javascript
// DriverPaymentScreen.jsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import paymentService from "../services/paymentService";

export default function DriverPaymentScreen({ navigation, route }) {
  const { rideId, amount } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await paymentService.createPayment({
        amount,
        rideId,
        method,
      });
      Alert.alert("Success", "Payment processed!");
      navigation.navigate("PaymentSuccess", { paymentId: response.data.id });
    } catch (error) {
      Alert.alert("Payment Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Amount: ₦{amount}</Text>
      <TextInput
        placeholder="Payment Method"
        value={method}
        onChangeText={setMethod}
      />
      <TouchableOpacity onPress={handlePayment} disabled={loading}>
        <Text>{loading ? "Processing..." : "Pay Now"}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### 6. MyProfileScreen - Display & Update Profile

```javascript
// MyProfileScreen.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import userService from "../services/userService";

export default function MyProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userService.getProfile();
      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
    } catch (error) {
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await userService.updateProfile({
        name,
        phone,
      });
      Alert.alert("Success", "Profile updated!");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    // Navigate to password change screen or show modal
    navigation.navigate("ChangePassword");
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text>{email}</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TouchableOpacity onPress={handleUpdate} disabled={updating}>
        <Text>{updating ? "Saving..." : "Save Changes"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleChangePassword}>
        <Text>Change Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
```

### 7. TransactionReceiptScreen - Display Receipt

```javascript
// TransactionReceiptScreen.jsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import paymentService from "../services/paymentService";

export default function TransactionReceiptScreen({ route }) {
  const { paymentId } = route.params;
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceipt();
  }, []);

  const fetchReceipt = async () => {
    try {
      const response = await paymentService.getReceipt(paymentId);
      setReceipt(response.data);
    } catch (error) {
      console.error("Failed to fetch receipt:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator />;

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Receipt</Text>
      <Text>Reference: {receipt?.reference}</Text>
      <Text>Amount: ₦{receipt?.amount}</Text>
      <Text>Date: {receipt?.date}</Text>
      <Text>Status: {receipt?.status}</Text>
    </ScrollView>
  );
}
```

---

## Common Patterns

### Loading State

```javascript
const [loading, setLoading] = useState(false);

// Before API call
setLoading(true);
// After API call (in finally)
setLoading(false);
// Disable UI while loading
disabled = { loading };
```

### Error Handling

```javascript
try {
  const response = await service.method();
} catch (error) {
  Alert.alert("Error", error.message);
}
```

### Navigation After Success

```javascript
navigation.navigate("ScreenName");
// or replace current screen
navigation.replace("ScreenName");
// or reset navigation
navigation.reset({
  index: 0,
  routes: [{ name: "Home" }],
});
```

---

## Imports You'll Need

```javascript
// At the top of each screen file
import { Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import authService from "../services/authService";
import routeService from "../services/routeService";
import driverService from "../services/driverService";
import paymentService from "../services/paymentService";
import userService from "../services/userService";
```

---

## Testing in Expo

1. Add `console.log()` before/after API calls
2. Check Expo console for errors
3. Use React DevTools to inspect state changes
4. Test with invalid data to verify error handling

```javascript
// Add debugging
console.log("Calling login with:", email);
const response = await authService.login(email, password);
console.log("Login response:", response);
```

---

**Ready to integrate? Copy-paste the examples above into your screens!**
