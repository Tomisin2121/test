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

  

  title: {
    fontSize: 50,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xxl,
    marginTop: -95,
    textAlign: 'center'
  },

  input: {
    backgroundColor: '#D4D3D3',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 0.5,
    borderColor: Colors.inputBorder,
    marginBottom: Spacing.xl,
    gap:1
  },

  forgotBtn: {
    alignSelf: 'center',
    marginBottom: Spacing.md,
      textAlign: 'center'
  },
  forgotText: {
    fontSize: FontSize.lg,
    color: '#8E9496',
    fontWeight: '600',
  
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
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 0.5,
    borderColor: Colors.inputBorder,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,

    backgroundColor: '#D4D3D3',
  },
  googleG: {
    fontSize: FontSize.md,
    fontWeight: '900',
    color: '#EA4335',
  },
  socialFullBtnText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
    marginLeft:35,
    flex: 1
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
  apple: {
    width: 40,
    height: 40,
    
  },
  google:{
    height: 40,
    width: 40,
   
    
  }
});
