import React, { useEffect, useMemo, useState, useCallback } from 'react'
import {
    StyleSheet, StatusBar,
    RefreshControl,
    ScrollView,
    Text, View, InteractionManager
} from 'react-native'
import Timeline from 'react-native-timeline-flatlist'
import axios from 'axios'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler'

const status = () => {

    const [data, setData] = useState([]);
    const [idpengaduan, setIdPengaduan] = useState(null);
    const [refreshing, setRefreshing] = useState(false)

    useFocusEffect(useCallback(() => {
        console.log('heellooo');
        let task = InteractionManager.runAfterInteractions(async () => {
            let kode = await AsyncStorage.getItem('kode');
            console.log('kode :', JSON.parse(kode));
            let obj = JSON.parse(kode)
            setIdPengaduan(obj.id)
            getData(obj.id)
        });
        return () => {
            task.cancel();
        }
    }, []))

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {

        })
    }, [])
    const getData = (kode) => {
        axios.get(`http://192.168.43.6/admin/main/config/cekstatus.php?kode=${kode}`).then((result) => {
            console.log('sukses: ', result.data);
            setData(result.data);
            setRefreshing(false)
        }).catch((error) => {
            setRefreshing(false);
            console.log('gagal: ', error);
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
                    return 'gray'
            }
        } else {
            return 'gray'
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

    const checkDate = (arr) => {
        // console.log('ceck date: ', arr);
        if (arr.length) {
            return arr[0].date
        } else {
            return null
        }
    }

    // const checkButtonDone = useMemo(() => {
    //     if (data.length > 0) {
    //         let data = data.filter(o => o.nama == 'selesai')
    //         console.log(data);
    //     }

    // }, [data])

    const statusdata = useMemo(() => {

        if (data.length > 0) {
            return [
                {
                    time: checkDate(data.filter(o => o.nama == 'pending')) ? moment(checkDate(data.filter(o => o.nama == 'pending'))).format('HH:mm') : '-',
                    title: checkDate(data.filter(o => o.nama == 'pending')) ? moment(checkDate(data.filter(o => o.nama == 'pending'))).format('dddd, DD MMM YYYY HH:mm ') : '-',
                    description: 'Pengaduan di terima',
                    lineColor: 'gray',
                    circleColor: checkColorDot(checkNama(data.filter(o => o.nama == 'pending')))
                },
                {
                    time: checkDate(data.filter(o => o.nama == 'proses')) ? moment(checkDate(data.filter(o => o.nama == 'proses'))).format('HH:mm') : '-',
                    title: checkDate(data.filter(o => o.nama == 'proses')) ? moment(checkDate(data.filter(o => o.nama == 'proses'))).format('dddd, DD MMM YYYY HH:mm ') : '-',
                    description: 'Sedang di Proses',
                    lineColor: 'gray',
                    circleColor: checkColorDot(checkNama(data.filter(o => o.nama == 'proses'))),
                },
                {
                    time: checkDate(data.filter(o => o.nama == 'selesai')) ? moment(checkDate(data.filter(o => o.nama == 'selesai'))).format('HH:mm') : '-',
                    title: checkDate(data.filter(o => o.nama == 'selesai')) ? moment(checkDate(data.filter(o => o.nama == 'selesai'))).format('dddd, DD MMM YYYY HH:mm ') : '-',
                    description: 'Selesai',
                    lineColor: 'gray',
                    circleColor: checkColorDot(checkNama(data.filter(o => o.nama == 'selesai')))
                }
            ]
        } else {
            return [
                {
                    time: '-',
                    title: '-',
                    description: 'Pengaduan di terima',
                    lineColor: 'gray',
                    circleColor: 'gray'
                },
                {
                    time: '-',
                    title: '-',
                    description: 'Sedang di Proses',
                    lineColor: 'gray',
                    circleColor: 'gray',
                },
                {
                    time: '-',
                    title: '-',
                    description: 'Selesai',
                    lineColor: 'gray',
                    circleColor: 'gray',
                }
            ]
        }
    }, [data])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (idpengaduan) {
            getData(idpengaduan)
        }
    }, [])
    return (
        <View style={{ flex: 1 }}>

            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
                <Timeline style={styles.list}
                    data={statusdata}
                    showTime={false}
                    descriptionStyle={styles.descriptionStyle}
                    titleStyle={styles.titleStyle}
                    eventDetailStyle={{ marginTop: 0, paddingTop: 0 }}
                >

                </Timeline>
            </ScrollView>
            <View style={{ backgroundColor: 'smoke', paddingVertical: 20 }}>
                <TouchableOpacity style={{
                    backgroundColor: '#27d962',
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
    }
})
