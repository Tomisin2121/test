// screens/SignUpScreen.style.js
import { StyleSheet } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.primary,
    paddingBottom: Spacing.xxl,
  },

  // ── Header ──
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  logoText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: FontSize.sm,
  },
  logo: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  brandName: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: '900',
    letterSpacing: 1.5,
    lineHeight: 24,
  },

  // ── Card ──
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    marginTop: Spacing.xxxl,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  // ── Phone Row ──
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  flagBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderRightWidth: 1,
    borderRightColor: Colors.inputBorder,
    gap: 4,
  },
  flag: {
    fontSize: FontSize.md,
  },
  dialCode: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.md,
    color: Colors.text,
  },

  // ── Input ──
  inputRow: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    marginBottom: Spacing.sm,
  },
  forgotInline: {
    position: 'absolute',
    right: Spacing.sm,
    top: Spacing.sm + 2,
  },
  forgotText: {
    fontSize: FontSize.xs,
    color: Colors.link,
    fontWeight: '600',
  },

  // ── Primary Button ──
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    alignItems: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // ── Divider ──
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.divider,
  },
  dividerText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },

  // ── Social ──
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  facebookBtn: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  socialIcon: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.text,
  },

  // ── Bottom ──
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  bottomText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  linkText: {
    fontSize: FontSize.sm,
    color: Colors.link,
    fontWeight: '700',
  },

  // ── Legal ──
  legal: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});
