import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, TextInput, Image, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useAppContext } from '../AppContext';
import { useTheme } from '../ThemeContext';
import { useFonts } from 'expo-font';
import { safeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ManageUser = ({ navigation }) => {
    const { userId, fetchUserData, updateUserDetails, logOut, uploadProfilePicture  } = useAppContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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


    useEffect(() => {
        console.log('userId in UserProfile:', userId);
        const getUserData = async () => {
            const userData = await fetchUserData(userId);
            setEmail(userData.email)
            setUserName(userData.username);
            setFirstName(userData.first_name);
            setLastName(userData.last_name);
            setAge(userData.age);
            setJoinDate(userData.created_at)
            setProfPic(userData.profile_picture)
        };

        getUserData();
    }, [userId]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleUpdate = async () => {
        console.log("Update Btn pressed.")

        const initialData = {
            email: email.trim(),
            username: username.trim(),
            name: name.trim(),
            age: age ? age : null,
        };

        const updatedData = Object.fromEntries(
            Object.entries(initialData).filter(([_, v]) => v != null && v !== '')
        );

        if (Object.keys(updatedData).length === 0 && !password.trim()) {
            Alert.alert('Nothing to update');
            return;
        }

        try {
            // Log the current input for debugging
            console.log('Current Input:', updatedData);
    
            // If user details are present, update them
            if (Object.keys(updatedData).length > 0) {
                const result = await updateUserDetails(userId, updatedData);
                Alert.alert('Success, user details updated!');
            } else {
                Alert.alert('Error, user details failed to update.');
                console.log('Update result:', result);
            }
    
            // If the password is provided, update it
            if (password.trim()) {
                await updatePassword(password);
            }
        } catch (error) {
            console.error('Error updating user details or password:', error.message);
        }
    };

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

    const selectProfilePicture = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;
                const imageUrl = await uploadProfilePicture(userId, imageUri);
                setProfPic(imageUrl);
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    };

    return (
        <ScrollView style={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>
            <View style={[styles.headerCont, {backgroundColor: currentTheme.backgroundColor}]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('User')}>
                    <Ionicons name='arrow-back' color="white" size={25} style={[styles.manageSVG, {color: currentTheme.textColor}]} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.logoutCont, {backgroundColor: currentTheme.buttonColor}]} onPress={handleLogout}>
                    <AntDesign name='logout' color={'#000'} size={16}/>
                    <Text style={[styles.logoutTxt, {color: currentTheme.searchColor}]}>Logout</Text>
                </TouchableOpacity>
            </View>


            <Text style={[styles.manageUserLabel, {color: currentTheme.textColor}]}>Manage User</Text>

            <View style={[styles.infoCont, {backgroundColor: currentTheme.backgroundColor2}]}>
                <Text style={[styles.basicInfoLabel, {color: currentTheme.textColor}]}>User Basic Information</Text>

                <View style={styles.infoContainer}>
                    <View style={styles.profilePic}>
                        <Image source={profilePic ? { uri: profilePic } : require('../assets/erus.jpg')} style={styles.userProfPic}/>

                        <TouchableOpacity onPress={selectProfilePicture} style={[styles.uploadBtnCont, {backgroundColor: currentTheme.buttonColor}]}> 
                            <AntDesign name='clouduploado' color={'#000'} size={16} />
                            <Text style={[styles.uploadBtn, {color: currentTheme.searchColor}]}>Upload</Text>
                        </TouchableOpacity>

                        <View style={styles.joinDateCont}>
                            <Text style={[styles.userJoin, {color: currentTheme.textColor}]}>{joinDate}</Text>
                            <Text style={[styles.userJoinLab, {color: currentTheme.textColor}]}>Join Date</Text>
                        </View>
                    </View>

                    <View style={styles.basicInfo}>
                        <>
                            <TextInput placeholder='Name' placeholderTextColor={'#FFF'} value={firstName} onChangeText={setFirstName} style={[styles.infoInput, {color: currentTheme.textColor, borderColor: currentTheme.borderColor}]}/>
                            <Text style={[styles.infoLabel, {color: currentTheme.textColor}]}>First Name</Text>
                        </>
                        <>
                            <TextInput placeholder='Name' placeholderTextColor={'#FFF'} value={lastName} onChangeText={setLastName} style={[styles.infoInput, {color: currentTheme.textColor, borderColor: currentTheme.borderColor}]}/>
                            <Text style={[styles.infoLabel, {color: currentTheme.textColor}]}>Surname</Text>
                        </>
                        <>
                            <TextInput placeholder='Age' placeholderTextColor={'#FFF'} value={age} onChangeText={setAge} style={[styles.infoInput, {color: currentTheme.textColor, borderColor: currentTheme.borderColor}]}/>
                            <Text style={[styles.infoLabel, {color: currentTheme.textColor}]}>Age</Text>
                        </>
                    </View>
                </View>
                
                <View style={styles.userNameCont}>
                    <TextInput placeholder='UserName' placeholderTextColor={'#FFF'} value={username} onChangeText={setUserName} style={[styles.infoInputLong, {color: currentTheme.textColor, borderColor: currentTheme.borderColor}]}/>
                    <Text style={[styles.infoLabel, {color: currentTheme.textColor}]}>Username</Text>
                </View>

                <View style={styles.emailPassword}>
                    <Text style={[styles.emailPassLabel, {color: currentTheme.textColor}]}>Email & Password</Text>
                    <>
                        <TextInput placeholder='Email' placeholderTextColor={'#FFF'} value={email} onChangeText={setEmail} style={[styles.emailInput, {color: currentTheme.textColor, borderColor: currentTheme.borderColor}]}/>
                        <Text style={[styles.infoLabel, {color: currentTheme.textColor}]}>Email</Text>
                    </>
                    <View style={styles.passwordInputCont}>
                        <View style={styles.passwordCont}>
                            <TextInput placeholder='Password' placeholderTextColor={currentTheme.textColor} value={password} onChangeText={setPassword} style={[styles.passwordInput, {color: currentTheme.textColor, borderColor: currentTheme.borderColor}]} secureTextEntry={!isPasswordVisible} />
                            <Text style={[styles.infoLabel, {color: currentTheme.textColor}]}>Password</Text>
                        </View>

                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityBtn}>
                            <MaterialIcons
                                name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                                size={20}
                                color={currentTheme.textColor}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={handleUpdate} style={[styles.updateBtn, {backgroundColor: currentTheme.buttonColor}]}
                >
                    <Text style={styles.updateBtnTxt}>Update</Text>
                </TouchableOpacity>
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

    //#region Main Preferences
    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingVertical: 45,
    },
    manageSVG: {
        padding: 7.5,
        width: 40,
        height: 40,
        textAlign: 'center'
    },
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30,
        marginBottom: 5,
    },
    manageUserLabel: {
        color: '#FFF',
        fontSize: 28,
        fontFamily: 'Montserrat-ExtraB',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
    },
    infoCont: {
        backgroundColor: '#1A2433',
        display: 'flex',
        gap: 20,
        justifyContent: 'space-evenly',
        paddingHorizontal: 25,
        paddingVertical: 30,
        marginBottom: 90,
        borderRadius: 10,
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    //#endregion Main Preferences

    //#region Logout
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
    //#endregion Logout

    //#region Profile Pic Container && Basic Information 
    profilePic: {
        display: 'flex',
        gap: 15,
    },
    basicInfo: {
        display: 'flex',
        gap: 10,
        justifyContent: 'flex-end',
    },
    basicInfoLabel: {
        color: '#FFF',
        fontSize: 21,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
    },
    userProfPic: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 60,
        width: 110,
        height: 110,
    },
    uploadBtnCont: {
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
    uploadBtn: {
        color: '#000',
        fontSize: 12,
        textTransform: 'uppercase',
        fontFamily: 'RedHat-Bold',
    },
    joinDateCont: {
        gap: 5,
    },
    userJoinLab: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
    },
    userJoin: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Montserrat-Med',
        opacity: 0.8,
    },
    infoInput: {
        borderWidth: 1.5,
        borderColor: '#FFF',
        padding: 3,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: 140,
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Montserrat-Med',
        opacity: 0.8,
    },
    userNameCont: {
        display: 'flex',
        gap: 10,
    },
    infoInputLong: {
        borderWidth: 1.5,
        borderColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Montserrat-Med',
        opacity: 0.8,
        borderRadius: 5,
    },
    infoLabel: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 3,
    },
    //#endregion Basic Information

    //#region Email & Password 
    emailPassword: {
        display: 'flex',
        gap: 15,
    },
    emailPassLabel: {
        color: '#FFF',
        fontSize: 21,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
    },
    emailInput: {
        borderWidth: 1.5,
        borderColor: '#FFF',
        padding: 3,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Montserrat-Med',
        opacity: 0.8,
    },
    passwordCont: {
        display: 'flex',
        gap: 15,
    },
    passwordInput: {
        borderWidth: 1.5,
        borderColor: '#FFF',
        padding: 3,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Montserrat-Med',
        opacity: 0.8,
        width: 270,
    },
    passwordInputCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    visibilityBtn: {
        position: 'relative',
        left: -30,
        top: -20,
        opacity: 0.8,
    },
    //#endregion Email & Password 

    updateBtn: {
        backgroundColor: '#A8F94F', 
        padding: 8,
        borderRadius: 5,
    },
    updateBtnTxt: {
        color: '#000',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    },
})

export default ManageUser;

