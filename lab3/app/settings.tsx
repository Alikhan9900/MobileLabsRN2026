import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
    const { darkTheme, setDarkTheme } = useThemeContext();
    const [soundEnabled, setSoundEnabled] = useState(true);

    return (
        <View style={[styles.container, darkTheme && styles.containerDark]}>
            <Text style={[styles.title, darkTheme && styles.titleDark]}>Налаштування</Text>

            <View style={[styles.card, darkTheme && styles.cardDark]}>
                <View style={styles.row}>
                    <Text style={[styles.label, darkTheme && styles.labelDark]}>Темна тема</Text>
                    <Switch value={darkTheme} onValueChange={setDarkTheme} />
                </View>

                <View style={styles.row}>
                    <Text style={[styles.label, darkTheme && styles.labelDark]}>Звук кліків</Text>
                    <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
                </View>
            </View>

            <View style={[styles.infoCard, darkTheme && styles.cardDark]}>
                <Text style={[styles.infoText, darkTheme && styles.infoTextDark]}>
                    Тут реалізовано глобальне перемикання теми для всього додатку.
                </Text>
                <Text style={[styles.infoText, darkTheme && styles.infoTextDark]}>
                    Після ввімкнення темної теми вона застосовується до всіх екранів.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        padding: 20,
        paddingTop: 30,
    },
    containerDark: {
        backgroundColor: '#0f172a',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#111827',
    },
    titleDark: {
        color: '#ffffff',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 18,
        elevation: 3,
        marginBottom: 16,
    },
    cardDark: {
        backgroundColor: '#1e293b',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 17,
        color: '#1f2937',
    },
    labelDark: {
        color: '#ffffff',
    },
    infoCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 18,
        elevation: 3,
    },
    infoText: {
        fontSize: 15,
        color: '#475569',
        marginBottom: 8,
    },
    infoTextDark: {
        color: '#cbd5e1',
    },
});