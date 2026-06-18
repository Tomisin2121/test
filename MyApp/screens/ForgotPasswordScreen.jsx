// screens/ForgotPasswordScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,Image
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

        <View>
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
          
          {/* Social Icons */}
          <Text style={s.ore}>Or</Text>
          <View style={s.socialRow}>
            
            <TouchableOpacity style={s.socialBtn}>
              <Image
                                source={require('../assets/google.png')}
                                style={s.google} />
            </TouchableOpacity>
            <TouchableOpacity style={s.socialBtn}>
           <Image
                                 source={require('../assets/apple.png')}
                                 style={s.apple} />
            </TouchableOpacity>
            <TouchableOpacity style={[s.socialBtn, s.facebookBtn]}>
              <Image
                                   source={require('../assets/facebook.png')}
                                   style={s.facebook} />
            </TouchableOpacity>
          </View>

          {/* Sign up link */}
          <Text style= {s.orea}>Did you have an account?</Text>
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
