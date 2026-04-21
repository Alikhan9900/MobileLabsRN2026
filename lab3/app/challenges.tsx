import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';

type ChallengeItem = {
    id: string;
    title: string;
    description: string;
    done: boolean;
};

export default function ChallengesScreen() {
    const { darkTheme } = useThemeContext();

    const {
        score,
        tapCount,
        doubleTapCount,
        longPressDone,
        dragDone,
        swipeRightDone,
        swipeLeftDone,
        pinchDone,
    } = useGame();

    const challenges: ChallengeItem[] = [
        {
            id: '1',
            title: 'Зробити 10 кліків',
            description: 'Натиснути на об’єкт 10 разів',
            done: tapCount >= 10,
        },
        {
            id: '2',
            title: 'Подвійний клік 5 разів',
            description: 'Зробити 5 double tap',
            done: doubleTapCount >= 5,
        },
        {
            id: '3',
            title: 'Утримувати 3 секунди',
            description: 'Виконати long press',
            done: longPressDone,
        },
        {
            id: '4',
            title: 'Перетягнути об’єкт',
            description: 'Використати drag gesture',
            done: dragDone,
        },
        {
            id: '5',
            title: 'Свайп вправо',
            description: 'Виконати swipe right',
            done: swipeRightDone,
        },
        {
            id: '6',
            title: 'Свайп вліво',
            description: 'Виконати swipe left',
            done: swipeLeftDone,
        },
        {
            id: '7',
            title: 'Змінити розмір об’єкта',
            description: 'Використати pinch',
            done: pinchDone,
        },
        {
            id: '8',
            title: 'Отримати 100 очок',
            description: 'Набрати 100 очок',
            done: score >= 100,
        },
        {
            id: '9',
            title: 'Власне завдання',
            description: 'Набрати 20 очок',
            done: score >= 20,
        },
    ];

    return (
        <View style={[styles.container, darkTheme && styles.containerDark]}>
            <Text style={[styles.title, darkTheme && styles.titleDark]}>Завдання</Text>

            <FlatList
                data={challenges}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                renderItem={({ item }) => (
                    <View style={[styles.card, darkTheme && styles.cardDark]}>
                        <View style={styles.row}>
                            <Text style={[styles.cardTitle, darkTheme && styles.textDark]}>{item.title}</Text>
                            <Text style={styles.status}>{item.done ? '✅' : '⭕'}</Text>
                        </View>
                        <Text style={[styles.cardText, darkTheme && styles.subTextDark]}>
                            {item.description}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        padding: 16,
        paddingTop: 24,
    },
    containerDark: {
        backgroundColor: '#0f172a',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 18,
        color: '#0f172a',
    },
    titleDark: {
        color: '#ffffff',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 14,
        elevation: 3,
    },
    cardDark: {
        backgroundColor: '#1e293b',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#111827',
        flex: 1,
        marginRight: 10,
    },
    textDark: {
        color: '#ffffff',
    },
    cardText: {
        marginTop: 8,
        fontSize: 14,
        color: '#475569',
    },
    subTextDark: {
        color: '#cbd5e1',
    },
    status: {
        fontSize: 18,
    },
});