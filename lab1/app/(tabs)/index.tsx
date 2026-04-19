import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Головний екран</Text>
            <Text style={styles.subtitle}>Мій перший додаток на React Native</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Лабораторна робота №1</Text>
                <Text style={styles.cardText}>
                    У цьому додатку я ознайомився з Expo, React Native та базовою навігацією між екранами.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#222',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 25,
        color: '#555',
        textAlign: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
        color: '#111',
    },
    cardText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
});