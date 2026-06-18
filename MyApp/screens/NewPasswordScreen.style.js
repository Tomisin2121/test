// screens/NewPasswordScreen.style.js
import { StyleSheet } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 100,
    marginTop: -200,
    textAlign: 'center'
  },

  label: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '900',
    marginBottom: Spacing.lg,
  },

  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: 20,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    marginBottom: Spacing.xl,
    letterSpacing: 2,
  },

  errorText: {
    fontSize: FontSize.sm,
    color: Colors.error,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md - 2,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 1,
  },

  terms: {
    textAlign: 'center',
    paddingTop:20,
    fontSize: FontSize.sm,
    color: Colors.link,
    fontWeight: '600',
  },
});
