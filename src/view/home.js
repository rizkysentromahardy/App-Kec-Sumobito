import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { InputData } from '../component'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'

const screen = Dimensions.get('window')
const onPick = () => {
  const options = {

  }
  launchImageLibrary(options, (response) => {
    // console.log('error')
    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
      // console.log(response.uri);
    }
  })
}



const home = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.form}>Form Pengaduan</Text>
      </View>
      <InputData label='Nama' placeholder='Masukan Nama' />
      <InputData label='No. Hp' placeholder='Masukan No. Hp' keyboardType='number-pad' />
      <InputData label='Alamat' placeholder='Masukan Alamat' isTextArea={true} />
      <TouchableOpacity onPress={onPick}>
        <View style={styles.img}>
          <Icon name='camera' size={44} color={'white'}></Icon>
        </View>
      </TouchableOpacity>
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
    marginHorizontal: 17,
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
  },
  img: {
    height: screen.width * .4,
    width: screen.width - 34,
    backgroundColor: '#ededed',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17,
    borderColor: '#bfbdbd',
    borderWidth: 1,
    borderStyle: 'dashed',
  }
})

