import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import  Icon from 'react-native-vector-icons/FontAwesome'



const home = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.form}>Form Pengaduan</Text>
        </View>
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
          placeholder='hay'
          style={styles.text}>
        </TextInput>
        {/* <View style={{ padding: 5, margin: 20 }}>
          <Button title="Submit"
          ></Button>
        </View> */}
      
      <View>
          <TouchableOpacity>
            <Icon name='plus' size={30}></Icon>
          </TouchableOpacity>
        </View>
    </View>

  )
}

export default home

const styles = StyleSheet.create({
  text: {
    borderRadius: 8,
    borderWidth: 2,
    margin: 10
  },
  container: {
    flex: 1,
    margin: 20,
    paddingTop: 30
  },
  form: {
    fontSize: 30,
    paddingVertical: 20
  }
})

