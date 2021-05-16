import React from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    Button,
} from 'react-native'

const InputData = ({ label, placeholder, keyboardType, isTextArea, onChangeText }) => {
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
                    onChangeText={onChangeText}
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
                onChangeText={onChangeText}
            >
            </TextInput>
        </>
    )
}

export default InputData

const styles = StyleSheet.create({
    text: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E3E8F6',
        margin: 3,
        paddingHorizontal: 17,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#3D3E40'
    },
    label: {
        marginTop: 17,
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#848C97'
    },
    textArea: {
        borderRadius: 5,
        fontSize: 16,
        color: '#3D3E40',
        borderWidth: 1,
        margin: 3,
        paddingHorizontal: 17,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        borderColor: '#E3E8F6'
    }
})
