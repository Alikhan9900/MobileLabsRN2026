import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameContextType = {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;

    tapCount: number;
    setTapCount: React.Dispatch<React.SetStateAction<number>>;

    doubleTapCount: number;
    setDoubleTapCount: React.Dispatch<React.SetStateAction<number>>;

    longPressDone: boolean;
    setLongPressDone: React.Dispatch<React.SetStateAction<boolean>>;

    dragDone: boolean;
    setDragDone: React.Dispatch<React.SetStateAction<boolean>>;

    swipeRightDone: boolean;
    setSwipeRightDone: React.Dispatch<React.SetStateAction<boolean>>;

    swipeLeftDone: boolean;
    setSwipeLeftDone: React.Dispatch<React.SetStateAction<boolean>>;

    pinchDone: boolean;
    setPinchDone: React.Dispatch<React.SetStateAction<boolean>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [score, setScore] = useState(0);
    const [tapCount, setTapCount] = useState(0);
    const [doubleTapCount, setDoubleTapCount] = useState(0);
    const [longPressDone, setLongPressDone] = useState(false);
    const [dragDone, setDragDone] = useState(false);
    const [swipeRightDone, setSwipeRightDone] = useState(false);
    const [swipeLeftDone, setSwipeLeftDone] = useState(false);
    const [pinchDone, setPinchDone] = useState(false);

    return (
        <GameContext.Provider
            value={{
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
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error('useGame must be used inside GameProvider');
    }

    return context;
}