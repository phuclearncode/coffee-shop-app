// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="w-full h-full f">
      <ImageBackground
        className="w-full h-full items-center f"
        source={require('../assets/images/intro-coffee-image.png')} 
      >
        <View className="flex h-[60%]" />
        <Text className="text-4xl text-white text-center mx-8 font-[Sora-SemiBold]">
          Fall in Love with Coffee in Hola Delight!
        </Text>
        <Text className="text-xl text-[#A2A2A2] text-center mx-8 font-[Sora-Regular] mt-3">
          Welcome to our mobile app
        </Text>
        <TouchableOpacity
          className="bg-[#C67C4E] mt-10 p-4 px-10 rounded-lg items-center"
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text className="text-white text-2xl font-[Sora-SemiBold]">Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;