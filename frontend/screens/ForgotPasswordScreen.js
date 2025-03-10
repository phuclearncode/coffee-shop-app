// ForgotPasswordScreen.js
import React, { useState } from 'react';
import {View, SafeAreaView, TextInput, TouchableOpacity, Text, Alert, ImageBackground, ScrollView } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Giả lập gửi email (thực tế bạn sẽ tích hợp API để gửi email reset mật khẩu)
    if (email) {
      Alert.alert(
        'Reset Password',
        'A reset link has been sent to your email address. Please check your inbox to reset your password.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn'), // Điều hướng về màn hình đăng nhập
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Please enter a valid email address');
    }
  };

  return (
    <SafeAreaView className="w-full h-full f">
        <ImageBackground
                className="w-full h-full items-center"
                source={require('../assets/images/intro-coffee-image.png')} 
              >
    <View className="p-6">
        <View className='h-[90%]'>
      <Text className="text-4xl text-white text-center font-[Sora-SemiBold] mt-10">
        Forgot Password
      </Text>

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#A2A2A2"
        value={email}
        onChangeText={(text) => setEmail(text)}
        className="mt-8 p-4 rounded-md bg-white"
      />

      <TouchableOpacity
        className="bg-[#C67C4E] mt-10 p-4 rounded-lg items-center"
        onPress={handleResetPassword}
      >
        <Text className="text-white text-xl font-[Sora-SemiBold]">Send Reset Password</Text>
      </TouchableOpacity>
      </View>
      <Text className="text-center text-white mt-6">
                By signing in with an account, you agree to SO’s{' '}
                <Text className="text-[#C67C4E] underline">Terms of Service</Text> and{' '}
                <Text className="text-[#C67C4E] underline">Privacy Policy</Text>
              </Text>
      </View>
    </ImageBackground>
        </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
