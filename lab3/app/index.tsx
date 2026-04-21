import React, { useMemo, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useThemeContext } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';

export default function GameScreen() {
    const { darkTheme } = useThemeContext();

    const {
        score,
        setScore,
        tapCount,
        setTapCount,
        doubleTapCount,
        setDoubleTapCount,
        longPressDone,
        setLongPressDone,
        dragDone,
        setDragDone,
        swipeRightDone,
        setSwipeRightDone,
        swipeLeftDone,
        setSwipeLeftDone,
        pinchDone,
        setPinchDone,
    } = useGame();

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [savedScale, setSavedScale] = useState(1);

    const addScore = (points: number) => {
        setScore((prev) => prev + points);
    };

    const tapGesture = Gesture.Tap()
        .maxDuration(250)
        .onEnd((_e, success) => {
            if (success) {
                addScore(1);
                setTapCount((prev) => prev + 1);
            }
        })
        .runOnJS(true);

    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(300)
        .onEnd((_e, success) => {
            if (success) {
                addScore(2);
                setDoubleTapCount((prev) => prev + 1);
            }
        })
        .runOnJS(true);

    const longPressGesture = Gesture.LongPress()
        .minDuration(3000)
        .onEnd((_e, success) => {
            if (success) {
                addScore(5);
                setLongPressDone(true);
            }
        })
        .runOnJS(true);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            setPosition({
                x: savedPosition.x + e.translationX,
                y: savedPosition.y + e.translationY,
            });
        })
        .onEnd(() => {
            setSavedPosition(position);
            setDragDone(true);
            addScore(3);
        })
        .runOnJS(true);

    const swipeRightGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onEnd((_e, success) => {
            if (success) {
                addScore(4);
                setSwipeRightDone(true);
            }
        })
        .runOnJS(true);

    const swipeLeftGesture = Gesture.Fling()
        .direction(Directions.LEFT)
        .onEnd((_e, success) => {
            if (success) {
                addScore(4);
                setSwipeLeftDone(true);
            }
        })
        .runOnJS(true);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            setScale(savedScale * e.scale);
        })
        .onEnd(() => {
            setSavedScale(scale);
            setPinchDone(true);
            addScore(3);
        })
        .runOnJS(true);

    const tapGroup = Gesture.Exclusive(doubleTapGesture, tapGesture, longPressGesture);
    const moveGroup = Gesture.Simultaneous(
        panGesture,
        swipeLeftGesture,
        swipeRightGesture,
        pinchGesture
    );
    const finalGesture = Gesture.Simultaneous(tapGroup, moveGroup);

    const completedTasks = useMemo(() => {
        let count = 0;
        if (tapCount >= 10) count++;
        if (doubleTapCount >= 5) count++;
        if (longPressDone) count++;
        if (dragDone) count++;
        if (swipeRightDone) count++;
        if (swipeLeftDone) count++;
        if (pinchDone) count++;
        if (score >= 100) count++;
        if (score >= 20) count++;
        return count;
    }, [
        tapCount,
        doubleTapCount,
        longPressDone,
        dragDone,
        swipeRightDone,
        swipeLeftDone,
        pinchDone,
        score,
    ]);

    return (
        <View style={[styles.container, darkTheme && styles.containerDark]}>
            <Text style={[styles.title, darkTheme && styles.titleDark]}>Gesture Clicker</Text>
            <Text style={[styles.score, darkTheme && styles.titleDark]}>Очки: {score}</Text>
            <Text style={[styles.progress, darkTheme && styles.progressDark]}>
                Виконано завдань: {completedTasks}/9
            </Text>

            <GestureDetector gesture={finalGesture}>
                <View
                    style={[
                        styles.circle,
                        {
                            transform: [
                                { translateX: position.x },
                                { translateY: position.y },
                                { scale: scale },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.circleText}>ТИСНИ</Text>
                </View>
            </GestureDetector>

            <View style={[styles.infoBox, darkTheme && styles.cardDark]}>
                <Text style={[styles.infoTitle, darkTheme && styles.titleDark]}>Жести:</Text>
                <Text style={[styles.infoText, darkTheme && styles.infoTextDark]}>Tap: +1 очко</Text>
                <Text style={[styles.infoText, darkTheme && styles.infoTextDark]}>Double Tap: +2 очки</Text>
                <Text style={[styles.infoText, darkTheme && styles.infoTextDark]}>Long Press 3 сек: +5 очок</Text>
                <Text style={[styles.infoText, darkTheme && styles.infoTextDark]}>Drag: +3 очки</Text>
                <Text style={[styles.infoText, darkTheme && styles.infoTextDark]}>Swipe Left / Right: +4 очки</Text>
                <Text style={[styles.infoText, darkTheme && styles.infoTextDark]}>Pinch: +3 очки</Text>
            </View>

            <View style={[styles.statsBox, darkTheme && styles.cardDark]}>
                <Text style={[styles.statsText, darkTheme && styles.infoTextDark]}>Tap: {tapCount}</Text>
                <Text style={[styles.statsText, darkTheme && styles.infoTextDark]}>
                    Double Tap: {doubleTapCount}
                </Text>
                <Text style={[styles.statsText, darkTheme && styles.infoTextDark]}>
                    Long Press: {longPressDone ? '✅' : '❌'}
                </Text>
                <Text style={[styles.statsText, darkTheme && styles.infoTextDark]}>
                    Drag: {dragDone ? '✅' : '❌'}
                </Text>
                <Text style={[styles.statsText, darkTheme && styles.infoTextDark]}>
                    Swipe Right: {swipeRightDone ? '✅' : '❌'}
                </Text>
                <Text style={[styles.statsText, darkTheme && styles.infoTextDark]}>
                    Swipe Left: {swipeLeftDone ? '✅' : '❌'}
                </Text>
                <Text style={[styles.statsText, darkTheme && styles.infoTextDark]}>
                    Pinch: {pinchDone ? '✅' : '❌'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7fb',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    containerDark: {
        backgroundColor: '#0f172a',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    titleDark: {
        color: '#ffffff',
    },
    score: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 14,
        color: '#0f172a',
    },
    progress: {
        fontSize: 16,
        marginTop: 8,
        marginBottom: 30,
        color: '#475569',
    },
    progressDark: {
        color: '#cbd5e1',
    },
    circle: {
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: '#38bdf8',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        marginBottom: 30,
    },
    circleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    infoBox: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
    },
    statsBox: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        elevation: 3,
    },
    cardDark: {
        backgroundColor: '#1e293b',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#111827',
    },
    infoText: {
        fontSize: 15,
        marginBottom: 6,
        color: '#374151',
    },
    infoTextDark: {
        color: '#cbd5e1',
    },
    statsText: {
        fontSize: 15,
        marginBottom: 6,
        color: '#334155',
    },
});