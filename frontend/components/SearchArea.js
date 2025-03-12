import { Text, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';

const SearchArea = () => {
  return (
    <View className='w-full items-center bg-[#222222] pb-6'>
      <View className='flex w-[90%] pt-8'>
      <Text className='color-[#A2A2A2] text-sm font-[Sora-Regular]'>Location</Text>
      <Text className='text-white text-sm font-[Sora-Regular]'>Hoa Lac, Thach That</Text>

      <View className='w-full mt-5 flex-row justify-between'>
        <View className='flex w-[80%] h-10 bg-[#2A2A2A] rounded-2xl focus:border-2 justify-center px-4'>
          <Feather name="search" size={24} color="white" />
        </View>
        <TouchableOpacity className='flex-1 w-10 h-10 bg-[#C67C4E] rounded-2xl items-center justify-center'>
          <Entypo name="sound-mix" size={24} color="white" />
        </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

export default SearchArea