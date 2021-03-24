import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { InputData } from '../component'



const home = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.form}>Form Pengaduan</Text>
      </View>
      <InputData label='Nama' placeholder='Masukan Nama'/>
      <InputData label='No. Hp' placeholder='Masukan No. Hp' keyboardType='number-pad'/>
      <InputData label='Alamat' placeholder='Masukan Alamat' isTextArea={true}/>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('chatting')}> 
          <Icon name='plus' size={23} color={'white'}></Icon>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    paddingTop: 15
  },
  form: {
    fontSize: 30,
    paddingVertical: 20
  },
  wrapper: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20
  },
  btn: {
    backgroundColor: 'skyblue',
    padding: 20,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  }
})

