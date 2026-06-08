// screens/PaymentSuccessScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function PaymentSuccessScreen({ navigation, route }) {
  const { amount, method } = route.params || {};

  return (
    <View style={s.container}>

      {/* Tuk-tuk */}
      <Text style={s.napepEmoji}>🛺</Text>

      {/* Title */}
      <Text style={s.title}>Riders Registration Only</Text>

      {/* Green checkmark */}
      <View style={s.checkCircle}>
        <Text style={s.checkIcon}>✓</Text>
      </View>

      <Text style={s.successText}>Successful</Text>

      {/* Generate Pass */}
      <TouchableOpacity
        style={s.generateBtn}
        onPress={() => navigation.navigate('TransactionReceipt', { amount, method })}
      >
        <Text style={s.generateBtnText}>Generate Pass</Text>
      </TouchableOpacity>

      {/* Done */}
      <TouchableOpacity
        style={s.doneBtn}
        onPress={() => navigation.navigate('TransactionReceipt')}
      >
        <Text style={s.doneBtnText}>Done</Text>
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

  napepEmoji: { fontSize: 80, marginBottom: Spacing.md },

  title: {
    fontSize: FontSize.lg,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },

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
  checkIcon: { color: Colors.white, fontSize: 40, fontWeight: '900' },

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
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.sm,
  },
  generateBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 1,
  },

  doneBtn: {
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    width: '100%',
  },
  doneBtnText: {
    color: Colors.link,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
});
