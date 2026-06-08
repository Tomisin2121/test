// screens/ForgotPasswordScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { s } from './ForgotPasswordScreen.style';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        <View style={s.card}>
          <Text style={s.title}>Forgot password</Text>

          <Text style={s.label}>Enter Email Address</Text>

          <TextInput
            style={s.input}
            placeholder="iebdeo@gmail.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* Back to Login */}
          <TouchableOpacity
            style={s.backRow}
            onPress={() => navigation?.navigate('Login')}
          >
            <Text style={s.backText}>Back to </Text>
            <Text style={s.linkText}>Log in</Text>
          </TouchableOpacity>

          {/* Send Button */}
          <TouchableOpacity
            style={s.primaryBtn}
            onPress={() => navigation?.navigate('Verification')}
          >
            <Text style={s.primaryBtnText}>Send</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Social Icons */}
          <View style={s.socialRow}>
            <TouchableOpacity style={s.socialBtn}>
              <Text style={s.googleG}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.socialBtn}>
              <Text style={s.socialIcon}>🍎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.socialBtn, s.facebookBtn]}>
              <Text style={[s.socialIcon, { color: '#fff' }]}>f</Text>
            </TouchableOpacity>
          </View>

          {/* Sign up link */}
          <TouchableOpacity
            style={s.signUpBtn}
            onPress={() => navigation?.navigate('SignUp')}
          >
            <Text style={s.signUpText}>Sign up</Text>
          </TouchableOpacity>

        </View>

        <Text style={s.terms}>Terms and condition</Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
