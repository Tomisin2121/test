import { View, Text, Image, StyleSheet } from 'react-native';
import { useEffect } from 'react';

export default function LandingPage({ navigation }) {

  console.log('navigation:', navigation); // ADD THIS

  useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace('SignUp');  // replace instead of navigate
  }, 3000);

  return () => clearTimeout(timer);
}, []);

  return (
    <View style={s.container}>
      <Image
        source={require('../assets/rccgIcon.png')}
        style={s.logo}
      />
      <Text style={s.title}>CITY TRANSIT</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B4332',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
  },
});