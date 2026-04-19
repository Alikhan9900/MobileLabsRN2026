import { View, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function DetailsScreen() {
    const { title, desc } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: String(title),
        });
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22 }}>{title}</Text>
            <Text style={{ marginTop: 10 }}>{desc}</Text>
        </View>
    );
}