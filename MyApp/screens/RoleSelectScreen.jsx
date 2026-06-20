// screens/RoleSelectScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Dimensions, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const ROLES = [
  {
    key: 'passenger',
    icon: 'person',
    title: 'I Need a Ride/ I don\'t drive for commercial purpose',
    subtitle: 'Book keke, taxis & shuttles\nacross Redemption City',
    navigate: 'SignUp',
  },
  {
    key: 'driver',
    icon: 'car',
    title: "I'm a Driver",
    subtitle: 'Earn by driving passengers\naround Redemption City',
    navigate: 'RiderLogin',
  },
];

export default function RoleSelectScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  function handleContinue() {
    if (!selected) return;
    const role = ROLES.find(r => r.key === selected);
    navigation.navigate(role.navigate, { role: selected });
  }

  return (
    <View style={styles.container}>
      {/* Green top background */}
      <LinearGradient
        colors={['#076007', '#0a8a0a']}
        style={styles.topSection}
      >
        {/* Logo area */}
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Ionicons name="car" size={32} color="#076007" />
          </View>
          <Text style={styles.brandName}>RCT</Text>
        </View>

        <Text style={styles.heroTitle}>Welcome to{'\n'}Redemption City Transit</Text>
        <Text style={styles.heroSubtitle}>How will you use RCT today?</Text>
      </LinearGradient>

      {/* White card */}
      <View style={styles.card}>

        {/* Role Options */}
        {ROLES.map(role => {
          const isSelected = selected === role.key;
          return (
            <TouchableOpacity
              key={role.key}
              style={[styles.roleCard, isSelected && styles.roleCardSelected]}
              onPress={() => setSelected(role.key)}
              activeOpacity={0.85}
            >
              {/* Icon bubble */}
              <View style={[styles.iconBubble, isSelected && styles.iconBubbleSelected]}>
                <Ionicons
                  name={role.icon}
                  size={28}
                  color={isSelected ? '#fff' : '#076007'}
                />
              </View>

              {/* Text */}
              <View style={styles.roleText}>
                <Text style={[styles.roleTitle, isSelected && styles.roleTitleSelected]}>
                  {role.title}
                </Text>
                <Text style={[styles.roleSubtitle, isSelected && styles.roleSubtitleSelected]}>
                  {role.subtitle}
                </Text>
              </View>

              {/* Check indicator */}
              <View style={[styles.checkCircle, isSelected && styles.checkCircleSelected]}>
                {isSelected && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!selected}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.bottomRow}>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#076007',
  },

  // ── Top green section ──
  topSection: {
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 28,
  },
  logoCircle: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: '400',
  },

  // ── White card ──
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },

  // ── Role cards ──
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F9F4',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 14,
  },
  roleCardSelected: {
    borderColor: '#076007',
    backgroundColor: '#EDF7ED',
  },
  iconBubble: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: '#D4EED4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubbleSelected: {
    backgroundColor: '#076007',
  },
  roleText: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  roleTitleSelected: {
    color: '#076007',
  },
  roleSubtitle: {
    fontSize: 12,
    color: '#888',
    lineHeight: 18,
  },
  roleSubtitleSelected: {
    color: '#4a8a4a',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleSelected: {
    backgroundColor: '#076007',
    borderColor: '#076007',
  },

  // ── Continue button ──
  continueBtn: {
    backgroundColor: '#076007',
    borderRadius: 999,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  continueBtnDisabled: {
    backgroundColor: '#9DC49D',
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Bottom ──
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 13,
    color: '#888',
  },
  linkText: {
    fontSize: 13,
    color: '#076007',
    fontWeight: '700',
  },
});