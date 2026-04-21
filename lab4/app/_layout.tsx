import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen
            name="index"
            options={{ title: 'Файловий менеджер' }}
        />
        <Stack.Screen
            name="editor"
            options={{ title: 'Редактор файлу' }}
        />
        <Stack.Screen
            name="info"
            options={{ title: 'Інформація про файл' }}
        />
      </Stack>
  );
}