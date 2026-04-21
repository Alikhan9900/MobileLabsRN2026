import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
    darkTheme: boolean;
    setDarkTheme: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useThemeContext must be used inside ThemeProvider');
    }

    return context;
}