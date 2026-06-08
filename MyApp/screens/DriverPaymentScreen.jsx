// screens/DriverPaymentScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

const PAYMENT_METHODS = [
  { id: 'bank',   icon: '🏦', label: 'Bank Transfer' },
  { id: 'debit',  icon: '💳', label: 'Debit Card' },
  { id: 'wallet', icon: '👛', label: 'Wallet Balance' },
];

const PAYMENT_DUES = [
  { id: 'weekly', label: 'WEEKLY CHARGE DUE', amount: 3000 },
  { id: 'daily',  label: 'DAILY',             amount: 500  },
];

export default function DriverPaymentScreen({ navigation }) {
  const [selectedMethod,  setSelectedMethod]  = useState(null);
  const [selectedAmounts, setSelectedAmounts] = useState([]);

  const toggleAmount = (id) => {
    setSelectedAmounts(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const totalDue = PAYMENT_DUES
    .filter(d => selectedAmounts.includes(d.id))
    .reduce((sum, d) => sum + d.amount, 0);

  const handlePay = () => {
    navigation.navigate('PaymentSuccess', { amount: totalDue, method: selectedMethod });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        {/* ── Header ── */}
        <View style={s.header}>
          <Text style={s.headerTitle}>DRIVERS REGISTRATION</Text>
        </View>

        {/* ── Driver Card ── */}
        <View style={s.driverCard}>
          <View style={s.avatarCircle}>
            <Text style={s.avatarText}>👤</Text>
          </View>
          <Text style={s.driverName}>Eben Favour O.</Text>

          <View style={s.infoGrid}>
            {[
              ['FULL NAME',      'Eben Favour Osato'],
              ['DRIVERS ID',     'RCT-02'],
              ['ASSIGNED AXIS',  'Main Gate →Old arena'],
              ['VALIDITY',       'Valid until June 20, 2024'],
            ].map(([label, value]) => (
              <View key={label} style={s.infoRow}>
                <Text style={s.infoLabel}>{label}</Text>
                <Text style={s.infoValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Payment Due ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>PAYMENT DUE</Text>

          {PAYMENT_DUES.map((due) => (
            <TouchableOpacity
              key={due.id}
              style={s.dueRow}
              onPress={() => toggleAmount(due.id)}
            >
              <Text style={s.dueLabel}>{due.label}</Text>
              <View style={s.dueRight}>
                {selectedAmounts.includes(due.id) && (
                  <Text style={s.dueAmount}>₦{due.amount.toLocaleString()}</Text>
                )}
                <View style={[
                  s.checkbox,
                  selectedAmounts.includes(due.id) && s.checkboxSelected
                ]}>
                  {selectedAmounts.includes(due.id) && (
                    <Text style={s.checkmark}>✓</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Total */}
          <View style={s.totalRow}>
            <Text style={s.totalLabel}>TOTAL DUE</Text>
            <Text style={s.totalAmount}>
              {totalDue > 0 ? `₦${totalDue.toLocaleString()}` : ''}
            </Text>
          </View>
        </View>

        {/* ── Payment Method ── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Select Payment Method</Text>

          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                s.methodRow,
                selectedMethod === method.id && s.methodRowSelected
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <Text style={s.methodIcon}>{method.icon}</Text>
              <Text style={s.methodLabel}>{method.label}</Text>
              <View style={[
                s.radio,
                selectedMethod === method.id && s.radioSelected
              ]}>
                {selectedMethod === method.id && <View style={s.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Pay Button ── */}
        <TouchableOpacity
          style={[s.payBtn, (!selectedMethod || totalDue === 0) && s.payBtnDisabled]}
          onPress={handlePay}
          disabled={!selectedMethod || totalDue === 0}
        >
          <Text style={s.payBtnText}>
            {totalDue > 0
              ? `PROCEED TO PAY ₦${totalDue.toLocaleString()}`
              : 'PROCEED TO PAY'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingBottom: Spacing.xxl,
  },

  header: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingTop: Spacing.lg + 8,
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  // Driver Card
  driverCard: {
    backgroundColor: Colors.primary,
    margin: Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  avatarText: { fontSize: 32 },
  driverName: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  infoGrid: { width: '100%' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  infoLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  infoValue: {
    color: Colors.white,
    fontSize: FontSize.xs,
    fontWeight: '500',
  },

  // Section
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: '900',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },

  // Due rows
  dueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  dueLabel:  { fontSize: FontSize.sm, color: Colors.text, fontWeight: '600' },
  dueRight:  { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  dueAmount: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: '700' },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkmark: { color: Colors.white, fontSize: 12, fontWeight: '700' },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    marginTop: Spacing.xs,
  },
  totalLabel:  { fontSize: FontSize.sm, fontWeight: '900', color: Colors.text },
  totalAmount: { fontSize: FontSize.md, fontWeight: '900', color: Colors.primary },

  // Payment methods
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    gap: Spacing.md,
  },
  methodRowSelected: { backgroundColor: '#F0FDF4', borderRadius: Radius.sm },
  methodIcon:  { fontSize: 20 },
  methodLabel: { flex: 1, fontSize: FontSize.sm, color: Colors.text, fontWeight: '500' },
  radio: {
    width: 20,
    height: 20,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: Colors.primary },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
  },

  // Pay button
  payBtn: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  payBtnDisabled: { backgroundColor: '#94A3B8' },
  payBtnText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
