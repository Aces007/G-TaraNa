import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, TextInput, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAppContext } from '../AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ManageUser = ({ navigation }) => {
    const { userId, fetchUserData, updateUserDetails } = useAppContext();
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log('userId in UserProfile:', userId);
        const getUserData = async () => {
            const userData = await fetchUserData(userId);
            setName(userData.name);
            setUserName(userData.username);
            setAge(userData.age);
            setEmail(userData.email)
        };

        getUserData();
    }, [userId]);

    const handleUpdate = async () => {
        const initialData = { 
            email: email.trim(),
            username: username.trim(), 
            name: name.trim(), 
            age: age? age : null, 
        };

        updatedData = Object.fromEntries(
            Object.entries(initialData).filter(([_, v]) => v != null && v !== '')
        );
        
        if (Object.keys(updatedData).length === 0) {
            Alert.alert('Nothing to update');
            return;
        }

        
        try {
            console.log("Current Input:", updatedData);
            const result = await updateUserDetails(userId, updatedData);
            if (result) {
                Alert.alert('Success, user details updated!')
            } else {
                Alert.alert('Error, user details failed to update.')
            }

            if (password.trim()) {
                await updatePassword(password);
                Alert.alert('Password updated successfully!');
            }
        } catch (error) {
            console.error('Error updating user details:', error.message);
        }
    };

    return (
        <ScrollView style={styles.mainCont}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('User')}>
                <Ionicons name='arrow-back' color="white" size={21} style={styles.manageSVG} />
            </TouchableOpacity>
            <Text style={styles.manageUserLabel}>Manage User Details</Text>

            <View style={styles.infoCont}>
                <View style={styles.basicInfo}>
                    <Text style={styles.basicInfoLabel}>User Basic Information</Text>
                    <TextInput placeholder='Name' placeholderTextColor={'#FFF'} value={name} onChangeText={setName} style={styles.nameInput}/>
                    <TextInput placeholder='UserName' placeholderTextColor={'#FFF'} value={username} onChangeText={setUserName} style={styles.usernameInput}/>
                    <TextInput placeholder='Age' placeholderTextColor={'#FFF'} value={age} onChangeText={setAge} style={styles.ageInput}/>
                </View>

                <View style={styles.emailPassword}>
                    <Text style={styles.emailPassLabel}>Email & Password</Text>
                    <TextInput placeholder='Email' placeholderTextColor={'#FFF'} value={email} onChangeText={setEmail} style={styles.emailInput}/>
                    <TextInput placeholder='Password' placeholderTextColor={'#FFF'} value={password} onChangeText={setPassword} style={styles.passwordInput}/>
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
    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 40,
    },
    manageSVG: {
        padding: 7.5,
        width: 40,
        height: 40,
        textAlign: 'center'
    },
    manageUserLabel: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: '800',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 15,
    },
    infoCont: {
        display: 'flex',
        gap: 50,
        justifyContent: 'space-evenly',
        paddingHorizontal: 25,
        backgroundColor: '#1A2433',
        paddingVertical: 30,
        borderRadius: 10,  
    },

    //#region Basic Information
    basicInfo: {
        display: 'flex',
        gap: 20,
    },
    basicInfoLabel: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '800',
    },
    nameInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        color: '#FFF',
        fontWeight: '700',
        borderRadius: 10,
    },
    usernameInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        color: '#FFF',
        fontWeight: '700',
        borderRadius: 10,
    },  
    ageInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        color: '#FFF',
        fontWeight: '700',
        borderRadius: 10,
    },
    //#endregion Basic Information

    //#region Email & Password 
    emailPassword: {
        display: 'flex',
        gap: 20,
    },
    emailPassLabel: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '800',
    },
    emailInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        color: '#FFF',
        fontWeight: '700',
        borderRadius: 10,
    },
    passwordInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 5,
        paddingHorizontal: 10,
        color: '#FFF',
        fontWeight: '700',
        borderRadius: 10,
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

