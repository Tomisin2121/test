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
        <Image
                        source={require('../assets/napep icon 1 (2).png')}
                             style={s.napep} />
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
    backgroundColor: '#D9D9D9',
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.xxl,
    borderWidth: 1,
    borderColor: '#121212',
    marginBottom: Spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  clickText: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: '600',
  },

  backText: {
    fontSize: 16,
    color: '#8E9496',
    textDecorationLine: 'underline',
    marginBottom: Spacing.xl,
  },

  spacer: { flex: 1 },

  signupText: {
    fontSize: 18,
    color: '#035E97',
    fontWeight: '700',
    textAlign: 'center',
  },
  ridersOnly: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 2,
  },
  napep: {
    marginTop: 140
  }
});
