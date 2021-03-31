import React from 'react'
import { StyleSheet, TextInput, Text, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
const InputData = ({ label, placeholder, keyboardType, isTextArea }) => {
    if (isTextArea) {
        return (
            <>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textArea}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                >
                </TextInput>
            </>
        )
    }

    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.text}
                placeholder={placeholder}
                keyboardType={keyboardType}
            >
            </TextInput>
        </>
    )
}

export default InputData

const styles = StyleSheet.create({
    text: {
        borderRadius: 8,
        borderWidth: 2,
        margin: 3
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        margin: 10
    },
    textArea: {
        borderRadius: 8,
        borderWidth: 2,
        margin: 3,
        textAlignVertical: 'top'
    }
})
