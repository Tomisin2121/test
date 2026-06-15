// screens/ForgotPasswordScreen.style.js
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
    fontSize: 30,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xxl,
    marginTop: -175,
    textAlign: 'center'
  },

  label: {
    fontSize: 20,
    color: '#8E9496',
    fontWeight: '600',
    marginBottom: Spacing.xs,
    marginTop: 30,
    textAlign:'center'
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
    marginTop: 20
  },

  backRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: Spacing.md,
    marginTop: 20
  },
  backText: {
    fontSize: 15,
    color: Colors.textMuted,
  },
  linkText: {
    fontSize: 15,
    color: Colors.link,
    fontWeight: '700',
  },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    alignItems: 'center',
    marginBottom:0,
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

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
    marginBottom: Spacing.lg,
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
  googleG: {
    fontSize: FontSize.lg,
    fontWeight: '900',
    color: '#EA4335',
  },
  socialIcon: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: Colors.text,
  },

  signUpBtn: {
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '600',
  },

  terms: {
    textAlign: 'center',
    marginTop: Spacing.lg,
    fontSize: FontSize.sm,
    color: Colors.link,
    fontWeight: '600',
  },
});
