import { Image, Text, View } from 'react-native'
import React from 'react'

const Banner = () => {
  return (
    <View className='rounded-lg items-center'>
      <View className='absolute w-full h-[90px] -top-q items-center bg-[#222222] pb-10 '/>
        <Image className='w-[90%] h-36 rounded-3xl' source={require('../assets/images/Banner.png')} />
        {/* <View className='absolute w-[90%] pl-7 mt-2 '>

        <Text className='bg-[#ED5151} rounded-lg text-white text-m font-[Sora-SemiBold] p-1.5 self-start'>Promo</Text>
            <View className='bg-[#222222] w-[75%] h-7 top-6'>

            </View>
            <View className='bg-[#222222] w-[60%] h-7 top-9'>

            </View>
            <Text className='text-white text-4xl font-[Sora-SemiBold] mt-2 w-[75%] -top-16'>
                Buy one get one FREE

            </Text>
        </View> */}
      </View>

  )
}

export default Banner

