// RegisterScreen.js (Cập nhật với thông báo xác nhận email)
import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Giả lập đăng ký và gửi email xác nhận
    if (email && password) {
      Alert.alert(
        'Verify Your Email',
        'A verification link has been sent to your email. Please verify your account.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn'), // Điều hướng về màn hình đăng nhập
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Please enter both email and password');
    }
  };

  return (
        <SafeAreaView className="w-full h-full f">
        <ImageBackground
                className="w-full h-full items-center"
                source={require('../assets/images/intro-coffee-image.png')} 
              >
                <View className='p-6'>
                    <View className='h-[90%]'>
      <Text className="text-4xl text-white text-center font-[Sora-SemiBold]">
        Register to Hola Coffee!
      </Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#A2A2A2"
        className="mt-8 p-4 rounded-md bg-white"
      />
      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#A2A2A2"
        value={email}
        onChangeText={(text) => setEmail(text)}
        className="mt-4 p-4 rounded-md bg-white"
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#A2A2A2"
        className="mt-4 p-4 rounded-md bg-white"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#A2A2A2"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        className="mt-4 p-4 rounded-md bg-white"
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#A2A2A2"
        secureTextEntry
        className="mt-4 p-4 rounded-md bg-white"
      />

      <TouchableOpacity
        className="bg-[#C67C4E] mt-10 p-4 rounded-lg items-center"
        onPress={handleRegister}
      >
        <Text className="text-white text-xl font-[Sora-SemiBold]">Next</Text>
      </TouchableOpacity>
      </View>
      <Text className="text-center text-white mt-6">
          By signing in with an account, you agree to SO’s{' '}
          <Text className="text-[#C67C4E]">Terms of Service</Text> and{' '}
          <Text className="text-[#C67C4E]">Privacy Policy</Text>
        </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default RegisterScreen;
