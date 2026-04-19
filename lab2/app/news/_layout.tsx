import { Stack } from 'expo-router';

export default function NewsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Новини' }} />
            <Stack.Screen name="details" options={{ title: 'Деталі' }} />
        </Stack>
    );
}