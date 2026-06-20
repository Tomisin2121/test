// screens/SignUpScreen.style.js
import { StyleSheet } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export const s = StyleSheet.create({
 

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
 container: {
  flexGrow: 1,
  backgroundColor: '#076007', // your green — swap for your theme color
},

card: {
  flex: 1,
  backgroundColor: '#fff',
  borderBottomLeftRadius: 60,
  borderBottomRightRadius: 60,
  paddingHorizontal: 24,
  padding: 72,
  marginBottom:200,// controls how much green shows at the top
},
  
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: {
  color: '#111',
  fontSize: 32,
  fontWeight: 'bold',
  letterSpacing: 2,
  textAlign: 'center',
  paddingTop: 25,
  paddingBottom: 24,

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
    gap: Spacing.xl,
    marginBottom: Spacing.md,
    marginTop: Spacing.md
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

 bottom: {
  paddingHorizontal: 24,
  paddingBottom: 20,
  paddingTop: 12,

},
legalText: {
  color: '#000',
  fontSize: 11,
  textAlign: 'center',
  opacity: 0.5,
},
facebook: {
  width: 65,
  height: 65
},
apple: {
  width: 65,
  height: 65,
},
google: {
  width: 65,
  height: 65
},
// Add these to your existing StyleSheet

passwordRow: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: Colors.inputBg,
  borderRadius: Radius.md,
  borderWidth: 1,
  borderColor: Colors.inputBorder,
  marginBottom: Spacing.sm,
},
passwordInput: {
  flex: 1,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.sm + 2,
  fontSize: FontSize.md,
  color: Colors.text,
},
eyeBtn: {
  paddingHorizontal: 12,
},
inputError: {
  borderColor: '#EF4444',
},
errorText: {
  fontSize: 11,
  color: '#EF4444',
  marginTop: -6,
  marginBottom: 6,
  marginLeft: 4,
},
strengthContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  gap: 8,
},
strengthBarBg: {
  flex: 1,
  height: 4,
  backgroundColor: '#E5E7EB',
  borderRadius: 99,
  overflow: 'hidden',
},
strengthBarFill: {
  height: 4,
  borderRadius: 99,
},
strengthLabel: {
  fontSize: 11,
  fontWeight: '600',
  width: 48,
},
matchText: {
  fontSize: 11,
  color: '#22C55E',
  marginTop: -6,
  marginBottom: 8,
  marginLeft: 4,
  fontWeight: '600',
},
});
