import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  InteractionManager,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  RefreshControl
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { InputData } from '../component'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import axios from 'axios'
import { RadioButton } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'

const screen = Dimensions.get('window')

function home(props) {
  const [ImgPic, setImgPic] = useState(null);
  const [Nama, setNama] = useState('')
  const [Alamat, setAlamat] = useState('')
  const [Jenis, setJenis] = useState('')
  const [Telp, setTelp] = useState('')
  const [Catatan, setCatatan] = useState('')
  const [Loading, setLoading] = useState(false)



  useEffect(() => {
    let task = InteractionManager.runAfterInteractions(() => {
      const cekSts = async () => {
        try {
          let kode = await AsyncStorage.getItem('kode');
          if (kode !== null) {
            let obj = JSON.parse(kode);
            if (obj?.id) {
              console.log(JSON.parse(kode));
              props.navigation.replace('status')

            }
          }
          SplashScreen.hide();
        } catch (error) {
          console.log(error);
        }

      }
      cekSts()
    })
    return () => {
      task.cancel()
    }
  }, []);


  const senddingData = () => {
    var formData = new FormData();
    if (Nama == '') {
      return alert('Nama Belum di isi...!')
    }

    if (Telp == '') {
      return alert('No. Telepon belum di isi...!')
    }

    if (Jenis == '') {
      return alert('Jenis Pengaduan Belum di isi...!')
    }

    if (Alamat == '') {
      return alert('Alamat Belum di isi...!')
    }

    if (Catatan == '') {
      return alert('Catatan Belum di isi...!')
    }

    if (ImgPic == null) {
      return alert('Catatan Belum di isi...!')
    }

    formData.append('nama', String(Nama));
    formData.append('alamat', String(Alamat));
    formData.append('jenis', String(Jenis)); // only value [kk | ktp]
    formData.append('telp', String(Telp));
    formData.append('note', String(Catatan));
    formData.append('gambar', ImgPic);
    // console.log(JSON.stringify(formData));
    setLoading(true)
    axios({
      url: 'https://kecsumobito.000webhostapp.com/config/createdata.php',
      method: 'POST',
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "Cookie":"__test=e50407cd378b4de62c115cb041abe710"
      }
    }).then(async (rsp) => {
      console.log('iki respone: ', rsp.data);
      if (rsp.data.status == 'ok') {
        let obj = {
          id: rsp.data.id,
          kode: rsp.data.kode_tiket
        }
        await AsyncStorage.setItem('kode', JSON.stringify(obj));
        ToastAndroid.show('Berhasil Kirim Data...', ToastAndroid.SHORT);
        props.navigation.replace('status')
      }
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setLoading(false)
    })
  }

  const onPick = () => {
    const options = {
      height: 1000,
      width: 500,
      quality: 0.7
    }
    launchImageLibrary(options, (response) => {
      // console.log('error')
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // console.log(response);
        let dataImg = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };
        setImgPic(dataImg)
      }
    })
  }

  return (
    
    <ScrollView
     style={styles.container} contentContainerStyle={{ padding: 17 }}>
       <View style= {{ transform :[{rotate:"45deg"}],paddingTop:40,paddingLeft:40,}}>
        <Text style= {styles.watermark}>Test</Text>
      </View>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View>
        <Text style={styles.form}>Form Pengaduan</Text>
      </View>
      <InputData label='Nama Lengkap' placeholder='Masukan Nama' onChangeText={setNama} />
      <InputData label='Nomer Telp' placeholder='Masukan No. Hp' keyboardType='number-pad' onChangeText={setTelp} />
      <InputData label='Alamat' placeholder='Masukan Alamat' isTextArea={true} onChangeText={setAlamat} />
      <View>
        <Text style={styles.label}>Jenis Laporan</Text>
        <View style={styles.radio}>
          <RadioButton
            value="KK"
            status={Jenis === 'KK' ? 'checked' : 'unchecked'}
            onPress={() => setJenis('KK')}
          />
          <Text style={styles.slct}> KK
            </Text>
        </View>
        <View style={styles.radio}>
          <RadioButton
            color="red"
            value="KTP"
            status={Jenis === 'KTP' ? 'checked' : 'unchecked'}
            onPress={() => setJenis('KTP')}
          />
          <Text style={styles.slct}> KTP</Text>
        </View>
      </View>
      <View>
        <InputData label='Catatan Keterangan' placeholder='Keterangan' isTextArea={true} onChangeText={setCatatan} />
      </View>
      <Text style={styles.label}>Upload Gambar KK / KTP</Text>
      <TouchableOpacity onPress={onPick}>
      <ImageBackground source={ImgPic ? { uri: ImgPic.uri } : undefined}
        style={{
          height: styles.img.height,
          width: styles.img.width,
          borderRadius: 10,
          backgroundColor: '#f5f5f5',
          marginTop: 8,

        }}
        imageStyle={{
          borderRadius: 10,

        }}
      >
          {
            ImgPic == null ?
              <View style={[styles.img, { backgroundColor: 'transparent' }]}>
                <Icon name='image' size={44} color={'#707070'} />
              </View>
              : undefined
          }
      </ImageBackground>
        </TouchableOpacity>
      <View>
        {
          Loading ?
            <View style={{ marginVertical: 17 }}>
              <ActivityIndicator color={'red'} size={38} />
            </View>
            :
            <TouchableOpacity
              onPress={() => senddingData()}
              style={{
                backgroundColor: '#1dc280',
                paddingVertical: 14,
                borderRadius: 10,
                marginTop: 17
              }}
            >
              <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center', fontSize: 17 }}>Kirim Laporan</Text>
            </TouchableOpacity>

        }
      </View>
      {/* <View style={styles.wrapper}>
        <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('chatting')}>
          <Icon name='plus' size={24} color={'white'}></Icon>
        </TouchableOpacity>
      </View> */}
    </ScrollView>

  )
}


export default home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 17,
  },
  label: {
    marginTop: 17,
    fontSize: 16,
    marginBottom: 0,
    fontWeight: 'bold',
    color: '#848C97'
  },
  form: {
    fontSize: 30,
    paddingVertical: 20,
    color: '#3D3E40'
  },
  wrapper: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20
  },
  btn: {
    backgroundColor: '#0984e3',
    width: 52,
    height: 52,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: screen.width * .4,
    width: screen.width - 34,
    backgroundColor: '#ededed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ababab',
    borderWidth: 1,
    // borderStyle: 'dashed',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  slct: {
    marginTop: 0,
    fontSize: 16,
    marginBottom: 0,
    fontWeight: 'bold',
    color: '#848C97'
  },
  watermark:{
    position:'absolute',
    backgroundColor:'blue',
    color:'white',
    fontSize:25,
    // position:'absolute',
    textAlign:'center',
    top: -80, left: 135 , right: -80, bottom: 80, 

  }
})
