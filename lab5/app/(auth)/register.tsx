import { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (!name || !email || !password || !confirmPassword) return;
        if (password !== confirmPassword) return;

        register(email, password, name);
        router.replace('/');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Реєстрація</Text>
                <Text style={styles.subtitle}>Створи акаунт для доступу до каталогу</Text>

                <TextInput
                    placeholder="Ім’я"
                    placeholderTextColor="#94a3b8"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />

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

                <TextInput
                    placeholder="Підтвердження паролю"
                    placeholderTextColor="#94a3b8"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                </TouchableOpacity>

                <Link href="/login" style={styles.link}>
                    Уже є акаунт? Увійти
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
        backgroundColor: '#16a34a',
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