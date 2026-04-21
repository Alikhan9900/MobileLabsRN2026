import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useThemeContext } from '../context/ThemeContext';
import { GameProvider } from '../context/GameContext';

function TabsLayout() {
    const { darkTheme } = useThemeContext();

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: darkTheme ? '#0f172a' : '#ffffff',
                },
                headerTintColor: darkTheme ? '#ffffff' : '#000000',
                tabBarStyle: {
                    backgroundColor: darkTheme ? '#111827' : '#ffffff',
                },
                tabBarActiveTintColor: darkTheme ? '#38bdf8' : '#2563eb',
                tabBarInactiveTintColor: darkTheme ? '#94a3b8' : '#6b7280',
            }}
        >
            <Tabs.Screen name="index" options={{ title: 'Гра' }} />
            <Tabs.Screen name="challenges" options={{ title: 'Завдання' }} />
            <Tabs.Screen name="settings" options={{ title: 'Налаштування' }} />
        </Tabs>
    );
}

export default function Layout() {
    return (
        <ThemeProvider>
            <GameProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <TabsLayout />
                </GestureHandlerRootView>
            </GameProvider>
        </ThemeProvider>
    );
}