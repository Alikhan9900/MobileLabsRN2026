import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type AppButtonProps = {
    title: string;
    onPress: () => void;
    color?: string;
};

export default function AppButton({
                                      title,
                                      onPress,
                                      color = '#2563eb',
                                  }: AppButtonProps) {
    return (
        <Pressable onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});