// screens/PasswordChangedScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function PasswordChangedScreen({ navigation }) {
  return (
    <View style={s.container}>
      <View style={s.card}>

        {/* Green badge checkmark */}
        <View style={s.badgeOuter}>
          <View style={s.badgeInner}>
            <Text style={s.badgeCheck}>✓</Text>
          </View>
        </View>

        {/* Text */}
        <Text style={s.title}>Password Changed</Text>

        {/* Go to home */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={s.homeText}>
            Go to <Text style={s.homeLink}>home</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xxl,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },

  // Badge — gear/seal shape using layered circles
  badgeOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    // Outer ring
    borderWidth: 8,
    borderColor: '#2D6A4F',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    // Notched seal effect
    transform: [{ rotate: '22.5deg' }],
  },
  badgeInner: {
    transform: [{ rotate: '-22.5deg' }], // counter-rotate content to stay upright
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCheck: {
    color: Colors.white,
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 60,
  },

  title: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },

  homeText: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  homeLink: {
    color: Colors.link,
    fontWeight: '700',
  },
});
