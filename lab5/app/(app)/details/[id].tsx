import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../../../data/products';

export default function Details() {
    const { id } = useLocalSearchParams();

    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <SafeAreaView style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Товар не знайдено</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={{ uri: product.image }} style={styles.image} />

                <View style={styles.card}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>{product.price} грн</Text>

                    <Text style={styles.sectionTitle}>Опис товару</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        paddingBottom: 30,
    },
    image: {
        width: '100%',
        height: 320,
        backgroundColor: '#e2e8f0',
    },
    card: {
        backgroundColor: '#ffffff',
        margin: 16,
        marginTop: -24,
        borderRadius: 20,
        padding: 20,
        elevation: 4,
    },
    name: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 10,
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2563eb',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
    },
    notFoundContainer: {
        flex: 1,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0f172a',
    },
});