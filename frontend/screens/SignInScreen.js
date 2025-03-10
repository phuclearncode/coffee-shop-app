// SignInScreen.js
import React from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
      const navigation = useNavigation();
  return (
    <SafeAreaView className="w-full h-full f">
    <ImageBackground
            className="w-full h-full items-center"
            source={require('../assets/images/intro-coffee-image.png')} 
          >
      <View className="p-6">
        <View className='h-[90%]'>
        <Text className="text-4xl text-white text-center font-[Sora-SemiBold]">
          Welcome to Hola Coffee!
        </Text>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#A2A2A2"
          className="mt-8 p-4 rounded-md bg-white"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#A2A2A2"
          secureTextEntry
          className="mt-4 p-4 rounded-md bg-white"
        />
        <Text
          className="text-right text-white mt-3 underline"
          onPress={() => navigation.navigate('ForgotPassword')} // Điều hướng đến Forgot Password
        >
          Forgot password?
        </Text>
        <TouchableOpacity
          className="bg-[#C67C4E] mt-6 p-4 rounded-lg"
          onPress={() => {}}
        >
          <Text className="text-white text-xl font-[Sora-SemiBold] text-center">Sign In</Text>
        </TouchableOpacity>
        
            <Text className="text-center text-white mt-4">
                Don't have an account yet?{' '}
            <Text className="text-[#C67C4E] underline" onPress={() => navigation.navigate('Register')}>Sign up</Text>
        </Text>
        </View>
        <Text className="text-center text-white mt-6 mb-4 ">
          By signing in with an account, you agree to SO’s{' '}
          <Text className="text-[#C67C4E] underline">Terms of Service</Text> and{' '}
          <Text className="text-[#C67C4E] underline">Privacy Policy</Text>
        </Text>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignInScreen;
