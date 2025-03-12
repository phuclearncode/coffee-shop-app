import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/PageHeader'

const Profile = () => {
  return (
    <View>
      <PageHeader title={'Profile'} showHeaderRight={false} bgColor={'#F9F9F9'} />
      <Text>Profile</Text>
    </View>
  )
}

export default Profile
