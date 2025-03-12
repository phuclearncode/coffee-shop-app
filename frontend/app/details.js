import {Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PageHeader from '@/components/PageHeader';
import DetailsHeader from '@/components/DetailsHeader';
import DescriptionSection from '@/components/DescriptionSection';
import SizesSection from '@/components/SizesSection';
import { useToast } from 'react-native-toast-notifications';
import { useCart } from '@/components/CartContext';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';


const DetailsPage = ({route}) => {
  const { name, image_url, description, price, category } = route.params;
  console.log(route.params); // Should print the params correctly

  const Toast = useToast();
  const {addToCart} = useCart();
  const buyNow = () => {
    addToCart(name, 1);
    Toast.show(`${name} added to cart`, {
      duration: 3000,
      placement: "bottom",
      type: "success",
      offset: 30,
      animationType: "slide-in",
    });
    router.back();
  };

  return (
    <GestureHandlerRootView className='h-full w-full bg-[#F9F9F9]'>
      <StatusBar backgroundColor="white" />
      <PageHeader title={'Detail'} showHeaderRight={true} bgColor={'#F9F9F9'} />
      
      <View className='h-full flex-col justify-between'>
        <ScrollView>
            <View className='mx-5 items-center'>
              <DetailsHeader image_url={image_url} name={name} category={category} />
              <DescriptionSection description={description} />
              <SizesSection />
            </View>
        </ScrollView>
        
        <View
          className='flex-row justify-between bg-white rounded-tl-3xl rounded-tr-3xl px-6 pt-3 pb-6'
        > 
          <View>
            <Text
                    className="text-[#A2A2A2] text-base font-[Sora-Regular] pb-3"
              >Price
            </Text>
            <Text
                    className="text-[#C67C4E] text-2xl font-[Sora-SemiBold]"
              >$ {price}
            </Text>
          </View>
            
          <TouchableOpacity 
                className="bg-[#C67C4E] w-[70%] rounded-3xl items-center justify-center" 
                onPress = {buyNow}
              >
                <Text className="text-xl color-white font-[Sora-Regular]">Buy Now</Text> 
          </TouchableOpacity> 
        
        </View>
        
      </View>
      
    </GestureHandlerRootView>
  )
}

export default DetailsPage
