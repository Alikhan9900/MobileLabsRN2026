import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

export default function NotFound() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.emoji}>😕</Text>
                <Text style={styles.title}>Екран не знайдено</Text>
                <Text style={styles.subtitle}>
                    Схоже, сторінка не існує або була переміщена.
                </Text>

                <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
                    <Text style={styles.buttonText}>На головну</Text>
                </TouchableOpacity>
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
        alignItems: 'center',
        elevation: 4,
    },
    emoji: {
        fontSize: 46,
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2563eb',
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '700',
    },
});