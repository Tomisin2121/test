// screens/LoginScreen.style.js
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
    marginBottom: Spacing.lg,
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

  forgotBtn: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  forgotText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: '500',
  },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 1,
  },

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

  socialFullBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm + 2,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
    backgroundColor: Colors.white,
  },
  googleG: {
    fontSize: FontSize.md,
    fontWeight: '900',
    color: '#EA4335',
  },
  socialFullBtnText: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '600',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.md,
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
});
