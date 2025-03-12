// rfnes
import { Text, View, Image  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import {products, categories} from '../../data'
import Feather from '@expo/vector-icons/Feather';
import SearchArea from '@/components/SearchArea' 
import Banner from '@/components/Banner'

const Home = () => {

  // const [products, setProducts] = useState(true)

  // useEffect(() => {
  //   console.log('Home')
  // }, [])
  return (
    <GestureHandlerRootView>
      <SafeAreaView className='h-full w-full rounded-2xl'>
        // Why not put header here
        <FlatList
        horizontal = {false}
        numColumns={2}
        columnWrapperStyle = {{justifyContent: 'space-between', marginLeft: 10, marginRight: 10}}
        keyExtractor={(item,index) => index.toString()}
        data = {products}
        renderItem={({item}) => {
          return (
            <View className='w-[48%] mt-2 bg-white p-2 flex justify-between rounded-2xl'>

              <TouchableOpacity>
                <Image className='w-full h-32 rounded-2xl ' source={{uri: item.image_url}} />
                <Text className='text-[#242424] text-lg font-[Sora-SemiBold] ml-1 mt-2'>{item.name}</Text>
                <Text className='text-[#A2A2A2] text-sm font-[Sora-Regular] ml-1 mt-2'>{item.category}</Text>
              </TouchableOpacity>

              <View className='flex-row justify-between ml-1 mt-4 mb-2'>
                <Text className='text-[#050505] text-xl font-[Sora-SemiBold]'>${item.price}</Text>
                
                <TouchableOpacity className='bg-[#C67C4E] p-1 rounded-xl'>
                  <View>
                  <Feather name="plus" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              
              </View>
            </View>
          )
        }}

        ListHeaderComponent={()=> (
          <View className='flex'>
            
            <SearchArea />
            <Banner />
            <View className='flex items-center'>
            <FlatList 
            className='mt-6 w-[90%] mb-2'
            data={categories}
            horizontal = {true}
            renderItem={({item}) => (
              
                <TouchableOpacity 
                onPress={() => {}}
                >
                  <Text className={`text-white text-sm font-[Sora-Regular] mr-4 p-3 rounded-lg 
                   ${item.selected ? 'text-white' : 'text-[#313131]'}
                   ${item.selected ? 'bg-[#C67C4E]' : 'bg-[#EDEDED]'}
                   `}
                   >{item}</Text>
                </TouchableOpacity>
             )}
            />
            </View>
              
            
          </View>
        )}
        
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home