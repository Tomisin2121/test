import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { useDriver } from './context/DriverContext';

// ── Design Tokens ───────────────────────────────────────────────
const Colors = {
  primary:       '#022C0F',
  primaryBtn:    '#045109',
  white:         '#FFFFFF',
  text:          '#111111',
  textMuted:     '#555555',
  inputBg:       '#F5F5F5',
  inputBorder:   '#DDDDDD',
  selectedBg:    '#E8F5E9',
  amountBg:      '#FFFFFF',
  amountBorder:  '#CCCCCC',
  dropdownBg:    '#FFFFFF',
  headerBg:      '#022C0F',
  cardBorder:    '#CCCCCC',
  paymentIconBg: '#F0F0F0',
};

const Spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
};

const FontSize = {
  xs:   10,
  sm:   12,
  md:   14,
  base: 15,
  lg:   16,
  xl:   20,
  xxl:  22,
};

// ── Amount Options ───────────────────────────────────────────────
const AMOUNT_OPTIONS = ['₦500', '₦1000', '₦1500', '₦2000', '₦2500', '₦3000'];

// ── Payment Methods ──────────────────────────────────────────────
const PAYMENT_METHODS = [
  { id: 'bank',   label: 'Bank Transfer',  icon: require('../assets/Bank Transfer 1.png') },
  { id: 'card',   label: 'Debit Card',     icon: require('../assets/Debit Card 1.png') },
  { id: 'wallet', label: 'Wallet Balance', icon: require('../assets/Wallet Balance 1.png') },
];

// ────────────────────────────────────────────────────────────────
export default function DriverPaymentScreen({ navigation }) {
  const { driverProfile } = useDriver();

  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setDropdownOpen(false);
  };

  const handlePay = () => {
  if (!selectedMethod || !selectedAmount) return;

  navigation.navigate('PaymentSuccess', {
    amount:      selectedAmount,
    method:      selectedMethod,
    axis:        'Main Gate →Old arena',
    paidFor:     'Monday – Thursday',
    driversId:   'RCT-02',
    date:        new Date().toLocaleString(),
  });
};

  // ── Render ─────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerBg} />

      {/* ── Header ── */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Image
            source={require('../assets/backarrow.png')}
            style={s.backArrow}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/Napep white 1.png')}
          style={s.napep}
        />
        <Text style={s.headerTitle}>DRIVERS REGISTRATION</Text>
      </View>

      <ScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* ── Profile Card ── */}
        <View style={s.profileCard}>

          {/* Profile Image — pulls from DriverContext set during registration */}
          <View style={s.profileImageWrapper}>
            {driverProfile.profileImage ? (
              <Image
                source={{ uri: driverProfile.profileImage }}
                style={s.profileImage}
              />
            ) : (
              <View style={s.profileImageFallback}>
                <Text style={s.profileImageInitial}>
                  {driverProfile.fullName ? driverProfile.fullName[0].toUpperCase() : '?'}
                </Text>
              </View>
            )}
          </View>

          <Text style={s.driverName}>
            {driverProfile.fullName || 'Eben Favour O.'}
          </Text>

          {/* Info Rows */}
          <View style={s.infoTable}>
            <InfoRow label="FULL NAME"     value={driverProfile.fullName     || 'Eben Favour Osato'} />
            <InfoRow label="DRIVERS ID"    value="RCT-02" />
            <InfoRow label="ASSIGNED AXIS" value="Main Gate →Old arena" />
            <InfoRow label="VALIDITY"      value="Valid until June 20, 2024" />
          </View>
        </View>

        {/* ── Payment Due Card ── */}
        <View style={s.paymentCard}>
          <Text style={s.paymentDueTitle}>PAYMENT DUE</Text>

          <View style={s.paymentRow}>
            <Text style={s.paymentLabel}>WEEKLY CHARGE DUE</Text>
            <Text style={s.paymentValue}>₦3000</Text>
          </View>

          <View style={s.divider} />

          <View style={s.paymentRow}>
            <Text style={s.paymentLabel}>DAILY</Text>
            <Text style={s.paymentValue}>₦500</Text>
          </View>

          <View style={s.divider} />

          {/* Total Due Row with dropdown trigger */}
          <View style={s.totalRow}>
            <Text style={s.paymentLabel}>TOTAL DUE</Text>

            {/* Amount selector */}
            <View style={s.amountSelectorWrapper}>
              <TouchableOpacity
                style={[
                  s.amountBtn,
                  selectedAmount && s.amountBtnSelected,
                ]}
                onPress={() => setDropdownOpen(!dropdownOpen)}
                activeOpacity={0.8}
              >
                <Text style={[
                  s.amountBtnText,
                  selectedAmount && s.amountBtnTextSelected,
                ]}>
                  {selectedAmount || 'AMOUNT'}
                </Text>
                <Text style={[
                  s.amountCaret,
                  selectedAmount && s.amountCaretSelected,
                ]}>
                  {dropdownOpen ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {/* Dropdown list */}
              {dropdownOpen && (
                <View style={s.dropdown}>
                  {AMOUNT_OPTIONS.map((amt) => (
                    <TouchableOpacity
                      key={amt}
                      style={[
                        s.dropdownItem,
                        selectedAmount === amt && s.dropdownItemSelected,
                      ]}
                      onPress={() => handleAmountSelect(amt)}
                      activeOpacity={0.7}
                    >
                      <Text style={[
                        s.dropdownItemText,
                        selectedAmount === amt && s.dropdownItemTextSelected,
                      ]}>
                        {amt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* ── Select Payment Method ── */}
        <View style={s.methodSection}>
          <Text style={s.methodTitle}>Select Payment Method</Text>

          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                s.methodRow,
                selectedMethod === method.id && s.methodRowSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.75}
            >
              <View style={s.methodIconBox}>
                <Image source={method.icon} style={s.methodIcon} />
              </View>
              <Text style={[
                s.methodLabel,
                selectedMethod === method.id && s.methodLabelSelected,
              ]}>
                {method.label}
              </Text>
              {selectedMethod === method.id && (
                <View style={s.methodCheck}>
                  <Text style={s.methodCheckMark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Proceed to Pay Button ── */}
        <TouchableOpacity
          style={[
            s.payBtn,
            (!selectedMethod || !selectedAmount) && s.payBtnDisabled,
          ]}
          onPress={handlePay}
          disabled={!selectedMethod || !selectedAmount}
          activeOpacity={0.85}
        >
          <Text style={s.payBtnText}>
            {selectedAmount
              ? `PROCEED TO PAY ${selectedAmount}`
              : 'PROCEED TO PAY'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ── Reusable Info Row ─────────────────────────────────────────────
function InfoRow({ label, value }) {
  return (
    <View style={s.infoRow}>
      <Text style={s.infoLabel}>{label}</Text>
      <Text style={s.infoValue}>{value}</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const s = StyleSheet.create({

  // Header
  header: {
    backgroundColor: Colors.headerBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingTop: Spacing.lg + 8,
    gap: Spacing.md,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backBtn: {
    padding: Spacing.xs,
  },
  backArrow: {
    width: 24,
    height: 24,
    tintColor: Colors.white,
  },
  napep: {
    width: 44,
    height: 44,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  // Scroll container
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
  },

  // Profile Card
  profileCard: {
    alignItems: 'center',
    paddingBottom: Spacing.sm,
  },
  profileImageWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.primary,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.inputBg,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImageFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#C8E6C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageInitial: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.primary,
  },
  driverName: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
    letterSpacing: 0.3,
  },

  // Info Table
  infoTable: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 10,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
    backgroundColor: Colors.white,
    gap: Spacing.md,
  },
  infoLabel: {
    width: 120,
    fontSize: FontSize.xs,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: 0.5,
  },
  infoValue: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '500',
  },

  // Payment Due Card
  paymentCard: {
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: 10,
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  paymentDueTitle: {
    fontSize: FontSize.sm,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs + 2,
  },
  paymentLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 0.5,
  },
  paymentValue: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.inputBorder,
    marginVertical: Spacing.xs,
  },

  // Total Row + Amount Selector
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xs + 2,
  },
  amountSelectorWrapper: {
    position: 'relative',
    zIndex: 99,
  },
  amountBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryBtn,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: 6,
    minWidth: 90,
    justifyContent: 'center',
  },
  amountBtnSelected: {
    backgroundColor: Colors.primaryBtn,
  },
  amountBtnText: {
    color: Colors.white,
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  amountBtnTextSelected: {
    color: Colors.white,
  },
  amountCaret: {
    color: Colors.white,
    fontSize: 8,
  },
  amountCaretSelected: {
    color: Colors.white,
  },

  // Dropdown
  dropdown: {
    position: 'absolute',
    top: 34,
    right: 0,
    backgroundColor: Colors.dropdownBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 100,
    zIndex: 999,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
  },
  dropdownItemSelected: {
    backgroundColor: Colors.selectedBg,
  },
  dropdownItemText: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '600',
  },
  dropdownItemTextSelected: {
    color: Colors.primaryBtn,
    fontWeight: '800',
  },

  // Payment Methods
  methodSection: {
    gap: Spacing.sm,
  },
  methodTitle: {
    fontSize: FontSize.base,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  methodRowSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.selectedBg,
  },
  methodIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.paymentIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  methodLabel: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.text,
    fontWeight: '500',
  },
  methodLabelSelected: {
    fontWeight: '700',
    color: Colors.primary,
  },
  methodCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primaryBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodCheckMark: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },

  // Pay Button
  payBtn: {
    backgroundColor: Colors.primaryBtn,
    borderRadius: 30,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  payBtnDisabled: {
    opacity: 0.5,
  },
  payBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});