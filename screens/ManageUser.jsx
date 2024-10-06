import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, TextInput, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAppContext } from '../AppContext';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ManageUser = ({ navigation }) => {
    const { userId, fetchUserData, updateUserDetails, logOut } = useAppContext();
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [profilePic, setProfPic] = useState('');

    

    useEffect(() => {
        console.log('userId in UserProfile:', userId);
        const getUserData = async () => {
            const userData = await fetchUserData(userId);
            setEmail(userData.email)
            setUserName(userData.username);
            setName(userData.name);
            setAge(userData.age);
            setJoinDate(userData.created_at)
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

    const selectProfilePicture = () => {
        const options = {
            mediaType: 'photo',
        };
    
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const imageUri = response.assets[0].uri;
                const imageUrl = await uploadProfilePicture(userId, imageUri);
                setProfPic(imageUrl);  
            }
        });
    };

    return (
        <ScrollView style={styles.mainCont}>
            <View style={styles.headerCont}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('User')}>
                    <Ionicons name='arrow-back' color="white" size={21} style={styles.manageSVG} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutCont} onPress={handleLogout}>
                    <AntDesign name='logout' color={'#000'} size={16}/>
                    <Text style={styles.logoutTxt}>Logout</Text>
                </TouchableOpacity>
            </View>


            <Text style={styles.manageUserLabel}>Manage User</Text>

            <View style={styles.infoCont}>
                <Text style={styles.basicInfoLabel}>User Basic Information</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.profilePic}>
                        <TouchableOpacity onPress={selectProfilePicture}> 
                            <Image source={profilePic ? { uri: profilePic } : require('../assets/erus.jpg')} style={styles.userProfPic}/>
                        </TouchableOpacity>
                        <View style={styles.joinDateCont}>
                            <Text style={styles.userJoin}>{joinDate}</Text>
                            <Text style={styles.userJoinLab}>Join Date</Text>
                        </View>
                    </View>

                    <View style={styles.basicInfo}>
                        <>
                            <TextInput placeholder='Name' placeholderTextColor={'#FFF'} value={name} onChangeText={setName} style={styles.infoInput}/>
                            <Text style={styles.infoLabel}>Name</Text>
                        </>
                        <>
                            <TextInput placeholder='UserName' placeholderTextColor={'#FFF'} value={username} onChangeText={setUserName} style={styles.infoInput}/>
                            <Text style={styles.infoLabel}>Username</Text>
                        </>
                        <>
                            <TextInput placeholder='Age' placeholderTextColor={'#FFF'} value={age} onChangeText={setAge} style={styles.infoInput}/>
                            <Text style={styles.infoLabel}>Age</Text>
                        </>
                    </View>
                </View>

                <View style={styles.emailPassword}>
                    <Text style={styles.emailPassLabel}>Email & Password</Text>
                    <>
                        <TextInput placeholder='Email' placeholderTextColor={'#FFF'} value={email} onChangeText={setEmail} style={styles.emailInput}/>
                        <Text style={styles.infoLabel}>Email</Text>
                    </>
                    <View style={styles.passwordInputCont}>
                        <View style={styles.passwordCont}>
                            <TextInput placeholder='Password' placeholderTextColor={'#FFF'} value={password} onChangeText={setPassword} style={styles.passwordInput} secureTextEntry={!isPasswordVisible} />
                            <Text style={styles.infoLabel}>Password</Text>
                        </View>
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityBtn}>
                            <MaterialIcons
                                name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                                size={20}
                                color='#FFF'
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn}
                >
                    <Text style={styles.updateBtnTxt}>Update</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    //#region Main Preferences
    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 45,
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
        fontSize: 25,
        fontWeight: '800',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
    },
    infoCont: {
        display: 'flex',
        gap: 30,
        justifyContent: 'space-evenly',
        paddingHorizontal: 25,
        backgroundColor: '#001d3d',
        paddingVertical: 30,
        marginBottom: 100,
        borderRadius: 10,  
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 25,
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
    },
    logoutTxt: {
        color: '#000',
        fontSize: 14,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    //#endregion Logout

    //#region Profile Pic Container && Basic Information 
    profilePic: {
        display: 'flex',
        gap: 30,
        marginTop: 10,
    },
    basicInfo: {
        display: 'flex',
        gap: 10,
        justifyContent: 'flex-end',
    },
    basicInfoLabel: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center',
    },
    userProfPic: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 60,
        width: 110,
        height: 110,
    },
    joinDateCont: {
        gap: 5,
    },
    userJoinLab: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        textTransform: 'uppercase'
    },
    userJoin: {
        color: '#fff',
        fontSize: 17,
    },
    infoInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        color: '#FFF',
        fontWeight: '700',
        borderRadius: 10,
        fontSize: 17,
        width: 140,
    },
    infoLabel: {
        color: '#fff',
        fontWeight: '800',
        textTransform: 'uppercase',
        fontSize: 14,
        marginLeft: 5
    },
    //#endregion Basic Information

    //#region Email & Password 
    emailPassword: {
        display: 'flex',
        gap: 15,
    },
    emailPassLabel: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center'
    },
    emailInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        color: '#FFF',
        fontWeight: '700',
        fontSize: 17,
        borderRadius: 10,
    },
    passwordCont: {
        display: 'flex',
        gap: 15,
    },
    passwordInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        color: '#FFF',
        fontWeight: '700',
        fontSize: 17,
        borderRadius: 10,
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
        top: -15
    },
    //#endregion Email & Password 

    updateBtn: {
        backgroundColor: '#A8F94F', 
        padding: 8,
        borderRadius: 5,
        marginBottom: 5,
    },
    updateBtnTxt: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
})

export default ManageUser;

