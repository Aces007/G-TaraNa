import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const darkTheme = {
    backgroundColor: '#1A2433',
    textColor: '#fff'
}

const lightTheme = {
    backgroundColor: '#f5f5f5',
    textColor: '#000'
}

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme === 'light') {
                setIsDarkMode(false);
            } else {
                setIsDarkMode(true);
            }
        }
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        await AsyncStorage.setItem('theme', newTheme);
        setIsDarkMode((prev) => !prev);
    };


    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);