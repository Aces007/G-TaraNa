import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const darkTheme = {
    backgroundColor: '#0a0f1b',
    backgroundColor2: '#1A2433',
    backgroundColor3: '#fff',
    backgroundColor4: '#26393E',
    backgroundColor5: '#A8F94F',
    borderColor: '#FFF',
    buttonColor: '#A8F94F',
    textColor: '#fff',
    searchColor: '#000'
}

const lightTheme = {
    backgroundColor: '#f5f5f5',
    backgroundColor2: '#eaeaea',
    backgroundColor3: '#d9d9d9',
    backgroundColor4: '#bcbdbe',
    backgroundColor5: '#1b93ea',
    borderColor: '#000',
    buttonColor: '#1b93ea',
    textColor: '#000',
    searchColor: '#000',
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