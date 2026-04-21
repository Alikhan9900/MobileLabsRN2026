import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system/legacy';

export default function EditorScreen() {
  const { path } = useLocalSearchParams<{ path: string }>();
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (!path) return;

    const parts = path.split('/');
    setFileName(parts[parts.length - 1]);

    loadFile();
  }, [path]);

  const loadFile = async () => {
    try {
      const text = await FileSystem.readAsStringAsync(path);
      setContent(text);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося прочитати файл.');
      console.error(error);
    }
  };

  const saveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(path, content);
      Alert.alert('Успіх', 'Файл збережено.');
      router.back();
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зберегти файл.');
      console.error(error);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>{fileName}</Text>

        <TextInput
            style={styles.editor}
            multiline
            value={content}
            onChangeText={setContent}
            placeholder="Вміст файлу"
            textAlignVertical="top"
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveFile}>
          <Text style={styles.saveButtonText}>Зберегти зміни</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
    color: '#0f172a',
  },
  editor: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 14,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});