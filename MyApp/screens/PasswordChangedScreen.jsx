// screens/PasswordChangedScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../theme';

export default function PasswordChangedScreen({ navigation }) {
  return (
    <View style={s.container}>
      <View style={s.card}>

        <Image
                              source={require('../assets/verified icon 1 (1).png')}
                              style={s.facebook} />

        {/* Text */}
        <Text style={s.title}>Password Changed</Text>

        {/* Go to home */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={s.homeText}>
            Go to <Text style={s.homeLink}>home</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8B0B0',
    
   
   
  },

  card: {
    backgroundColor: Colors.white,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
   padding: Spacing.xxl,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    marginTop: 200,
    marginBottom: 100,
    height: 600
  
  },

  // Badge — gear/seal shape using layered circles

  title: {
    fontSize: FontSize.xl,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },

  homeText: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  homeLink: {
    color: '#0D82E2',
    fontWeight: '700',
  },
});
