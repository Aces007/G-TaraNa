import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TouchableHighlight, Text, TextInput, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useAppContext } from "../AppContext";
import { useFonts } from 'expo-font';import { useTheme } from '../ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';



const JoinClass = ({ navigation }) => {
    const [classCode, setClassCode] = useState('');
    const {joinClass, userId} = useAppContext();
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


    const handleJoiningClass = async () => {
        try {
            const joinClasses = await joinClass(classCode ,userId);
            alert('Successfully Joined Class')
            navigation.navigate('mainTabs')
        } catch (error) {
            alert('Failed to Join Class: ' + error.message)
        }
    }


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
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('User')}>
                <Ionicons name='arrow-back' color="white" size={25} style={[styles.manageSVG, {color: currentTheme.textColor}]} />
            </TouchableOpacity>
            

            <Text style={[styles.joinClassTitle, {color: currentTheme.textColor}]}>Join a Class</Text>

            <View style={styles.inputFields}>
                <TextInput placeholder="Enter Class Code" value={classCode} onChangeText={setClassCode} placeholderTextColor={currentTheme.textColor} style={[styles.classInput, {color: currentTheme.textColor, borderColor: currentTheme.borderColor}]} />
                <TouchableOpacity style={[{color: currentTheme.textColor, backgroundColor: currentTheme.buttonColor}]} onPress={handleJoiningClass}>
                    <Text style={styles.createClassBtn}>Join Class</Text>
                </TouchableOpacity>
            </View >
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
    joinClassTitle: {
        color: '#FFF',
        fontSize: 28,
        fontFamily: 'Montserrat-ExtraB',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
    },
    inputFields: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 50,
        marginTop: 30,
    },
    classInput: {
        paddingVertical: 30,
        paddingHorizontal: 15,
        width: '100%',
        borderWidth: 1.5,
        borderRadius: 5,
    },
    classInputDesc: {
        height: '50%',
        width: '100%',
        paddingHorizontal: 15,
        borderWidth: 1.5,
        borderRadius: 5,
    },
    createClassBtn: {
        color: '#000',
        fontSize: 12,
        textTransform: 'uppercase',
        fontFamily: 'RedHat-Bold',
        padding: 10,
        borderRadius: 5,
    },
})
export default JoinClass;