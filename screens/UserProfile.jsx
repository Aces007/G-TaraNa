import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../AppContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UserProfile = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [userAge, setUserAge] = useState('');
    const { userId, fetchUserData } = useAppContext();

    useEffect(() => {
        console.log('userId in UserProfile:', userId);
        const getUserData = async () => {
            const userData = await fetchUserData(userId);
            setUserName(userData.name);
            setJoinDate(userData.created_at)
            setUserAge(userData.age)
        };

        getUserData();
    }, [userId]);

    return (
        <ScrollView contentContainerStyle={styles.mainCont}>
            <View style={styles.headerCont}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.logoImg}/>
                    <Text style={styles.logoTxt}>G! Tara Na!</Text>
                </View>
                <TouchableOpacity style={styles.searchBox}>
                    <FontAwesome5 name='search' size={16}/>
                    <Text style={styles.searchTxt}>Search a Chord</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.userProfileCont}>
                <View style={styles.userProfLeft}>
                    <Image source={require('../assets/erus.jpg')} style={styles.userProfPic}/>
                    <Text style={styles.userProfName}>{userName}</Text>
                </View>
                <View style={styles.userProfRight}>
                    <TouchableOpacity style={styles.userAgeCont}>
                        <Text style={styles.userAgeLab}>Age</Text>
                        <Text style={styles.userAge}>{userAge}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userJoinCont}>
                        <Text style={styles.userJoinLab}>Joined</Text>
                        <Text style={styles.userJoin}>{joinDate}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.userMenu}>
                <View style={styles.profileMenu}>
                    <Text style={styles.profileMenuLab}>Profile</Text>
                    <TouchableOpacity style={styles.manageUser}>
                        <View style={styles.manageUserLeft}>
                            <FontAwesome6 name='user' size={21} style={styles.manageSVG} />
                            <Text style={styles.manageUserTxt}>Manage User</Text>
                        </View>
                        <TouchableOpacity style={styles.manageUserBtn} onPress={() => navigation.navigate('ManageUser')}>
                            <FontAwesome name='caret-right' size={30} style={styles.rightBtn}/>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.manageUserProgress}>
                        <View style={styles.manageUserLeft}>
                            <AntDesign name='areachart' size={21} style={styles.manageSVG} />
                            <Text style={styles.manageUserTxt}>User Progress</Text>
                        </View>
                        <TouchableOpacity style={styles.manageUserBtn} onPress={() => navigation.navigate('UserProgress')}>
                            <FontAwesome name='caret-right' size={30} style={styles.rightBtn}/>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 13,
    },
    logoImg: {
        width: 43,
        height: 43,
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
        paddingHorizontal: 10,
        backgroundColor: '#A8F94F',
        width: 135,
        height: 30,
        borderRadius: 5,
        gap: 10,
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
        justifyContent: 'space-evenly',
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
        width: '100%',
        color: '#fff',
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: '800'
    },
    userProfRight: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
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