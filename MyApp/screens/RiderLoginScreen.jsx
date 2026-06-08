// screens/RiderLoginScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function RiderLoginScreen({ navigation }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        <View style={s.card}>
          <Text style={s.title}>Login</Text>

          {/* Email */}
          <TextInput
            style={s.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <TextInput
            style={s.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot Password */}
          <TouchableOpacity style={s.forgotBtn}>
            <Text style={s.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={s.primaryBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={s.primaryBtnText}>Login</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or continue with</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Social Full Buttons */}
          <TouchableOpacity style={s.socialFullBtn}>
            <Text style={s.googleG}>G</Text>
            <Text style={s.socialFullBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.socialFullBtn}>
            <Text style={s.socialFullBtnText}>🍎  Continue with iOS</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={s.bottomRow}>
            <Text style={s.bottomText}>Need an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RidersRegistration')}>
              <Text style={s.linkText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: Spacing.md,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    marginBottom: Spacing.sm,
  },

  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.md,
  },
  forgotText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: '500',
  },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 1,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#ddd' },
  dividerText: { fontSize: FontSize.xs, color: Colors.textMuted },

  socialFullBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm + 2,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
    backgroundColor: Colors.white,
  },
  googleG: { fontSize: FontSize.md, fontWeight: '900', color: '#EA4335' },
  socialFullBtnText: { fontSize: FontSize.sm, color: Colors.text, fontWeight: '600' },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  bottomText: { fontSize: FontSize.sm, color: Colors.textMuted },
  linkText:   { fontSize: FontSize.sm, color: Colors.link, fontWeight: '700' },
});
