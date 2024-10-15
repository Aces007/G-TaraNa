import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAppContext } from '../AppContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from  'react-native-vector-icons/Octicons';


const SettingsPage = ({ navigation }) => {
    const { logOut, userId, fetchUserData } = useAppContext();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [profilePic, setProfPic] = useState('');

    useEffect(() => {
        console.log('userId in UserProfile:', userId);
        const getUserData = async () => {
            const userData = await fetchUserData(userId);
            setUserName(userData.name);
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

    return (
        <ScrollView contentContainerStyle={styles.mainCont}>
            <View style={styles.headerCont}>
                <TouchableOpacity style={styles.settingLabel}>
                    <Ionicons name='settings-outline' color={'#FFF'} size={25}/>
                    <Text style={styles.settingsTxt}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutCont} onPress={handleLogout}>
                    <AntDesign name='logout' color={'#000'} size={16}/>
                    <Text style={styles.logoutTxt}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.userProfileCont}>
                <View style={styles.userProfLeft}>
                    <Image source={profilePic ? {uri: profilePic} : require('../assets/erus.jpg')} style={styles.userProfPic}/>
                </View>
                <View style={styles.userProfRight}>
                    <TouchableOpacity style={styles.userAgeCont}>
                        <Text style={styles.userProfName}>{userName}</Text>
                        <Text style={styles.userNumber}>{userEmail}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.userSettings}>
                <View style={styles.generalMenu}>
                    <Text style={styles.generalLabel}>General</Text>
                    <View style={styles.sectionContent}>
                        <TouchableOpacity style={styles.manageSection} onPress={() => navigation.navigate('ThemePicker')}>
                            <Octicons name='paintbrush' size={21} style={styles.manageSVG} />
                            <Text style={styles.btnTxt}>Theme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.manageSection} onPress={() => navigation.navigate('ThemePicker')}>
                            <Ionicons name='notifications-outline' size={21} style={styles.manageSVG} />
                            <Text style={styles.btnTxt}>Notifications</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.supportMenu}>
                    <Text style={styles.supportLabel}>Support</Text>
                    <View style={styles.sectionContent}>
                        <TouchableOpacity style={styles.manageSection} onPress={() => navigation.navigate('CreditsPage')}>
                            <FontAwesome name='trademark' size={21} style={styles.manageSVG} />
                            <Text style={styles.btnTxt}>Credits</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.manageSection}>
                            <Entypo name='documents' size={21} style={styles.manageSVG} />
                            <Text style={styles.btnTxt}>FAQs</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingTop: 50,
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
    settingLabel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 13,
    },
    settingsTxt: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: '800',
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
    },
    logoutTxt: {
        color: '#000',
        fontSize: 14,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    //#endregion Header

    //#region User
    userProfileCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 10,
        paddingHorizontal: 5,
        backgroundColor: '#1A2433',
        paddingVertical: 20,
        borderRadius: 10,
    },  
    userProfLeft: {
        display: 'flex',
        alignItems: 'flex-start',
    },  
    userProfPic: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 60,
        width: 90,
        height: 90,
    },
    userProfRight: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        marginTop: 15,
    },
    userProfName: {
        color: '#fff',
        fontSize: 22,
        textTransform: 'uppercase',
        fontWeight: '800'
    },
    userNumber: {
        color: '#fff',
        fontSize: 15,
    },
    //#endregion User

    //#region User Profile and Preferences Menu Section
    userSettings: {
        padding: 20,
        marginVertical: 30,
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
        fontWeight: '800',
        fontSize: 25,
    },
    sectionContent: {
        paddingHorizontal: 15,
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
    btnTxt: {
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