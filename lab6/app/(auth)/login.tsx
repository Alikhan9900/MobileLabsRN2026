import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                Alert.alert('Помилка', 'Введи email та пароль');
                return;
            }

            await login(email.trim(), password);
            router.replace('/(app)/home');
        } catch (error: any) {
            Alert.alert('Помилка входу', error.message || 'Не вдалося увійти');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вхід</Text>

            <AppInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <AppInput
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <AppButton title="Увійти" onPress={handleLogin} />

            <Link href="/(auth)/register" style={styles.link}>
                Немає акаунта? Реєстрація
            </Link>

            <Link href="/(auth)/forgot-password" style={styles.link}>
                Забув пароль?
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