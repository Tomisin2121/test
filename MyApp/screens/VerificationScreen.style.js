// screens/VerificationScreen.style.js
import { StyleSheet } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },

  // ── Header ──
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
    marginTop: Spacing.lg,
  },
  title: {
    fontSize: 28,        // ~16px — small, not bold
    fontWeight: '500',
    color: '#474848',
    textAlign: 'center',
  },

  // ── Body ──
  subtitle: {
    fontSize: 28,                 // large bold heading
    fontWeight: '800',
    color: '#1A1B1C',
    marginBottom: Spacing.xl,
    textAlign: 'center',
    marginTop: -50
  },

  // ── Code Boxes ──
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    gap: Spacing.md,              // slightly wider gap
  },
  codeBox: {
    flex: 1,
    height: 64,                   // taller / squarish
    borderWidth: 0,               // NO border by default
    borderRadius: Radius.md,
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    backgroundColor: '#D9D9D9', // light gray fill
    textAlign: 'center',
  },
  codeBoxFilled: {
    borderWidth: 2,
    borderColor: Colors.primary,  // border only when filled
    backgroundColor: Colors.white,
  },

  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'left',            // left-aligned (not center)
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },

  // ── Verify Button ──
  primaryBtn: {
    backgroundColor: '#0E280E',
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Resend ──
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // left-aligned
    flexWrap: 'wrap',
    marginTop: Spacing.xs,
  },
  resendText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  linkText: {
    fontSize: 16,
    color: '#0Dc2E2',
    fontWeight: '600',
  },

  // ── Terms ──
  terms: {
    textAlign: 'center',
    marginTop: 'auto',            // pushed to bottom
    paddingTop: Spacing.xl,
    fontSize: 18,
    color: '#0Dc2E2',
    fontWeight: '600',
    marginBottom: 80
  },
});