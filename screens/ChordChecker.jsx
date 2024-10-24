import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconDark from '../assets/icon4-1.png';
import IconLight from '../assets/icon4-2.png';


const ChordChecker = () => {
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
            <View style={[styles.headerCont, {backgroundColor: currentTheme.backgroundColor}]}>
                <View style={[styles.logoContainer, {backgroundColor: currentTheme.backgroundColor}]}>
                    <Image source={isDarkMode ? IconDark : IconLight} style={styles.logoImg}/>
                    <Text style={[styles.logoTxt, {color: currentTheme.textColor}]}>G! Tara Na!</Text>
                </View>
                <TouchableOpacity style={[styles.searchBox, {backgroundColor: currentTheme.buttonColor}]}>
                    <FontAwesome5 name='search' size={16}/>
                    <Text style={[styles.searchTxt, {color: currentTheme.searchColor}]}>Search Chords</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.mainContent}>
                <Text style={[styles.mainTxt, {color: currentTheme.textColor}]}>Harmony Unleashed: Your Ultimate Guide to Guitar Chords!</Text>
                <Image source={require('../assets/homeImg.png')} style={styles.mainImg}/>
            </View>

            <View style={styles.charBoxes}>
                <TouchableOpacity style={[styles.charBox1, {backgroundColor: currentTheme.backgroundColor4}]}>
                    <FontAwesome5 name='hands-helping' color={currentTheme.textColor} size={25}/>
                    <Text style={[styles.charTxt1, {color: currentTheme.textColor}]}>Easy To Use</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={[styles.charBox2, {backgroundColor: currentTheme.backgroundColor4}]}>                    
                    <FontAwesome6 name='ear-listen' color={currentTheme.textColor} size={25}/>
                    <Text style={[styles.charTxt2, {color: currentTheme.textColor}]}>Ear Trainer</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={[styles.charBox3, {backgroundColor: currentTheme.backgroundColor4}]}>                    
                    <Ionicons name='musical-note' color={currentTheme.textColor} size={25}/>
                    <Text style={[styles.charTxt3, {color: currentTheme.textColor}]}>Harmonic Bliss</Text>    
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create ({
    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 40,
    },
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logoImg: {
        width: 50,
        height: 50,
        margin: 0,
    },
    logoTxt: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800',
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: '#A8F94F',
        width: 125,
        height: 30,
        borderRadius: 5,
        gap: 10,
        marginRight: 10,
    },
    searchTxt: {
        fontSize: 13,
        fontWeight: '800'
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        padding: 10,
        marginVertical: 25,
    },
    mainTxt: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        width: '75%',
        fontWeight: '700',
    },  
    mainImg: {
        width: 300,
        height: 280,
    },

    /*region charBoxes */
    charBoxes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 5,
    },
    charBox1: {
        backgroundColor: '#26393E',
        width: 100,
        height: 130,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }, charTxt1: {
        color: '#FFF',
        fontWeight: '700',
    },
    charBox2: {
        backgroundColor: '#26393E',
        width: 100,
        height: 130,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }, charTxt2: {
        color: '#FFF',
        fontWeight: '700',
    },
    charBox3: {
        backgroundColor: '#26393E',
        width: 100,
        height: 130,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }, charTxt3: {
        color: '#FFF',
        fontWeight: '700',
    },
    /*endregion charBoxes */
})

export default ChordChecker;