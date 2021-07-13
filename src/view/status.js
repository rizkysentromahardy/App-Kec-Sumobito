import React, { useEffect, useMemo, useState, useCallback } from 'react'
import {
    StyleSheet, StatusBar,
    RefreshControl,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    Image,
    Text, View, InteractionManager, LogBox, Alert, SafeAreaView
} from 'react-native'
import Timeline from 'react-native-timeline-flatlist'
import axios from 'axios'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler'

const screen = Dimensions.get('window');

const status = (props) => {

    const [data, setData] = useState([]);
    const [idpengaduan, setIdPengaduan] = useState(null);
    const [kodeTiket, setKodeTiket] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [Loading, setLoading] = useState(true)

    useFocusEffect(useCallback(() => {

        let task = InteractionManager.runAfterInteractions(async () => {
            
            let kode = await AsyncStorage.getItem('kode');

            if (kode != null) {

                let obj = JSON.parse(kode)

                // SET VALUE KE USESTATE
                setIdPengaduan(obj.id)
                setKodeTiket(obj.kode)
                getData(obj.id)
                
            }
            
        });
        return () => {
            task.cancel();
        }
    }, []));

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
        
        
        var loop = null;
        
        const autoRefreshData = async () => {

            // AMBIL DATA USER DARI STORAGE
            let kode = await AsyncStorage.getItem('kode');
            
            // CEK KONDISI VALUE DARI KODE JIKA TIDAK SAMA DENGAN NULL INTERVAL DIJALANKAN
            if (kode != null) {
                
                // DARI DATA YG DIAMBIL BERUPA STRING DI KONVERSI KE JSON
                let obj = JSON.parse(kode);

                // MENJALANKAN INTERVAL
                loop = setInterval(() => {
                    getData(obj.id)
                }, 1000);
            }
        }

        // MENJALANKAN TUGAS SETELAH SELESAI ANIMASI BERJALAN
        let task = InteractionManager.runAfterInteractions(() => {
            autoRefreshData()
        })

        return () => {

            if (loop) {
                // MENGHENTIKAN INTERVAL
                clearInterval(loop);
            }

            if (task) {
                // MENGHENTIKAN SEMUA TUGAS DI DALAM VAR TASK
                task.cancel()
            }
        }
    }, []);

    // MENGAMBIL DATA DARI SERVER
    const getData = (kode) => {
        console.log('get data ', kode);
        axios.get(`http://192.168.43.6/admin/main/config/cekstatus.php?kode=${kode}`, {
            headers: {
                "Cookie": "__test=e50407cd378b4de62c115cb041abe710"
            },
            timeout: 10000
        }).then((result) => {
            console.log('sukses: ', result.data);
            setData(result.data);
            setRefreshing(false)
        }).catch((error) => {
            setRefreshing(false);
            console.log('gagal: ', error);
        }).finally(() => {
            setLoading(false);
            setRefreshing(false);
        })
    }

    const checkColorLine = (sts) => {
        switch (sts.toLowerCase()) {
            case 'pending':
                return '#7eb2e6'
            case 'proses':
                return '#e88331'
            case 'selesai':
                return '#39d4b0'
            default:
                return 'gray'
        }
    }

    const checkColorDot = (sts) => {
        if (sts) {
            switch (sts.toLowerCase()) {
                case 'pending':
                    return '#39d4b0'
                case 'proses':
                    return '#39d4b0'
                case 'selesai':
                    return '#39d4b0'
                default:
                    return '#b3b3b3'
            }
        } else {
            return '#b3b3b3'
        }
    }

    const checkNama = (arr = []) => {
        // console.log('check name : ', arr.length);
        if (arr.length) {
            return arr[0].nama
        } else {
            return null
        }
    }

    const checkDate = (arr = []) => {
        if (arr?.length) {
            return arr[0].date
        } else {
            return null
        }
    }

    const checkBottomStatus = (arr = []) => {
        if (arr?.length) {
            return true
        } else {
            return false
        }
    }

    const statusdata = useMemo(() => {

        if (data.length > 0) {
            return [
                {
                    time: checkDate(data.filter(o => o.nama == 'pending')) ? moment(checkDate(data.filter(o => o.nama == 'pending'))).local().format('HH:mm') : '-',
                    title: checkDate(data.filter(o => o.nama == 'pending')) ? moment(checkDate(data.filter(o => o.nama == 'pending'))).local().format('dddd, DD MMM YYYY HH:mm ') : '-',
                    description: 'Pengaduan di terima',
                    lineColor: '#b3b3b3',
                    circleColor: checkColorDot(checkNama(data.filter(o => o.nama == 'pending')))
                },
                {
                    time: checkDate(data.filter(o => o.nama == 'proses')) ? moment(checkDate(data.filter(o => o.nama == 'proses'))).local().format('HH:mm') : '-',
                    title: checkDate(data.filter(o => o.nama == 'proses')) ? moment(checkDate(data.filter(o => o.nama == 'proses'))).local().format('dddd, DD MMM YYYY HH:mm ') : '-',
                    description: 'Sedang di Proses',
                    lineColor: '#b3b3b3',
                    circleColor: checkColorDot(checkNama(data.filter(o => o.nama == 'proses'))),
                },
                {
                    time: checkDate(data.filter(o => o.nama == 'selesai')) ? moment(checkDate(data.filter(o => o.nama == 'selesai'))).local().format('HH:mm') : '-',
                    title: checkDate(data.filter(o => o.nama == 'selesai')) ? moment(checkDate(data.filter(o => o.nama == 'selesai'))).local().format('dddd, DD MMM YYYY HH:mm ') : '-',
                    description: 'Selesai',
                    lineColor: '#b3b3b3',
                    circleColor: checkColorDot(checkNama(data.filter(o => o.nama == 'selesai')))
                }
            ]
        } else {
            return [
                {
                    time: '-',
                    title: '-',
                    description: 'Pengaduan di terima',
                    lineColor: '#b3b3b3',
                    circleColor: '#b3b3b3'
                },
                {
                    time: '-',
                    title: '-',
                    description: 'Sedang di Proses',
                    lineColor: '#b3b3b3',
                    circleColor: '#b3b3b3',
                },
                {
                    time: '-',
                    title: '-',
                    description: 'Selesai',
                    lineColor: '#b3b3b3',
                    circleColor: '#b3b3b3',
                }
            ]
        }
    }, [data])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (idpengaduan) {
            // setLoading(true)
            // console.log('iki reload');
            getData(idpengaduan)
        }
    }, [])

    const onDone = () => {
        Alert.alert('Konfirmasi', 'Apakah pengaduan ini sudah di selesaikan oleh pihak kecamatan?',
            [
                {
                    text: 'Batal'
                },
                {
                    text: 'Ya, Selesai',
                    onPress: async () => {
                        await AsyncStorage.removeItem('kode');
                        props.navigation.replace('Home')
                    }
                }
            ]
        )
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 32 }}>
                    <Image
                        source={require('../assets/images/list.png')}
                        style={{
                            height: screen.width * .5,
                            width: screen.width * .5
                        }}
                    />
                </View>
                <Text style={{ color: '#4a4a4a', fontSize: 20, fontWeight: 'bold' }}>kode pengaduan ({kodeTiket})</Text>
                <Timeline style={styles.list}
                    data={statusdata}
                    showTime={false}
                    descriptionStyle={styles.descriptionStyle}
                    titleStyle={styles.titleStyle}
                    eventDetailStyle={{ marginTop: 0, paddingTop: 0 }}
                >

                </Timeline>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 24 }}>
                    {
                        Loading ?
                            <ActivityIndicator color={'red'} size={32} />
                            : undefined
                    }
                </View>
                <View >
                    {
                        checkBottomStatus(checkNama(data?.filter(o => o.nama == 'selesai'))) ?
                            <Text style={styles.notif}>
                                Silahkan Ambil Berkas di Kecamatan !!
                                Berserta Berkas Pendukung

                            </Text>
                            : undefined
                    }
                </View>
            </View>

            <View style={{ backgroundColor: 'smoke', paddingVertical: 20 }}>
                <TouchableOpacity
                    onPress={() => onDone()}
                    disabled={!checkBottomStatus(checkNama(data?.filter(o => o.nama == 'selesai')))}
                    style={{
                        backgroundColor: checkBottomStatus(checkNama(data?.filter(o => o.nama == 'selesai'))) ? '#27d962' : '#b3b3b3',
                        paddingVertical: 14,
                        marginHorizontal: 17
                    }}
                >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Pengaduan Selesai</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default status

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 65,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    descriptionStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 3,
        marginBottom: 17
    },
    titleStyle: {
        fontWeight: '400',
        color: '#666666',
        fontSize: 12,
    },
    notif: {
        fontStyle: 'italic',
        fontSize: 18,
        textAlign: 'center',
        color: 'red',
    }
})
