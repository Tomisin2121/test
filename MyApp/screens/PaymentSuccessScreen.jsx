import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useDriver } from './context/DriverContext';

// ── Tokens ────────────────────────────────────────────────────────
const C = {
  primary:    '#022C0F',
  primaryBtn: '#045109',
  white:      '#FFFFFF',
  text:       '#111111',
  muted:      '#444444',
  bg:         '#022C0F',
  receiptBg:  '#FFFFFF',
  zigzag:     '#022C0F',
  gold:       '#FFD700',
  checkBg:    '#045109',
};

// ── Screen ────────────────────────────────────────────────────────
export default function PaymentSuccessScreen({ navigation, route }) {
  const { driverProfile } = useDriver();

  // Values passed from DriverPaymentScreen via navigation.navigate('PaymentSuccess', {...})
  const amountPaid    = route?.params?.amount      || '₦2000';
  const paymentMethod = route?.params?.method      || 'Debit Card';
  const axis          = route?.params?.axis        || 'Main Gate →Old arena';
  const paidFor       = route?.params?.paidFor     || 'Monday – Thursday';
  const driversId     = route?.params?.driversId   || 'RCT-02';
  const date          = route?.params?.date        || 'June 20, 2024, 10:45pm';
  const driverName    = driverProfile.fullName      || 'Eben Favour O.';

  const handleDownload = () => {
    // TODO: implement PDF/image receipt download
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Success Header ── */}
        <View style={s.successHeader}>
          <Text style={s.successTitle}>Payment Successful!</Text>

          {/* Checkmark badge */}
          <View style={s.checkCircle}>
             <Image
                                            source={require('../assets/Verified W 1 (1).png')}
                                                 style={s.verify} />  
          </View>
        </View>

        {/* ── Receipt Card ── */}
        <View style={s.receiptWrapper}>

          {/* Zigzag top edge */}
          <ZigzagEdge position="top" />

          <View style={s.receiptBody}>

            {/* Logo + Title */}
            <View style={s.receiptHeader}>
              <Image
                source={require('../assets/rccgIcon.png')}
                style={s.receiptLogo}
                resizeMode="contain"
              />
              <View>
                <Text style={s.receiptBrand}>REDEMPTION</Text>
                <Text style={s.receiptBrand}>CITY TRANSIT</Text>
              </View>
            </View>

            <Text style={s.receiptTitle}>Transaction Receipt</Text>

            <View style={s.receiptDivider} />

            {/* Receipt Rows */}
            <ReceiptRow label="DRIVER:"         value={driverName} />
            <ReceiptRow label="DRIVERS ID:"     value={driversId} />
            <ReceiptRow label="AXIS:"           value={axis} />
            <ReceiptRow label="DATE:"           value={date} />
            <ReceiptRow label="PAID FOR"        value={paidFor} />

            <View style={s.receiptDividerDashed} />

            <ReceiptRow label="AMOUNT PAID:"    value={amountPaid}    bold />
            <ReceiptRow label="PAYMENT METHOD:" value={paymentMethod} bold />

          </View>

          {/* Zigzag bottom edge */}
          <ZigzagEdge position="bottom" />
        </View>

        {/* ── Download Receipt ── */}
        <TouchableOpacity style={s.downloadBtn} onPress={handleDownload} activeOpacity={0.85}>
          <Text style={s.downloadIcon}>⬇</Text>
          <Text style={s.downloadText}>Download Receipt</Text>
        </TouchableOpacity>

        {/* ── Back to Home ── */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Text style={s.backHome}>Back to Home</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

// ── Zigzag Edge Component ─────────────────────────────────────────
function ZigzagEdge({ position }) {
  const teeth = 18;
  return (
    <View style={[
      zz.row,
      position === 'top' ? zz.top : zz.bottom,
    ]}>
      {Array.from({ length: teeth }).map((_, i) => (
        <View
          key={i}
          style={[
            zz.tooth,
            position === 'top' ? zz.toothTop : zz.toothBottom,
          ]}
        />
      ))}
    </View>
  );
}

const zz = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  top: {
    marginBottom: -1,
    transform: [{ rotate: '180deg' }],
  },
  bottom: {
    marginTop: -1,
  },
  tooth: {
    flex: 1,
    height: 14,
  },
  toothTop: {
    backgroundColor: C.bg,
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
  },
  toothBottom: {
    backgroundColor: C.bg,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
  },
});

// ── Receipt Row ───────────────────────────────────────────────────
function ReceiptRow({ label, value, bold }) {
  return (
    <View style={s.receiptRow}>
      <Text style={[s.receiptLabel, bold && s.receiptLabelBold]}>{label}</Text>
      <Text style={[s.receiptValue, bold && s.receiptValueBold]}>{value}</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  container: {
    flexGrow: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  // Success Header
  successHeader: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  successTitle: {
    color: C.white,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 20,
    textAlign: 'center',
  },
  checkCircle: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: C.white,
    fontSize: 30,
    fontWeight: '900',
  },

  // Receipt
  receiptWrapper: {
    width: '100%',
    marginTop: 20,
  },
  receiptBody: {
    backgroundColor: C.receiptBg,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  receiptLogo: {
    width: 40,
    height: 40,
  },
  receiptBrand: {
    fontSize: 13,
    fontWeight: '900',
    color: C.primary,
    letterSpacing: 1,
    lineHeight: 17,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    marginTop: 8,
    marginBottom: 12,
  },
  receiptDivider: {
    height: 1.5,
    backgroundColor: '#222',
    marginBottom: 10,
  },
  receiptDividerDashed: {
    height: 1,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderStyle: 'dashed',
    marginVertical: 12,
  },
  receiptRow: {
    flexDirection: 'row',
    marginBottom: 7,
    gap: 8,
  },
  receiptLabel: {
    width: 130,
    fontSize: 12,
    fontWeight: '800',
    color: C.text,
    letterSpacing: 0.3,
  },
  receiptLabelBold: {
    fontWeight: '900',
  },
  receiptValue: {
    flex: 1,
    fontSize: 12,
    color: C.muted,
    fontWeight: '500',
  },
  receiptValueBold: {
    fontWeight: '700',
    color: C.text,
  },

  // Download button
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: C.primaryBtn,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 28,
    width: '100%',
  },
  downloadIcon: {
    color: C.white,
    fontSize: 16,
  },
  downloadText: {
    color: C.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Back to home
  backHome: {
    color: C.white,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});