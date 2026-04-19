import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Про додаток</Text>

            <View style={styles.card}>
                <Text style={styles.text}>
                    Цей додаток створено за допомогою Expo та React Native.
                </Text>
                <Text style={styles.text}>
                    У роботі використано базові компоненти: View, Text та StyleSheet.
                </Text>
                <Text style={styles.text}>
                    Для переходу між екранами реалізовано навігацію через Expo Router.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#222',
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        elevation: 4,
    },
    text: {
        fontSize: 17,
        lineHeight: 25,
        color: '#333',
        marginBottom: 12,
    },
});