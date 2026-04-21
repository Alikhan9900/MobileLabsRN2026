import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
    const { logout } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Каталог товарів</Text>
                    <Text style={styles.subtitle}>Обери товар для перегляду деталей</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Вийти</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Link href={`/details/${item.id}`} asChild>
                        <TouchableOpacity style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.cardContent}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text numberOfLines={2} style={styles.description}>
                                    {item.description}
                                </Text>
                                <Text style={styles.price}>{item.price} грн</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0f172a',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 4,
    },
    logoutButton: {
        backgroundColor: '#ef4444',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    logoutText: {
        color: '#ffffff',
        fontWeight: '700',
    },
    list: {
        padding: 16,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 190,
        backgroundColor: '#e2e8f0',
    },
    cardContent: {
        padding: 16,
    },
    productName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 20,
        marginBottom: 12,
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2563eb',
    },
});