import React from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'

const home = () => {
  return (
    <View>
      <Button
        title="Go to form"
        onPress={() => this.props.navigation.navigate('form')}
      />
    </View>
  )
}

export default home

const styles = StyleSheet.create({})

