import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Ionicons from  'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const [fontsLoaded] = useFonts({
        'Poppins-ExtraB': require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
        'Montserrat-ExtraB': require('../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        'Montserrat-Med': require('../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
        'Montserrat-Reg': require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
        'RedHat-Bold': require('../assets/fonts/Red_Hat_Display/static/RedHatDisplay-Bold.ttf'),
    });


    return (
        <ScrollView contentContainerStyle={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>
            <View style={[styles.themePickers, {backgroundColor: currentTheme.backgroundColor}]}>
                <View style={[styles.labelCont, {backgroundColor: currentTheme.backgroundColor}]}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('mainTabs')}>
                        <Ionicons name='arrow-back' color="white" size={25} style={[styles.manageSVG, {color: currentTheme.textColor}]} />
                    </TouchableOpacity>
                </View>

                <Text style={[styles.themeLabel, {color: currentTheme.textColor}]}>Theme</Text>

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
    themePickLabel: {
        color: '#FFF',
        fontSize: 21,
        fontFamily: 'Montserrat-Bold',
    },
    themeLabel: {
        color: '#FFF',
        fontSize: 28,
        fontFamily: 'Montserrat-ExtraB',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
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
        gap: 10,
        paddingHorizontal: 35,
        paddingVertical: 20,
        marginLeft: 10,
    },
    radioLabel: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Montserrat-Med',
        textAlign: 'center',
    },
    //#endregion Color Mode Selections
})

export default ThemePicker;