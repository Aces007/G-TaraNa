import { View, TouchableOpacity, TextInput, Text, Image, ImageBackground, StyleSheet, ScrollView, Alert } from 'react-native';
import React, {useState} from 'react';
import { useAppContext } from '../AppContext';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';


const ClassPicker = () => {
    const navigation = useNavigation();
    const { setRole } = useAppContext();
    

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole); 

        if (selectedRole === 'user' || selectedRole === 'coach') {
            navigation.navigate('userAccountScreen', { role: selectedRole }); 
        } else {
            Alert.alert('Admin access is required.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.mainCont}> 
            <View style={styles.logoCont}>
                <ImageBackground source={require('../assets/loginSignUpBG.png')} style={styles.mainLogoBG}>
                    <Image source={require('../assets/icon4-1.png')} style={styles.mainLogo} />
                    <Text style={styles.mainLogoTxt}>G! Tara Na!</Text>
                </ImageBackground>
            </View>

            <View style={styles.classPickCont}>
                <Text style={styles.classPickQuote}>WHAT'S YOUR ROLE?</Text>
                
                
                <View style={styles.roleClass}>
                    <TouchableOpacity style={styles.userClass} onPress={() => handleRoleSelect('user')}>
                        <FontAwesome6 name='user-large' color={'#1B1212'} size={35} />
                        <Text style={styles.roleTxt}>USER</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.roleClass}>
                    <TouchableOpacity style={styles.coachClass} onPress={() => handleRoleSelect('coach')}>
                        <FontAwesome6 name='user-group' color={'#1B1212'} size={35} />
                        <Text style={styles.roleTxt}>COACH</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.mainTxt}>"Harmony Unleashed: Your Ultimate Guide to Guitar Chords!"</Text>

            <TouchableOpacity style={styles.adminBtnCont}>
                <FontAwesome6 name='user-gear' color={'#fff'} size={12} style={styles.adminBtn} />
            </TouchableOpacity>
        </ScrollView>
        
    )
}


const styles = StyleSheet.create ({
    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 0,
        gap: 20,
        alignItems: 'center',
    },

    //#region LogoBox 
    logoCont: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 30,
    },
    mainLogoBG: {
        width: 450,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 200,
        borderBottomStartRadius: 200,
        overflow: 'hidden', 
    },
    mainLogo: {
        marginTop: 10,
        width: 140,
        height: 140,
    },
    mainLogoTxt: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: '800',
    },
    //#endregion LogoBox 

    classPickCont: {
        display: 'flex',
        backgroundColor: '#1A2433',
        paddingVertical: 50,
        paddingHorizontal: 25,
        alignItems: 'center',
        borderRadius: 10,
        gap: 20,
        width: '95%',
    },

    classPickQuote: {
        color: '#FFF',
        fontSize: 23,
        fontWeight: '800',
        letterSpacing: 1.5,
    },

    roleClass: {
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
    },

    userClass: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        backgroundColor: '#A8F94F',
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    coachClass: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        backgroundColor: '#80E0B4',
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    
    roleTxt: {
        color: '#1B1212',
        fontSize: 23,
        fontWeight: '800',
    },  

    // Bottom Quote
    mainTxt: {
        marginTop: 90,
        color: '#FFF',
        fontSize: 13,
        textAlign: 'center',
        width: '75%',
        fontWeight: '700',
    },

    adminBtnCont: {
        display: 'flex',
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 50,
    },

    adminBtn: {
        textAlign: 'center',
    },
})
export default ClassPicker;