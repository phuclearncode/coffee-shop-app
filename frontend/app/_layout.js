// _layout.js
import React from 'react';
// import { useFonts } from "expo-font";
import { NativeWindStyleSheet } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import Home from '../app/(tabs)/home';
import Profile from '../app/(tabs)/profile';
import Order from '../app/(tabs)/order';
import Feather from '@expo/vector-icons/Feather';
import DetailsPage from './details';
import {CartProvider} from '@/components/CartContext'
import {RootSiblingParent} from  'react-native-root-siblings'
import { ToastProvider } from 'react-native-toast-notifications'
// Thiết lập NativeWind để sử dụng với React Native
NativeWindStyleSheet.setOutput({
  default: 'native',
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabsNavigator = () => {
  // const [fontsLoaded] = useFonts({
  //   "Sora-Regular": require("../assets/fonts/Sora-Regular.ttf"),
  //   "Sora-SemiBold": require("../assets/fonts/Sora-SemiBold.ttf"),
  //   "Sora-Bold": require("../assets/fonts/Sora-Bold.ttf"),
  // });
  return (
    <Tab.Navigator
     screenOptions = { {tabBarActiveTintColor: '#C67C4E'}}>
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({color}) => (<Feather name="home" size={24} color={color} />)}} />
      {/* Add more screens if needed */}
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarStyle: { display: 'none' }, tabBarIcon: ({color}) => (<Feather name="user" size={24} color={color} />)}} />
      <Tab.Screen name="Orders" component={Order} options={{ tabBarStyle: { display: 'none' }, tabBarIcon: ({color}) => (<Feather name="shopping-cart" size={24} color={color} />)}}/>
    </Tab.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <CartProvider>
      <RootSiblingParent>
      <ToastProvider>
        
      <Stack.Navigator>
        <Stack.Screen name="Intro" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Tabs' component={TabsNavigator}  options={{ headerShown: false }} />
        <Stack.Screen name='details' component={DetailsPage} options={{ headerShown: true }} />
      </Stack.Navigator>
      
      </ToastProvider>
      </RootSiblingParent>
      </CartProvider>
  );
};

export default AppNavigator;