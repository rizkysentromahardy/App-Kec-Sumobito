import React,{useEffect}from 'react'
import { StyleSheet, Text, View } from 'react-native'

const spalsh = ({navigation}) => {
    useEffect(() => {
        setTimeout( () => {
            navigation.replace('Home');
        }, 3000)
    },[navigation])
    return (
        <View>
            <Text>splash</Text>
        </View>
    )
}

export default spalsh

const styles = StyleSheet.create({})
