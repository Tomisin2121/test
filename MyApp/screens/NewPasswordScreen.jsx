// screens/NewPasswordScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { s } from './NewPasswordScreen.style';

export default function NewPasswordScreen({ navigation }) {
  const [newPassword, setNewPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError]                     = useState('');

  const handleEnter = () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    navigation?.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        <View style={s.card}>
          <Text style={s.title}>New Password</Text>

          <Text style={s.label}>Enter New Password</Text>
          <TextInput
            style={s.input}
            placeholder="••••••••••••"
            placeholderTextColor="#999"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={s.label}>Confirm Password</Text>
          <TextInput
            style={s.input}
            placeholder="••••••••••••"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Error message */}
          {error ? <Text style={s.errorText}>{error}</Text> : null}

          {/* Enter Button */}
          <TouchableOpacity style={s.primaryBtn} onPress={handleEnter}>
            <Text style={s.primaryBtnText}>Enter</Text>
          </TouchableOpacity>

        </View>

        <Text style={s.terms}>Terms and condition</Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
