import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Ionicons from  'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';

const ThemePicker = ({ navigation }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(isDarkMode ? 'dark' : 'light');

    useEffect(() => {
        const loadTheme = async() => {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme) {
                setSelectedTheme(storedTheme);
            }
        };
        loadTheme();
    }, []);

    const handleThemeChange = async (theme) => {
        setSelectedTheme(theme);

        await AsyncStorage.setItem('theme', theme);
        if ((theme === 'dark' && !isDarkMode) || (theme === 'light' && isDarkMode)) {
            toggleTheme();
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.mainCont}>
            <View style={styles.themePickers}>
                <View style={styles.labelCont}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('mainTabs')}>
                        <Ionicons name='arrow-back' color="white" size={24} style={styles.manageSVG} />
                    </TouchableOpacity>
                    <Text style={styles.themeLabel}>Theme</Text>
                </View>


                <View style={styles.modePicker}>
                    <TouchableOpacity
                        style={styles.radioBtn}
                        onPress={() => handleThemeChange('dark')}
                    >
                        <Ionicons
                            name={selectedTheme === 'dark' ? 'radio-button-on' : 'radio-button-off'}
                            size={24}
                            color={'#FFF'}
                        />
                        <Text style={styles.radioLabel}>Dark Mode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioBtn}
                        onPress={() => handleThemeChange('light')}
                    >
                        <Ionicons
                            name={selectedTheme === 'light' ? 'radio-button-on' : 'radio-button-off'}
                            size={24}
                            color={'#FFF'}
                        />
                        <Text style={styles.radioLabel}>Light Mode</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 40,
    },

    //#region Label Container
    labelCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    manageSVG: {
        padding: 7.5,
        width: 40,
        height: 40,
        textAlign: 'center'
    },
    themeLabel: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 21,
    },
    //#endregion Label Container

    //#region Color Mode Selections
    modePicker: {
        backgroundColor: '#1A2433',
        marginVertical: 20,
        borderRadius: 15,
    },
    radioBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 35,
        paddingVertical: 20,
        marginLeft: 10,
    },
    radioLabel: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    //#endregion Color Mode Selections
})

export default ThemePicker;