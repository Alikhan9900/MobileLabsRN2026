import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Профіль</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Ім'я:</Text>
                <Text style={styles.value}>Бекіров Аліхан</Text>

                <Text style={styles.label}>Група:</Text>
                <Text style={styles.value}>ВТ-22-1</Text>

                <Text style={styles.label}>Дисципліна:</Text>
                <Text style={styles.value}>Розробка мобільних додатків</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef2f7',
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
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        color: '#111',
        marginTop: 4,
    },
});