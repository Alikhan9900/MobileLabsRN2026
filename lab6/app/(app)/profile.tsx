import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

export default function ProfileScreen() {
    const { user, getProfile, saveProfile, removeAccount, logout } = useAuth();

    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        void loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const profile = await getProfile();

            if (profile) {
                setName(profile.name ?? '');
                setAge(profile.age ?? '');
                setCity(profile.city ?? '');
            }
        } catch (error: any) {
            Alert.alert('Помилка завантаження', error.message || 'Не вдалося завантажити профіль');
        }
    };

    const handleSave = async () => {
        try {
            await saveProfile({ name, age, city });
            Alert.alert('Успіх', 'Профіль оновлено');
        } catch (error: any) {
            Alert.alert('Помилка збереження', error.message || 'Не вдалося зберегти профіль');
        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Підтвердження',
            'Ти впевнений, що хочеш видалити акаунт?',
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            if (!password) {
                                Alert.alert('Помилка', 'Введи пароль для підтвердження');
                                return;
                            }

                            await removeAccount(user?.email || '', password);
                            Alert.alert('Успіх', 'Акаунт видалено');
                            router.replace('/(auth)/login');
                        } catch (error: any) {
                            Alert.alert('Помилка видалення', error.message || 'Не вдалося видалити акаунт');
                        }
                    },
                },
            ]
        );
    };

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Мій профіль</Text>

            <AppInput
                placeholder="Ім'я"
                value={name}
                onChangeText={setName}
            />

            <AppInput
                placeholder="Вік"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />

            <AppInput
                placeholder="Місто"
                value={city}
                onChangeText={setCity}
            />

            <AppButton title="Зберегти профіль" onPress={handleSave} />

            <View style={{ height: 24 }} />

            <Text style={styles.subtitle}>Видалення акаунта</Text>

            <AppInput
                placeholder="Введи пароль для підтвердження"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <AppButton
                title="Видалити акаунт"
                onPress={handleDelete}
                color="#dc2626"
            />

            <AppButton
                title="Вийти"
                onPress={handleLogout}
                color="#6b7280"
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
});