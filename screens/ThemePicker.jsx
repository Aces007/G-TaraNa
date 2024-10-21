import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Ionicons from  'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';

const ThemePicker = ({ navigation }) => {
    const { isDarkMode, toggleTheme, currentTheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(isDarkMode ? 'dark' : 'light');

    useEffect(() => {
        setSelectedTheme(isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const handleThemeChange = async (theme) => {
        setSelectedTheme(theme);

        await AsyncStorage.setItem('theme', theme);
        if ((theme === 'dark' && !isDarkMode) || (theme === 'light' && isDarkMode)) {
            toggleTheme();
        }
    };


    return (
        <ScrollView contentContainerStyle={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>
            <View style={[styles.themePickers, {backgroundColor: currentTheme.backgroundColor}]}>
                <View style={[styles.labelCont, {backgroundColor: currentTheme.backgroundColor}]}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('mainTabs')}>
                        <Ionicons name='arrow-back' color="white" size={24} style={[styles.manageSVG, {color: currentTheme.textColor}]} />
                    </TouchableOpacity>
                    <Text style={[styles.themeLabel, {color: currentTheme.textColor}]}>Theme</Text>
                </View>


                <View style={[styles.modePicker, {backgroundColor: currentTheme.backgroundColor2}]}>
                    <TouchableOpacity
                        style={styles.radioBtn}
                        onPress={() => handleThemeChange('dark')}
                    >
                        <Ionicons
                            name={selectedTheme === 'dark' ? 'radio-button-on' : 'radio-button-off'}
                            size={24}
                            color={currentTheme.textColor}
                        />
                        <Text style={[styles.radioLabel, {color: currentTheme.textColor}]}>Dark Mode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioBtn}
                        onPress={() => handleThemeChange('light')}
                    >
                        <Ionicons
                            name={selectedTheme === 'light' ? 'radio-button-on' : 'radio-button-off'}
                            size={24}
                            color={currentTheme.textColor}
                        />
                        <Text style={[styles.radioLabel, {color: currentTheme.textColor}]}>Light Mode</Text>
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