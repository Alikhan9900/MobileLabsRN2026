import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Помилка', 'Введи email та пароль');
        return;
      }

      await register(email.trim(), password);
      Alert.alert('Успіх', 'Акаунт створено');
      router.replace('/(app)/home');
    } catch (error: any) {
      Alert.alert('Помилка реєстрації', error.message || 'Не вдалося створити акаунт');
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Реєстрація</Text>

        <AppInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
        />

        <AppInput
            placeholder="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />

        <AppButton title="Зареєструватись" onPress={handleRegister} />

        <Link href="/(auth)/login" style={styles.link}>
          Вже є акаунт? Увійти
        </Link>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  link: {
    marginTop: 8,
    color: '#2563eb',
    fontSize: 15,
  },
});