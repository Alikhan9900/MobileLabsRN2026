import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function AppInput(props: TextInputProps) {
    return <TextInput style={styles.input} placeholderTextColor="#888" {...props} />;
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});