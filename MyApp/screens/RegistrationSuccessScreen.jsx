// screens/RegistrationSuccessScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function RegistrationSuccessScreen({ navigation }) {
  return (
    <View style={s.container}>

      {/* Tuk-tuk image */}
      <Text style={s.napepEmoji}>🛺</Text>

      {/* Title */}
      <Text style={s.title}>Riders Registration Only</Text>
      <Text style={s.subtitle}>
        Users are to check on the nearest napep to them Click
      </Text>

      {/* Green checkmark circle */}
      <View style={s.checkCircle}>
        <Text style={s.checkIcon}>✓</Text>
      </View>

      {/* Successful text */}
      <Text style={s.successText}>Successful</Text>

      {/* Generate Pass Button */}
      <TouchableOpacity
        style={s.generateBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={s.generateBtnText}>Generate Pass</Text>
      </TouchableOpacity>

    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },

  napepEmoji: {
    fontSize: 80,
    marginBottom: Spacing.md,
  },

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
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
    lineHeight: 20,
  },

  // Green checkmark
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkIcon: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: '900',
  },

  successText: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: Spacing.xl,
    letterSpacing: 1,
  },

  generateBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.xxl,
    alignItems: 'center',
    width: '100%',
  },
  generateBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
