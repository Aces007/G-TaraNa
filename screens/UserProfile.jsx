import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../AppContext';
import { useTheme } from '../ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconDark from '../assets/icon4-1.png';
import IconLight from '../assets/icon4-2.png';

const UserProfile = ({ navigation }) => {
    // App Contexts
    const { userId, fetchUserData } = useAppContext();
    const [userName, setUserName] = useState('');
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
            setUserName(userData.name);
            setJoinDate(userData.created_at)
            setUserAge(userData.age)
            setProfPic(userData.profile_picture)
        };

        getUserData();
    }, [userId]);

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
                    <Text style={[styles.userProfName, {color: currentTheme.textColor}]}>{userName}</Text>
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

            <View style={styles.userMenu}>
                <View style={styles.profileMenu}>
                    <Text style={[styles.profileMenuLab, {color: currentTheme.textColor}]}>Profile</Text>
                    <TouchableOpacity style={styles.manageUser}>
                        <View style={styles.manageUserLeft}>
                            <FontAwesome6 name='user' size={21} style={[styles.manageSVG, {backgroundColor: currentTheme.backgroundColor3}]} />
                            <Text style={[styles.manageUserTxt, {color: currentTheme.textColor}]}>Manage User</Text>
                        </View>
                        <TouchableOpacity style={styles.manageUserBtn} onPress={() => navigation.navigate('ManageUser')}>
                            <FontAwesome name='caret-right' size={30} style={[styles.rightBtn, {backgroundColor: currentTheme.backgroundColor3}]}/>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.manageUserProgress}>
                        <View style={styles.manageUserLeft}>
                            <AntDesign name='areachart' size={21} style={[styles.manageSVG, {backgroundColor: currentTheme.backgroundColor3}]} />
                            <Text style={[styles.manageUserTxt, {color: currentTheme.textColor}]}>User Progress</Text>
                        </View>
                        <TouchableOpacity style={styles.manageUserBtn} onPress={() => navigation.navigate('UserProgress')}>
                            <FontAwesome name='caret-right' size={30} style={[styles.rightBtn, {backgroundColor: currentTheme.backgroundColor3}]}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
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
        marginBottom: 50,
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
    //#endregion Header

    //#region User Profile Section: 
    userProfileCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 5,
        backgroundColor: '#1A2433',
        paddingVertical: 20,
        borderRadius: 10,
    },  
    userProfLeft: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 15,
    },  
    userProfPic: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 60,
        width: 120,
        height: 120,
    },
    userProfName: {
        width: '95%',
        color: '#fff',
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: '800'
    },
    userProfRight: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 40,
        marginTop: 15,
    },
    userAgeCont: {
        gap: 5,
    },
    userAgeLab: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800'
    },
    userAge: {
        color: '#fff',
        fontSize: 17,
    },
    userJoinCont: {
        gap: 5,
    },
    userJoinLab: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800'
    },
    userJoin: {
        color: '#fff',
        fontSize: 17,
    },
    //#endregion  User Profile Section

    //#region User Profile and Preferences Menu Section
    userMenu: {
        padding: 20,
        marginVertical: 30,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },

        //#region Profile Menu
    profileMenu: {
        marginBottom: 20,
        gap: 20,
    },
    profileMenuLab: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 25,
    },
    manageUser: {
        paddingHorizontal: 15,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 75,
        alignItems: 'center'
    },
    manageUserProgress: {
        paddingHorizontal: 15,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 68,
        alignItems: 'center'
    },
    manageUserLeft: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
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
        fontWeight: '700',
        fontSize: 18,
    },
    rightBtn: {
        paddingVertical: 2,
        textAlign: 'center',
        width: 35,
        height: 35,
        backgroundColor: '#fff',
        borderRadius: 60,
    },
        //#endregion Profile Menu

    //#endregion User Profile and Preferences Menu Section


})

export default UserProfile;