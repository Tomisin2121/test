// screens/LoginScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { s } from './LoginScreen.style';

export default function LoginScreen({ navigation }) {
  const [email, setEmail]       = useState('');
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
          <TouchableOpacity
            style={s.forgotBtn}
            onPress={() => navigation?.navigate('ForgotPassword')}
          >
            <Text style={s.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={s.primaryBtn} onPress={() => {}}>
            <Text style={s.primaryBtnText}>Login</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>or continue with</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Social Buttons */}
          <TouchableOpacity style={s.socialFullBtn}>
            <Image
                source={require('../assets/google.png')}
                     style={s.google} />
            <Text style={s.socialFullBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.socialFullBtn}>
            <Image
                                  source={require('../assets/apple.png')}
                                  style={s.apple} />
            <Text style={s.socialFullBtnText}>Continue with iOS</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={s.bottomRow}>
            <Text style={s.bottomText}>Need an account? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('SignUp')}>
              <Text style={s.linkText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
