import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput } from 'react-native'


const home = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView >
        <TextInput
          style={styles.text}
          placeholder="Nama"
        >
        </TextInput>
        <TextInput
          placeholder="Alamat"
          style={styles.text}
        >
        </TextInput>
        <TextInput
          placeholder="Nomer HP"
          style={styles.text}
        >
        </TextInput>
        <TextInput
          
          style={styles.text}
        >
        </TextInput>
        <View style={{padding:5,margin:20}}>
          <Button title="Submit"
            onPress={() => {this.submit()}}></Button>
        </View>
      </SafeAreaView>
    </View>

  )
}

export default home

const styles = StyleSheet.create({
  text:{
    borderRadius:8,
    borderWidth:2,
    margin:10
  },
  container:{
    margin:20,
  }
})

