import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage                from './screens/LandingPage';
import SignUpScreen               from './screens/SignUpScreen';
import LoginScreen                from './screens/LoginScreen';
import ForgotPasswordScreen       from './screens/ForgotPasswordScreen';
import VerificationScreen         from './screens/VerificationScreen';
import NewPasswordScreen          from './screens/NewPasswordScreen';
import HomeScreen                 from './screens/HomeScreen';
import RouteMapScreen             from './screens/RouteMapScreen';
import NearestNapepScreen         from './screens/NearestNapepScreen';
import RidersRegistrationScreen   from './screens/RidersRegistrationScreen';
import RiderLoginScreen           from './screens/RiderLoginScreen';
import DriversRegistrationScreen  from './screens/DriversRegistrationScreen';
import RegistrationSuccessScreen  from './screens/RegistrationSuccessScreen';
import DriverPaymentScreen           from './screens/DriverPaymentScreen';
import TransactionReceiptScreen           from './screens/TransactionReceiptScreen';
import PaymentSuccessScreen          from './screens/PaymentSuccessScreen';
import MyProfileScreen            from  './screens/MyProfileScreen'
import PasswordChangedScreen from './screens/PasswordChangedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
      >
        {/* Auth Flow */}
        <Stack.Screen name="Landing"              component={LandingPage} />
        <Stack.Screen name="SignUp"               component={SignUpScreen} />
        <Stack.Screen name="Login"                component={LoginScreen} />
        <Stack.Screen name="ForgotPassword"       component={ForgotPasswordScreen} />
        <Stack.Screen name="Verification"         component={VerificationScreen} />
        <Stack.Screen name="NewPassword"          component={NewPasswordScreen} />
        <Stack.Screen name="PasswordChanged"          component={PasswordChangedScreen} />


        {/* Main App */}
        <Stack.Screen name="Home"                 component={HomeScreen} />
        <Stack.Screen name="RouteMap"             component={RouteMapScreen} />
        <Stack.Screen name="NearestNapep"         component={NearestNapepScreen} />
        <Stack.Screen name="MyProfile"         component={MyProfileScreen} />
        <Stack.Screen name="RidersRegistration"   component={RidersRegistrationScreen} />
        <Stack.Screen name="RiderLogin"           component={RiderLoginScreen} />

        {/* Driver Flow */}
        <Stack.Screen name="DriversRegistration"  component={DriversRegistrationScreen} />
        <Stack.Screen name="DriverPayment"        component={DriverPaymentScreen} />
        <Stack.Screen name="PaymentSuccess"       component={PaymentSuccessScreen} />
        <Stack.Screen name="RegistrationSuccess"  component={RegistrationSuccessScreen} />
        <Stack.Screen name="TransactionReceipt"   component={TransactionReceiptScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
