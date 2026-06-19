// screens/RiderLoginScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,Image
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

        <View>
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
            <Image
                            source={require('../assets/google.png')}
                                 style={s.google} />
            <Text style={s.socialFullBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.socialFullBtn}>
            <Image
                            source={require('../assets/apple.png')}
                                 style={s.google} />
            <Text style={s.socialFullBtnText}> Continue with iOS</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={s.bottomRow}>
            <Text style={s.bottomText}>Need an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('DriversRegistration')}>
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
    marginTop: 60
  },

 
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.lg,
    marginTop: -120,
    textAlign: 'center'
  },

  input: {
    backgroundColor: '#D4D3D3',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 3,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    marginBottom: Spacing.xl,
  },

  forgotBtn: {
    alignSelf: 'center',
    marginBottom: Spacing.md,
   
  },
  forgotText: {
    fontSize: 17,
    color: '#8E9496',
    fontWeight: '500',
    marginBottom:2
    
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
    
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.sm - 3,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
    backgroundColor: '#D4D3D3',
  },
  google: {
    width: 40,
    height: 40,
    marginLeft:35
  },
  apple: {
    width: 40,
    height: 40
  },
  socialFullBtnText: { fontSize: 14.5, color: 'Colors.text', fontWeight: '600', marginLeft:20},

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  bottomText: { fontSize: 15, color: Colors.textMuted },
  linkText:   { fontSize: 15, color: '#076283', fontWeight: '700' },
});
