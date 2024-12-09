import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../ThemeContext';
import { Linking } from 'react-native';
import { useFonts } from 'expo-font';
import { safeAreaView } from 'react-native-safe-area-context';
import Ionicons from  'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreditsPage = ({ navigation }) => {
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
        'Montserrat-Thin': require('../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
        'RedHat-Bold': require('../assets/fonts/Red_Hat_Display/static/RedHatDisplay-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#A8F94F" />
            </View>
        );
    }

    return(
        <ScrollView contentContainerStyle={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>
            <View style={[styles.labelCont, {backgroundColor: currentTheme.backgroundColor}]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('mainTabs')}>
                    <Ionicons name='arrow-back' color="white" size={24} style={[styles.manageSVG, {color: currentTheme.textColor}]} />
                </TouchableOpacity>
            </View>

            <Text style={[styles.appTrademark, {color: currentTheme.textColor}]}>G! Tara Na!</Text>

            <View style={styles.quoteCont}>
                <Text style={[styles.mainTxt, {color: currentTheme.textColor}]}>Harmony Unleashed</Text>
                <Text style={[styles.subTxt, {color: currentTheme.textColor}]}>Your Ultimate Guide to Guitar Chords!</Text>
            </View>

            <View style={styles.contriCont}>
                <Text style={[styles.contriLabel, {color: currentTheme.textColor}]}>Contributors</Text>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.instagram.com/lawlensphotography/")
                }}>
                    <Image source={require('../assets/Contributors/Ace.jpg')} style={styles.contriJPG}/>
                    <Text style={[styles.contriTXT, {color: currentTheme.textColor}]}>Ace Clavano</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.instagram.com/airacaughton4k/")
                }}>
                    <Image source={require('../assets/Contributors/Aira.png')} style={styles.contriJPG}/>
                    <Text style={[styles.contriTXT, {color: currentTheme.textColor}]}>Aira Estur</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.instagram.com/cmllnieto_/")
                }}>
                    <Image source={require('../assets/Contributors/Cams.jpg')} style={styles.contriJPG}/>
                    <Text style={[styles.contriTXT, {color: currentTheme.textColor}]}>Camille Nieto</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.instagram.com/ec_pzzz/")
                }}>
                    <Image source={require('../assets/Contributors/Eros.jpg')} style={styles.contriJPG}/>
                    <Text style={[styles.contriTXT, {color: currentTheme.textColor}]}>Eros Ruffy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.frameworkCont}>
                <Text style={[styles.frameworkLabel, {color: currentTheme.textColor}]}>Frameworks and Languages</Text>
                <View style={styles.frame1}>
                    <Image source={require('../assets/react-native.png')} style={styles.frameworkJPG1}/>
                    <Image source={require('../assets/js.png')} style={styles.frameworkJPG1}/>
                </View>
                <View style={styles.frame2}>
                    <Image source={isDarkMode ? require('../assets/expo.png') : require('../assets/expo-2.png')} style={styles.frameworkJPG2}/>
                    <Image source={require('../assets/supabase.png')} style={styles.frameworkJPG2}/>
                </View>
            </View>

            <Text style={[styles.rightsReserve, {color: currentTheme.textColor}]}>@ 2024 G! Tara Na! by AACE. All Rights Reserved</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
        paddingTop: 40,
        paddingBottom: 50,
    },
    appTrademark: {
        marginTop: 30,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 45,
        fontFamily: 'Poppins-ExtraB'
    },

    rightsReserve: {
        textAlign: 'center',
        color: '#FFF',
        marginTop: 50,
        fontFamily: 'Montserrat-Thin',
        fontSize: 11,
    },
    
    //#region Quote Container
    quoteCont:{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    mainTxt: {
        color: '#FFF',
        fontSize: 23,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },  
    subTxt: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Montserrat-Med',
        opacity: 0.6,
        paddingHorizontal: 10,
    },  
    //#endregion Quote Container

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
    //#endregion Label Container

    //#region Contributors
    contriCont: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 40,
    },
    contriLabel: {
        color: '#FFF',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Montserrat-Med',
    },
    contriJPG: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 20,
    },
    contriTXT: {
        color: '#FFF',
        fontSize: 21,
        textAlign: 'center',
        fontFamily: 'Montserrat-Reg',
    },  
    //#endregion Contributors

    //#region Frameworks and Languages
    frameworkCont: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 40,
        gap: 30,
    },
    frameworkJPG1: {
        width: 90,
        height: 90,
    },
    frameworkJPG2: {
        width: 110,
        height: 110,
    },
    frameworkLabel: {
        color: '#FFF',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Montserrat-Med',
    },
    frame1: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
    },
    frame2: {
        display: 'flex',
        flexDirection: 'row',
        gap: 35,
    },
    //#endregion Frameworks and Languages
})

export default CreditsPage;