// screens/RidersRegistrationScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function RidersRegistrationScreen({ navigation }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        {/* ── Tuk-tuk Image ── */}
        <View style={s.imageContainer}>
          {/* Replace with: <Image source={require('../assets/napep.png')} style={s.napepImage} /> */}
          <Text style={s.napepEmoji}>🛺</Text>
        </View>

        {/* ── Title ── */}
        <Text style={s.title}>Riders Registration Only</Text>
        <Text style={s.subtitle}>
          Users are to check on the nearest napep to them{' '}
          <Text style={s.link} onPress={() => navigation.navigate('NearestNapep')}>
            Click
          </Text>
        </Text>

        {/* ── Form ── */}
        <View style={s.form}>
          <TextInput
            style={s.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={s.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={s.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          {/* Enter Button */}
          <TouchableOpacity style={s.primaryBtn} onPress={() => {}}>
            <Text style={s.primaryBtnText}>Enter</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or continue with</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Social */}
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

          {/* Login Link */}
          <View style={s.bottomRow}>
            <Text style={s.bottomText}>I don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RiderLogin')}>
              <Text style={s.linkText}>Login</Text>
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
    alignItems: 'center',
    paddingBottom: Spacing.xxl,
    paddingTop: Spacing.lg,
  },

  imageContainer: { marginBottom: Spacing.md },
  napepImage: { width: 160, height: 120, resizeMode: 'contain' },
  napepEmoji: { fontSize: 70 },

  title: {
    fontSize: FontSize.lg,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  link: {
    color: Colors.link,
    fontWeight: '700',
  },

  form: {
    width: '100%',
    paddingHorizontal: Spacing.lg,
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

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    alignItems: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
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

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  facebookBtn: { backgroundColor: '#1877F2', borderColor: '#1877F2' },
  googleG:     { fontSize: FontSize.lg, fontWeight: '900', color: '#EA4335' },
  socialIcon:  { fontSize: FontSize.lg, fontWeight: '800', color: Colors.text },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: { fontSize: FontSize.sm, color: Colors.textMuted },
  linkText:   { fontSize: FontSize.sm, color: Colors.link, fontWeight: '700' },
});
