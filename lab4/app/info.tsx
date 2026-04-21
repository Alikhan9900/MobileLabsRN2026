import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system/legacy';

type FileData = {
  exists: boolean;
  isDirectory?: boolean;
  size?: number;
  modificationTime?: number;
};

export default function InfoScreen() {
  const { path } = useLocalSearchParams<{ path: string }>();
  const [info, setInfo] = useState<FileData | null>(null);

  useEffect(() => {
    loadInfo();
  }, [path]);

  const getFileName = () => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  const getExtension = () => {
    const name = getFileName();
    if (!name.includes('.')) return 'Папка або без розширення';
    return name.split('.').pop()?.toLowerCase() ?? 'Невідомо';
  };

  const formatBytes = (bytes?: number) => {
    if (bytes == null) return '—';
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = bytes;
    let index = 0;

    while (value >= 1024 && index < units.length - 1) {
      value /= 1024;
      index++;
    }

    return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
  };

  const formatDate = (seconds?: number) => {
    if (!seconds) return '—';
    return new Date(seconds * 1000).toLocaleString();
  };

  const loadInfo = async () => {
    try {
      const result = await FileSystem.getInfoAsync(path);
      setInfo(result);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося отримати інформацію про файл.');
      console.error(error);
    }
  };

  if (!info) {
    return (
        <View style={styles.container}>
          <Text>Завантаження...</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Детальна інформація</Text>

        <View style={styles.card}>
          <Text style={styles.row}><Text style={styles.label}>Назва:</Text> {getFileName()}</Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Тип:</Text> {info.isDirectory ? 'Папка' : getExtension()}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Розмір:</Text> {info.isDirectory ? '—' : formatBytes(info.size)}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Остання зміна:</Text> {formatDate(info.modificationTime)}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Повний шлях:</Text> {path}
          </Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },
  row: {
    fontSize: 16,
    marginBottom: 12,
    color: '#334155',
  },
  label: {
    fontWeight: '700',
    color: '#0f172a',
  },
});