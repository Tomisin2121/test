// screens/TransactionReceiptScreen.jsx
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function TransactionReceiptScreen({ navigation, route }) {
  const { amount, method } = route.params || {};

  const receiptItems = [
    ['DRIVER:',         'Eben Favour O.'],
    ['DRIVERS ID:',     'RCT-02'],
    ['AXIS:',           'Main Gate →Old arena'],
    ['DATE:',           'June 20, 2024,  10:48pm'],
    ['PAID FOR:',       'Monday - Thursday'],
    ['AMOUNT PAID:',    `₦${amount?.toLocaleString() || '2000'}`],
    ['PAYMENT METHOD:', method === 'debit' ? 'Debit Card' : method === 'bank' ? 'Bank Transfer' : 'Wallet Balance'],
  ];

  return (
    <ScrollView contentContainerStyle={s.container}>

      {/* ── Page Title ── */}
      <Text style={s.pageTitle}>Payment Successful!</Text>

      {/* ── Receipt Card ── */}
      <View style={s.receiptCard}>

        {/* Receipt Header */}
        <View style={s.receiptHeader}>
          <View style={s.logoCircle}>
            <Text style={s.logoText}>RCT</Text>
          </View>
          <View>
            <Text style={s.brandLine1}>REDEMPTION</Text>
            <Text style={s.brandLine2}>CITY TRANSIT</Text>
          </View>
        </View>

        {/* Divider with zigzag feel */}
        <View style={s.divider} />

        <Text style={s.receiptTitle}>Transaction Receipt</Text>

        {/* Receipt Items */}
        {receiptItems.map(([label, value]) => (
          <View key={label} style={s.receiptRow}>
            <Text style={s.receiptLabel}>{label}</Text>
            <Text style={s.receiptValue}>{value}</Text>
          </View>
        ))}

        {/* Bottom divider */}
        <View style={s.divider} />

        {/* Green checkmark */}
        <View style={s.checkRow}>
          <View style={s.checkCircle}>
            <Text style={s.checkIcon}>✓</Text>
          </View>
        </View>

      </View>

      {/* ── Buttons ── */}
      <TouchableOpacity style={s.downloadBtn} onPress={() => {}}>
        <Text style={s.downloadIcon}>⬇</Text>
        <Text style={s.downloadBtnText}>Download Receipt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={s.homeBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={s.homeBtnText}>Back to Home</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },

  pageTitle: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: Spacing.lg,
    letterSpacing: 0.5,
  },

  // Receipt Card
  receiptCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: '100%',
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  logoText:   { color: Colors.white, fontWeight: '900', fontSize: FontSize.xs },
  brandLine1: { fontSize: FontSize.xs, fontWeight: '900', color: Colors.primary, letterSpacing: 1 },
  brandLine2: { fontSize: FontSize.xs, fontWeight: '900', color: Colors.secondary, letterSpacing: 1 },

  receiptTitle: {
    fontSize: FontSize.lg,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: Spacing.sm,
    borderStyle: 'dashed',
  },

  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs + 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
  },
  receiptLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.3,
    flex: 1,
  },
  receiptValue: {
    fontSize: FontSize.xs,
    color: Colors.text,
    fontWeight: '500',
    flex: 1.5,
    textAlign: 'right',
  },

  checkRow: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  checkCircle: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: { color: Colors.white, fontSize: 24, fontWeight: '900' },

  // Buttons
  downloadBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  downloadIcon:    { fontSize: 16, color: Colors.white },
  downloadBtnText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '700', letterSpacing: 1 },

  homeBtn: {
    borderWidth: 1.5,
    borderColor: Colors.white,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    alignItems: 'center',
    width: '100%',
  },
  homeBtnText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '600' },
});
