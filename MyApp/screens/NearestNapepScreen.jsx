// screens/NearestNapepScreen.jsx
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function NearestNapepScreen({ navigation }) {
  return (
    <View style={s.container}>

      {/* ── Tuk-tuk Image ── */}
      <View style={s.imageContainer}>
        {/* Replace with actual image: <Image source={require('../assets/napep.png')} style={s.napepImage} /> */}
        <Text style={s.napepEmoji}>🛺</Text>
      </View>

      {/* ── Title ── */}
      <Text style={s.title}>Nearest Napep to me ?</Text>

      {/* ── Click Button ── */}
      <TouchableOpacity style={s.clickBtn} onPress={() => {}}>
        <Text style={s.clickText}>Click</Text>
      </TouchableOpacity>

      {/* ── Back to Home ── */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={s.backText}>Back to Home page</Text>
      </TouchableOpacity>

      {/* ── Spacer ── */}
      <View style={s.spacer} />

      {/* ── Sign up / Log in ── */}
      <TouchableOpacity onPress={() => navigation.navigate('RiderLogin')}>
        <Text style={s.signupText}>Sign up/ Log in</Text>
        <Text style={s.ridersOnly}>Riders only</Text>
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
    paddingBottom: Spacing.xxl,
  },

  imageContainer: {
    marginBottom: Spacing.lg,
  },
  napepImage: {
    width: 160,
    height: 120,
    resizeMode: 'contain',
  },
  napepEmoji: {
    fontSize: 80,
  },

  title: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  clickBtn: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.xxl,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    marginBottom: Spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  clickText: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '600',
  },

  backText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textDecorationLine: 'underline',
    marginBottom: Spacing.xl,
  },

  spacer: { flex: 1 },

  signupText: {
    fontSize: FontSize.md,
    color: Colors.link,
    fontWeight: '700',
    textAlign: 'center',
  },
  ridersOnly: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
});
