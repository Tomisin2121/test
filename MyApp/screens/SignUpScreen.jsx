// screens/SignUpScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { s } from './SignUpScreen.style';

// ── Password strength helper ──
function getStrength(pw) {
  if (!pw) return null;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: 'Weak', color: '#EF4444', width: '25%' };
  if (score === 2) return { label: 'Fair', color: '#F59E0B', width: '50%' };
  if (score === 3) return { label: 'Good', color: '#3B82F6', width: '75%' };
  return { label: 'Strong', color: '#22C55E', width: '100%' };
}

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName]         = useState('');
  const [phone, setPhone]               = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirm]   = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [errors, setErrors]             = useState({});
  const [touched, setTouched]           = useState({});

  const strength = getStrength(password);

  // ── Validation ──
  function validate() {
    const e = {};
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (!phone.trim() || phone.length < 10) e.phone = 'Enter a valid phone number';
    if (!email.includes('@')) e.email = 'Enter a valid email address';
    if (!password || password.length < 8) e.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  }

  function handleBlur(field) {
    setTouched(t => ({ ...t, [field]: true }));
    const e = validate();
    setErrors(e);
  }

  function handleSubmit() {
    const allTouched = { fullName: true, phone: true, email: true, password: true, confirmPassword: true };
    setTouched(allTouched);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      navigation.navigate('Home');
    }
  }

  const showError = (field) => touched[field] && errors[field];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        {/* ── Card ── */}
        <View style={s.card}>
          <Text style={s.headerTitle}>SIGN UP</Text>
          <Text style={s.subtitle}>Create your account</Text>

          {/* Full Name */}
          <TextInput
            style={[s.input, showError('fullName') && s.inputError]}
            placeholder="Full name"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={fullName}
            onChangeText={setFullName}
            onBlur={() => handleBlur('fullName')}
          />
          {showError('fullName') && <Text style={s.errorText}>{errors.fullName}</Text>}

          {/* Phone */}
          <View style={[s.phoneRow, showError('phone') && s.inputError]}>
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
              onBlur={() => handleBlur('phone')}
            />
          </View>
          {showError('phone') && <Text style={s.errorText}>{errors.phone}</Text>}

          {/* Email */}
          <TextInput
            style={[s.input, showError('email') && s.inputError]}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            onBlur={() => handleBlur('email')}
          />
          {showError('email') && <Text style={s.errorText}>{errors.email}</Text>}

          {/* Password */}
          <View style={[s.passwordRow, showError('password') && s.inputError]}>
            <TextInput
              style={s.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onBlur={() => handleBlur('password')}
            />
            <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={s.eyeBtn}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
            </TouchableOpacity>
          </View>
          {showError('password') && <Text style={s.errorText}>{errors.password}</Text>}

          {/* Password Strength Bar */}
          {password.length > 0 && strength && (
            <View style={s.strengthContainer}>
              <View style={s.strengthBarBg}>
                <View style={[s.strengthBarFill, { width: strength.width, backgroundColor: strength.color }]} />
              </View>
              <Text style={[s.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
            </View>
          )}

          {/* Confirm Password */}
          <View style={[s.passwordRow, showError('confirmPassword') && s.inputError]}>
            <TextInput
              style={s.passwordInput}
              placeholder="Confirm password"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirm}
              onBlur={() => handleBlur('confirmPassword')}
            />
            <TouchableOpacity onPress={() => setShowConfirm(v => !v)} style={s.eyeBtn}>
              <Ionicons name={showConfirm ? 'eye-off' : 'eye'} size={20} color="#999" />
            </TouchableOpacity>
          </View>
          {showError('confirmPassword') && <Text style={s.errorText}>{errors.confirmPassword}</Text>}
          {/* Match indicator */}
          {confirmPassword.length > 0 && !errors.confirmPassword && (
            <Text style={s.matchText}>✓ Passwords match</Text>
          )}

          {/* Submit Button */}
          <TouchableOpacity style={s.primaryBtn} onPress={handleSubmit}>
            <Text style={s.primaryBtnText}>Create Account</Text>
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
              <Image source={require('../assets/google.png')} style={s.google} />
            </TouchableOpacity>
            <TouchableOpacity style={s.socialBtn}>
              <Image source={require('../assets/apple.png')} style={s.apple} />
            </TouchableOpacity>
            <TouchableOpacity style={[s.socialBtn, s.facebookBtn]}>
              <Image source={require('../assets/facebook.png')} style={s.facebook} />
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={s.bottomRow}>
            <Text style={s.bottomText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text style={s.linkText}>Log in</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.legalText}>
            By signing up, you agree to our Terms & Conditions and confirm that
            you are 18+ years old. We may send you promotions related to our services.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}