import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import AppButton from '../../components/AppButton';

export default function HomeScreen() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Головна</Text>
            <Text style={styles.subtitle}>Ви увійшли як: {user?.email}</Text>

            <AppButton title="Мій профіль" onPress={() => router.push('/(app)/profile')} />
            <AppButton title="Вийти" onPress={handleLogout} color="#dc2626" />
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
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
});