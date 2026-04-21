import { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        login(email, password);
        router.replace('/');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Вхід</Text>
                <Text style={styles.subtitle}>Увійди, щоб переглянути каталог товарів</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#94a3b8"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Пароль"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>

                <Link href="/register" style={styles.link}>
                    Немає акаунту? Зареєструватися
                </Link>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        elevation: 4,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748b',
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#f1f5f9',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 14,
        color: '#0f172a',
    },
    button: {
        backgroundColor: '#2563eb',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 6,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    link: {
        marginTop: 18,
        color: '#2563eb',
        textAlign: 'center',
        fontSize: 15,
    },
});