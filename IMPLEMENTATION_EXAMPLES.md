// Example: How to integrate API services into your screens
// This shows LoginScreen as an example

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import authService from '../services/authService';

export default function LoginScreenExample({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(email, password);
      
      if (response.data?.user?.role === 'driver') {
        navigation.navigate('Home'); // or 'DriversRegistration' if not registered
      } else {
        navigation.navigate('Home');
      }
      
      Alert.alert('Success', 'Logged in successfully');
    } catch (error) {
      if (error.message === 'Unauthorized - Please login again') {
        Alert.alert('Error', 'Invalid credentials');
      } else {
        Alert.alert('Error', error.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={!loading}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <TouchableOpacity 
        onPress={handleLogin} 
        disabled={loading}
        style={{ opacity: loading ? 0.6 : 1 }}
      >
        {loading ? <ActivityIndicator /> : <Text>Login</Text>}
      </TouchableOpacity>
    </View>
  );
}
