import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../AppContext';
import { useTheme } from '../ThemeContext';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconDark from '../assets/icon4-1.png';
import IconLight from '../assets/icon4-2.png';



const UserProfile = ({ navigation }) => {
    // App Contexts
    const { userId, fetchUserData } = useAppContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [userAge, setUserAge] = useState('');
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
            setJoinDate(userData.created_at)
            setUserAge(userData.age)
            setProfPic(userData.profile_picture)
        };

        getUserData();
    }, [userId]);


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
            <View style={[styles.headerCont, {backgroundColor: currentTheme.backgroundColor}]}>
                <View style={[styles.logoContainer, {backgroundColor: currentTheme.backgroundColor}]}>
                    <Image source={isDarkMode ? IconDark : IconLight} style={styles.logoImg}/>
                    <Text style={[styles.logoTxt, {color: currentTheme.textColor}]}>G! Tara Na!</Text>
                </View>
            </View>

            <View style={[styles.userProfileCont, {backgroundColor: currentTheme.backgroundColor2}]}>
                <View style={styles.userProfLeft}>
                    <Image source={profilePic ? {uri: profilePic} : require('../assets/erus.jpg')} style={styles.userProfPic}/>
                    <View style={styles.nameContainer}>
                        <Text style={[styles.userFirstName, {color: currentTheme.textColor}]}>
                            {firstName}
                        </Text>
                        <Text style={[styles.userLastName, {color: currentTheme.textColor}]}>
                            {lastName}
                        </Text>
                    </View>
                </View>

                <View style={styles.userProfRight}>
                    <TouchableOpacity style={styles.userAgeCont}>
                        <Text style={[styles.userAgeLab, {color: currentTheme.textColor}]}>Age</Text>
                        <Text style={[styles.userAge, {color: currentTheme.textColor}]}>{userAge}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userJoinCont}>
                        <Text style={[styles.userJoinLab, {color: currentTheme.textColor}]}>Joined</Text>
                        <Text style={[styles.userJoin, {color: currentTheme.textColor}]}>{joinDate}</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.profileMenu}>
                <Text style={[styles.profileMenuLab, {color: currentTheme.textColor}]}>Profile</Text>

                <TouchableOpacity style={styles.manageUserLeft} onPress={() => navigation.navigate('ManageUser')}>
                    <FontAwesome6 name='user' size={21} style={[styles.manageSVG, {backgroundColor: currentTheme.backgroundColor3}]} />
                    <Text style={[styles.manageUserTxt, {color: currentTheme.textColor}]}>Manage User</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.manageUserLeft} onPress={() => navigation.navigate('UserProgress')}>
                    <AntDesign name='areachart' size={21} style={[styles.manageSVG, {backgroundColor: currentTheme.backgroundColor3}]} />
                    <Text style={[styles.manageUserTxt, {color: currentTheme.textColor}]}>User Progress</Text>
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

    //#region Header
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30,
        marginBottom: 30,
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
    //#endregion Header

    //#region User Profile Section: 
    userProfileCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#1A2433',
        paddingVertical: 20,
        borderRadius: 10,
    },  

    // User Left
    userProfLeft: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 15,
        paddingHorizontal: 20,
    },  
    userProfPic: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 60,
        width: 120,
        height: 120,
    },
    nameContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    userFirstName: {
        color: '#fff',
        fontSize: 24,
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-Bold',
    },
    userLastName: {
        color: '#fff',
        opacity: 0.8,
        fontSize: 24,
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-Reg',
    },

    // User Right
    userProfRight: {
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
        paddingHorizontal: 20,
    },
    userAgeCont: {
        gap: 5,
    },
    userAgeLab: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
    },
    userAge: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Montserrat-Med',
        opacity: 0.8,
    },
    userJoinCont: {
        gap: 5,
    },
    userJoinLab: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
    },
    userJoin: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Montserrat-Med',
        opacity: 0.8,
    },
    //#endregion  User Profile Section

    //#region Profile Menu
    profileMenu: {
        marginVertical: 25,
        gap: 20,
        padding: 20,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    profileMenuLab: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'Montserrat-ExtraB',
    },
    manageUserLeft: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        marginHorizontal: 15,
    },
    manageSVG: {
        padding: 7.5,
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 60,
        textAlign: 'center'
    },
    manageUserTxt: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'RedHat-Bold',
    },
        //#endregion Profile Menu
})

export default UserProfile;