import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Switch } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useFonts } from 'expo-font';
import { safeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconDark from '../assets/icon4-1.png';
import IconLight from '../assets/icon4-2.png';


const NotificationsSet = ({ navigation }) => {
    const { isDarkMode, toggleTheme, currentTheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(isDarkMode ? 'dark' : 'light');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


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

    return (
        <ScrollView contentContainerStyle={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>
            <View style={[styles.labelCont, {backgroundColor: currentTheme.backgroundColor}]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('mainTabs')}>
                    <Ionicons name='arrow-back' color="white" size={24} style={[styles.manageSVG, {color: currentTheme.textColor}]} />
                </TouchableOpacity>
            </View>

            <Text style={[styles.themeLabel, {color: currentTheme.textColor}]}>Notifications</Text>


            <View style={[styles.modePicker, {backgroundColor: currentTheme.backgroundColor2}]}>
                <Text style={[styles.notifsTxt, {color: currentTheme.textColor}]}>Allow Notifications</Text>
                <Switch 
                    trackColor={{false: '#767577', true: currentTheme.buttonColor}}
                    thumbColor={isEnabled ?  currentTheme.textColor :  currentTheme.textColor}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    mainCont: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 40,
    },

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
        fontSize: 28,
        fontFamily: 'Montserrat-ExtraB',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
    },

    notifsTxt: {
        fontSize: 18,
        fontFamily: 'Montserrat-Med',
        textAlign: 'center',
    },

    modePicker: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
    },
})

export default NotificationsSet;