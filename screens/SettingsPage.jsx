import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useAppContext } from '../AppContext';
import { useTheme } from '../ThemeContext';
import { useFonts } from 'expo-font';
import { safeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from  'react-native-vector-icons/Octicons';
import Feather from  'react-native-vector-icons/Feather';


const SettingsPage = ({ navigation }) => {
    const { logOut, userId, fetchUserData } = useAppContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [profilePic, setProfPic] = useState('');
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

    
    useEffect(() => {
        console.log('userId in UserProfile:', userId);
        const getUserData = async () => {
            const userData = await fetchUserData(userId);
            setFirstName(userData.first_name);
            setLastName(userData.last_name);
            setUserEmail(userData.email)
            setProfPic(userData.profile_picture)
        };
        
        getUserData();
    }, [userId]);

    const handleLogout = () => {
        Alert.alert(
          "Log Out", 
          "Are you sure you want to log out?", 
            [
                {
                text: "Cancel",
                style: "cancel"
                },
                {
                text: "Log Out",
                onPress: async () => {
                    await logOut(),
                navigation.navigate("userAccountScreen")
                    }
                }
            ]
        );
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
            <View style={[styles.headerCont, {color: currentTheme.textColor}]}>
                <TouchableOpacity style={styles.settingLabel}>
                    <Feather name='settings' color={'#FFF'} size={35} style={{color: currentTheme.textColor}}/>
                    <Text style={[styles.settingsTxt, {color: currentTheme.textColor}]}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.logoutCont, {backgroundColor: currentTheme.buttonColor}]} onPress={handleLogout}>
                    <AntDesign name='logout' color={'#000'} size={16}/>
                    <Text style={styles.logoutTxt}>Logout</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.userSettings}>
                <View style={styles.generalMenu}>
                    <Text style={[styles.generalLabel, {color: currentTheme.textColor}]}>General</Text>

                    <View style={styles.sectionContent}>
                        <TouchableOpacity style={styles.manageSection} onPress={() => navigation.navigate('ThemePicker')}>
                            <Octicons name='paintbrush' size={21} style={[styles.manageSVG, {backgroundColor: currentTheme.backgroundColor3}]} />
                            <Text style={[styles.btnTxt, {color: currentTheme.textColor}]}>Theme</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.manageSection} onPress={() => navigation.navigate('NotificationsPanel')}>
                            <Ionicons name='notifications-outline' size={21} style={[styles.manageSVG, {backgroundColor: currentTheme.backgroundColor3}]} />
                            <Text style={[styles.btnTxt, {color: currentTheme.textColor}]}>Notifications</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.supportMenu}>
                    <Text style={[styles.supportLabel, {color: currentTheme.textColor}]}>Support</Text>

                    <View style={styles.sectionContent}>
                        <TouchableOpacity style={styles.manageSection} onPress={() => navigation.navigate('CreditsPage')}>
                            <FontAwesome name='trademark' size={21} style={[styles.manageSVG, {backgroundColor: currentTheme.backgroundColor3}]} />
                            <Text style={[styles.btnTxt, {color: currentTheme.textColor}]}>Credits</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.manageSection}>
                            <Entypo name='documents' size={21} style={[styles.manageSVG, {backgroundColor: currentTheme.backgroundColor3}]} />
                            <Text style={[styles.btnTxt, {color: currentTheme.textColor}]}>FAQs</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
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
        paddingTop: 50,
    },

    //#region Header
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 8,
    },  
    settingLabel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    settingsTxt: {
        color: '#FFF',
        fontSize: 21,
        fontFamily: 'Poppins-ExtraB',
    },
    logoutCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#A8F94F',
        width: 95,
        height: 30,
        borderRadius: 5,
        gap: 10,
        marginRight: 5,
    },
    logoutTxt: {
        color: '#000',
        fontSize: 12,
        textTransform: 'uppercase',
        fontFamily: 'RedHat-Bold',
    },
    //#endregion Header

    //#region User Profile and Preferences Menu Section
    userSettings: {
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 5,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },

    //#region General Menu
    generalMenu: {
        marginBottom: 20,
        gap: 10,
    },
    generalLabel: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'Montserrat-ExtraB',
    },
    sectionContent: {
        marginHorizontal: 15,
        marginTop: 5,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 15,
    },
    manageSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
    },
    manageSVG: {
        padding: 7.5,
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 60,
        textAlign: 'center'
    },
    btnTxt: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'RedHat-Bold',
    },
    //#endregion General Menu
    
    //#region Support Menu
    supportMenu: {
        marginBottom: 20,
        gap: 10,
    },
    supportLabel: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 25,
    },
    //#endregion Support Menu
    
    //#endregion User Profile and Preferences Menu Section

})

export default SettingsPage;