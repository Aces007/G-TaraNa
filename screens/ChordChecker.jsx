import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useFonts } from 'expo-font';
import { safeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
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

    const [fontsLoaded] = useFonts({
        'Poppins-ExtraB': require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
        'Montserrat-ExtraB': require('../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        'Montserrat-Med': require('../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
        'Montserrat-Reg': require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
        'RedHat-Bold': require('../assets/fonts/Red_Hat_Display/static/RedHatDisplay-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#A8F94F" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>
            <View style={[styles.headerCont, {backgroundColor: currentTheme.backgroundColor}]}>
                <View style={[styles.logoContainer, {backgroundColor: currentTheme.backgroundColor}]}>
                    <Image source={isDarkMode ? IconDark : IconLight} style={styles.logoImg}/>
                    <Text style={[styles.logoTxt, {color: currentTheme.textColor}]}>G! Tara Na!</Text>
                </View>
                
                <TouchableOpacity style={styles.searchBtn}>
                    <Feather name='search' size={25} color={currentTheme.buttonColor}/>
                </TouchableOpacity>
            </View>

            <View style={styles.mainContent}>
                <View style={styles.quoteCont}>
                    <Text style={[styles.mainTxt, {color: currentTheme.textColor}]}>Harmony Unleashed</Text>
                    <Text style={[styles.subTxt, {color: currentTheme.textColor}]}>Your Ultimate Guide to Guitar Chords!</Text>
                </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0f1b',
    },

    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 45,
    },

    //#region Header
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
        gap: 5,
    },
    logoImg: {
        width: 58,
        height: 58,
        margin: 0,
    },
    logoTxt: {
        color: '#FFF',
        fontSize: 21,
        fontFamily: 'Poppins-ExtraB',
    },
    searchBtn: {
        marginHorizontal: 15,
        marginBottom: 5,
    },
    //#endregion Header

    //#region Main
    mainContent: {
        display: 'flex',
        alignItems: 'center',
        gap: 50,
        marginVertical: 25,
    },
    quoteCont: {
        display: 'flex',
        alignItems: 'center',
    },
    mainTxt: {
        color: '#FFF',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },  
    subTxt: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Montserrat-Med',
        opacity: 0.6,
        paddingHorizontal: 10,
    },  
    mainImg: {
        width: 300,
        height: 275,
    },
    //#endregion Main

    //#region charBoxes 
    charBoxes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 25,
    },
    charBox1: {
        backgroundColor: '#1A2433',
        width: 100,
        height: 130,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    }, charTxt1: {
        color: '#FFF',
        fontSize: 11,
        fontFamily: 'Montserrat-Bold',
    },
    charBox2: {
        backgroundColor: '#1A2433',
        width: 100,
        height: 130,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    }, charTxt2: {
        color: '#FFF',
        fontSize: 11,
        fontFamily: 'Montserrat-Bold',
    },
    charBox3: {
        backgroundColor: '#1A2433',
        width: 100,
        height: 130,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    }, charTxt3: {
        color: '#FFF',
        fontSize: 11,
        fontFamily: 'Montserrat-Bold',
    },
    //#endregion charBoxes 
})

export default ChordChecker;