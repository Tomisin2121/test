// screens/SignUpScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import { s } from './SignUpScreen.style';

export default function SignUpScreen({ navigation }) {
  const [phone, setPhone]       = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        {/* ── Brand Header ── */}
        <View style={s.header}>
          <View style={s.logoCircle}>
            {/* Replace with your actual logo: <Image source={require('../assets/logo.png')} style={s.logo} /> */}
            <Text style={s.logoText}>RCT</Text>
          </View>
          <Text style={s.brandName}>REDEMPTION{'\n'}CITY TRANSIT</Text>
        </View>

        {/* ── Card ── */}
        <View style={s.card}>
          <Text style={s.title}>SIGN UP</Text>
          <Text style={s.subtitle}>Enter your number</Text>

          {/* Phone */}
          <View style={s.phoneRow}>
            <View style={s.flagBox}>
              <Text style={s.flag}>🇳🇬</Text>
              <Text style={s.dialCode}>+234</Text>
            </View>
            <TextInput
              style={s.phoneInput}
              placeholder="Phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Email */}
          <View style={s.inputRow}>
            <TextInput
              style={s.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={s.forgotInline}>
              <Text style={s.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Password */}
          <TextInput
            style={s.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Enter Button */}
          <TouchableOpacity style={s.primaryBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={s.primaryBtnText}>Enter</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or continue with</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={s.socialRow}>
            <TouchableOpacity style={s.socialBtn}>
              <Text style={s.socialIcon}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.socialBtn}>
              <Text style={s.socialIcon}>🍎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.socialBtn, s.facebookBtn]}>
              <Text style={[s.socialIcon, { color: '#fff' }]}>f</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={s.bottomRow}>
            <Text style={s.bottomText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text style={s.linkText}>Log in</Text>
            </TouchableOpacity>
          </View>

          {/* Legal */}
          <Text style={s.legal}>
            By signing up, you agree to our Terms & Conditions and confirm that
            you are 18+ years old. We may send you promotions related to our services.
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
