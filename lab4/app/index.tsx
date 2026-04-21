import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system/legacy';

type ItemType = {
    name: string;
    path: string;
    isDirectory: boolean;
};

type CreateMode = 'folder' | 'file';

const ROOT_PATH = FileSystem.documentDirectory || '';

export default function FileManagerScreen() {
    const [currentPath, setCurrentPath] = useState(ROOT_PATH);
    const [items, setItems] = useState<ItemType[]>([]);
    const [loading, setLoading] = useState(false);

    const [freeSpace, setFreeSpace] = useState<number>(0);
    const [totalSpace, setTotalSpace] = useState<number>(0);

    const [modalVisible, setModalVisible] = useState(false);
    const [createMode, setCreateMode] = useState<CreateMode>('folder');
    const [newName, setNewName] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        if (!ROOT_PATH) {
            Alert.alert('Помилка', 'documentDirectory недоступний');
            return;
        }
        loadDirectory(currentPath);
        loadStorageStats();
    }, [currentPath]);

    const ensureTrailingSlash = (path: string) => {
        return path.endsWith('/') ? path : `${path}/`;
    };

    const joinPath = (base: string, name: string) => {
        return `${ensureTrailingSlash(base)}${name}`;
    };

    const formatBytes = (bytes: number) => {
        if (!bytes && bytes !== 0) return '—';

        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let value = bytes;
        let unitIndex = 0;

        while (value >= 1024 && unitIndex < units.length - 1) {
            value /= 1024;
            unitIndex++;
        }

        return `${value.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
    };

    const loadStorageStats = async () => {
        try {
            const free = await FileSystem.getFreeDiskStorageAsync();
            const total = await FileSystem.getTotalDiskCapacityAsync();
            setFreeSpace(free);
            setTotalSpace(total);
        } catch (error) {
            console.error('Помилка отримання статистики памʼяті:', error);
        }
    };

    const loadDirectory = async (path: string) => {
        try {
            setLoading(true);

            const safePath = ensureTrailingSlash(path);
            const names = await FileSystem.readDirectoryAsync(safePath);
            const resolved: ItemType[] = [];

            for (const name of names) {
                const fullPath = joinPath(safePath, name);
                const info = await FileSystem.getInfoAsync(fullPath);

                resolved.push({
                    name,
                    path: fullPath,
                    isDirectory: info.exists && info.isDirectory,
                });
            }

            resolved.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });

            setItems(resolved);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося завантажити вміст папки.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const goUp = () => {
        const safeCurrent = ensureTrailingSlash(currentPath);

        if (safeCurrent === ensureTrailingSlash(ROOT_PATH)) return;

        const trimmed = safeCurrent.endsWith('/')
            ? safeCurrent.slice(0, -1)
            : safeCurrent;

        const lastSlashIndex = trimmed.lastIndexOf('/');
        const parentPath = trimmed.slice(0, lastSlashIndex + 1);

        if (!parentPath.startsWith('file://')) {
            setCurrentPath(ROOT_PATH);
            return;
        }

        if (parentPath.length < ROOT_PATH.length) {
            setCurrentPath(ROOT_PATH);
            return;
        }

        setCurrentPath(parentPath);
    };

    const openItem = (item: ItemType) => {
        if (item.isDirectory) {
            setCurrentPath(ensureTrailingSlash(item.path));
            return;
        }

        if (item.name.toLowerCase().endsWith('.txt')) {
            router.push({
                pathname: '/editor',
                params: { path: item.path },
            });
        } else {
            Alert.alert('Увага', 'Для перегляду відкриваються лише .txt файли.');
        }
    };

    const openInfo = (item: ItemType) => {
        router.push({
            pathname: '/info',
            params: { path: item.path },
        });
    };

    const confirmDelete = (item: ItemType) => {
        Alert.alert(
            'Підтвердження',
            `Видалити "${item.name}"?`,
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await FileSystem.deleteAsync(item.path, { idempotent: true });
                            await loadDirectory(currentPath);
                            await loadStorageStats();
                        } catch (error) {
                            Alert.alert('Помилка', 'Не вдалося видалити обʼєкт.');
                            console.error(error);
                        }
                    },
                },
            ]
        );
    };

    const openCreateModal = (mode: CreateMode) => {
        setCreateMode(mode);
        setNewName('');
        setNewContent(mode === 'file' ? 'Новий текстовий файл' : '');
        setModalVisible(true);
    };

    const createItem = async () => {
        const trimmedName = newName.trim();

        if (!trimmedName) {
            Alert.alert('Увага', 'Введи назву.');
            return;
        }

        if (!currentPath.startsWith('file://')) {
            Alert.alert('Помилка', 'Некоректний поточний шлях.');
            setCurrentPath(ROOT_PATH);
            return;
        }

        try {
            if (createMode === 'folder') {
                const folderPath = joinPath(currentPath, trimmedName);
                await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
            } else {
                const safeName = trimmedName.endsWith('.txt') ? trimmedName : `${trimmedName}.txt`;
                const filePath = joinPath(currentPath, safeName);
                await FileSystem.writeAsStringAsync(filePath, newContent);
            }

            setModalVisible(false);
            setNewName('');
            setNewContent('');
            await loadDirectory(currentPath);
            await loadStorageStats();
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося створити обʼєкт.');
            console.error(error);
        }
    };

    const usedSpace = totalSpace - freeSpace;

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Файловий менеджер</Text>

            <View style={styles.statsCard}>
                <Text style={styles.statsTitle}>Статистика памʼяті</Text>
                <Text style={styles.statsText}>Загальний обсяг: {formatBytes(totalSpace)}</Text>
                <Text style={styles.statsText}>Вільно: {formatBytes(freeSpace)}</Text>
                <Text style={styles.statsText}>Зайнято: {formatBytes(usedSpace)}</Text>
            </View>

            <View style={styles.pathCard}>
                <Text style={styles.pathLabel}>Поточний шлях:</Text>
                <Text style={styles.pathText}>{currentPath}</Text>

                <TouchableOpacity
                    style={[styles.upButton, currentPath === ROOT_PATH && styles.disabledButton]}
                    onPress={goUp}
                    disabled={currentPath === ROOT_PATH}
                >
                    <Text style={styles.upButtonText}>⬅ Вгору</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionButton} onPress={() => openCreateModal('folder')}>
                    <Text style={styles.actionButtonText}>+ Папка</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={() => openCreateModal('file')}>
                    <Text style={styles.actionButtonText}>+ TXT файл</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.path}
                refreshing={loading}
                onRefresh={() => loadDirectory(currentPath)}
                ListEmptyComponent={<Text style={styles.emptyText}>Папка порожня</Text>}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <TouchableOpacity style={styles.itemMain} onPress={() => openItem(item)}>
                            <Text style={styles.itemIcon}>{item.isDirectory ? '📁' : '📄'}</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemType}>{item.isDirectory ? 'Папка' : 'Файл'}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.itemActions}>
                            <Pressable onPress={() => openInfo(item)}>
                                <Text style={styles.infoButton}>ℹ️</Text>
                            </Pressable>

                            <Pressable onPress={() => confirmDelete(item)}>
                                <Text style={styles.deleteButton}>🗑️</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>
                            {createMode === 'folder' ? 'Створити папку' : 'Створити текстовий файл'}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder={createMode === 'folder' ? 'Назва папки' : 'Назва файлу'}
                            value={newName}
                            onChangeText={setNewName}
                        />

                        {createMode === 'file' && (
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Початковий вміст"
                                value={newContent}
                                onChangeText={setNewContent}
                                multiline
                            />
                        )}

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Скасувати</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={createItem}
                            >
                                <Text style={styles.modalButtonText}>Створити</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
    heading: { fontSize: 28, fontWeight: '700', marginBottom: 16, color: '#0f172a' },
    statsCard: { backgroundColor: '#ffffff', borderRadius: 14, padding: 14, marginBottom: 14, elevation: 2 },
    statsTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
    statsText: { fontSize: 15, marginBottom: 4, color: '#334155' },
    pathCard: { backgroundColor: '#ffffff', borderRadius: 14, padding: 14, marginBottom: 14, elevation: 2 },
    pathLabel: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
    pathText: { fontSize: 13, color: '#475569', marginBottom: 12 },
    upButton: { backgroundColor: '#2563eb', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
    upButtonText: { color: '#ffffff', fontWeight: '600' },
    disabledButton: { backgroundColor: '#94a3b8' },
    actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
    actionButton: { flex: 1, backgroundColor: '#0ea5e9', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
    actionButtonText: { color: '#ffffff', fontWeight: '600' },
    itemCard: { backgroundColor: '#ffffff', borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 2 },
    itemMain: { flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 8 },
    itemIcon: { fontSize: 24, marginRight: 10 },
    itemName: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
    itemType: { fontSize: 13, color: '#64748b', marginTop: 2 },
    itemActions: { flexDirection: 'row', gap: 12 },
    infoButton: { fontSize: 22 },
    deleteButton: { fontSize: 22 },
    emptyText: { textAlign: 'center', marginTop: 30, color: '#64748b', fontSize: 16 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.35)', justifyContent: 'center', padding: 18 },
    modalCard: { backgroundColor: '#ffffff', borderRadius: 14, padding: 18 },
    modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 14 },
    input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, backgroundColor: '#ffffff' },
    textArea: { minHeight: 110, textAlignVertical: 'top' },
    modalActions: { flexDirection: 'row', gap: 10 },
    modalButton: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
    cancelButton: { backgroundColor: '#94a3b8' },
    saveButton: { backgroundColor: '#16a34a' },
    modalButtonText: { color: '#ffffff', fontWeight: '700' },
});