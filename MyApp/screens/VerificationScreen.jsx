// screens/VerificationScreen.jsx
import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { s } from './VerificationScreen.style';

export default function VerificationScreen({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    // Auto-advance to next box
    if (text && index < 3) {
      inputs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        <View style={s.card}>
          <Text style={s.title}>Verification</Text>
          <Text style={s.subtitle}>Verification code</Text>

          {/* 4-digit code boxes */}
          <View style={s.codeRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputs[index]}
                style={[s.codeBox, digit ? s.codeBoxFilled : null]}
                value={digit}
                onChangeText={(text) => handleChange(text.slice(-1), index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>

          <Text style={s.infoText}>
            We've sent a verification code to{'\n'}your email
          </Text>

          {/* Verify Button */}
          <TouchableOpacity
            style={s.primaryBtn}
            onPress={() => navigation?.navigate('NewPassword')}
          >
            <Text style={s.primaryBtnText}>Verify</Text>
          </TouchableOpacity>

          {/* Resend */}
          <View style={s.resendRow}>
            <Text style={s.resendText}>I didn't receive the code? </Text>
            <TouchableOpacity onPress={() => {/* TODO: resend code logic */}}>
              <Text style={s.linkText}>Send again</Text>
            </TouchableOpacity>
          </View>

        </View>

        <Text style={s.terms}>Terms and condition</Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
