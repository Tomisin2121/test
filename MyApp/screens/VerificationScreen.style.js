// screens/VerificationScreen.style.js
import { StyleSheet } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: Spacing.md,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },

  subtitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  // ── Code Boxes ──
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  codeBox: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    borderRadius: Radius.md,
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    backgroundColor: Colors.inputBg,
    textAlign: 'center',
  },
  codeBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },

  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 1,
  },

  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  resendText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  linkText: {
    fontSize: FontSize.sm,
    color: Colors.link,
    fontWeight: '700',
  },

  terms: {
    textAlign: 'center',
    marginTop: Spacing.lg,
    fontSize: FontSize.sm,
    color: Colors.link,
    fontWeight: '600',
  },
});
