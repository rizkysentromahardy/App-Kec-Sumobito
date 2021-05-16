import React, { useState, useEffect, useCallback } from 'react'
import { Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import database from '@react-native-firebase/database'
import moment from "moment";

const chatting = () => {
    const [messages, setMessages] = useState()

    useEffect(() => {
        var onValueChange = null
        const getChat = () => {
            onValueChange = database()
                .ref(`/chatting/123`)
                .on('value', snapshot => {
                    var newArr = []
                    snapshot.forEach((resp) => {
                        let data = resp.val();
                        let obj = { ...data }
                        obj.createdAt = moment(data.createdAt).toDate()
                        newArr.unshift(obj)
                    })
                    setMessages(newArr)
                });

        }

        getChat()

        // Stop listening for updates when no longer required
        return () =>
            database()
                .ref(`/chatting/123`)
                .off('value', onValueChange);
    }, []);

    // console.log(moment(moment().toString()).toDate());
    const onSend = useCallback((pesan = []) => {
        var obj = { ...pesan[0] }
        obj.createdAt = moment().toString();
        database()
            .ref('chatting/123')
            .push(obj)
            .then(() => console.log('Data set.'));
    }, [])
    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name:'Riski'

            }}
            messagesContainerStyle={{
                backgroundColor:'#fff'
            }}

        />
    )
}

export default chatting
