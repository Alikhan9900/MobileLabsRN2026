import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

export default function ForgotPasswordScreen() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState<string>('');

    const handleReset = async () => {
        try {
            if (!email) {
                Alert.alert('Помилка', 'Введи email');
                return;
            }

            await resetPassword(email.trim());
            Alert.alert('Успіх', 'Лист для скидання пароля відправлено');
        } catch (error: any) {
            Alert.alert('Помилка', error.message || 'Не вдалося надіслати лист');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Скидання пароля</Text>

            <AppInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <AppButton title="Надіслати лист" onPress={handleReset} />

            <Link href="/(auth)/login" style={styles.link}>
                Назад до входу
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },
    link: {
        marginTop: 8,
        color: '#2563eb',
        fontSize: 15,
    },
});