import { View, TouchableOpacity, TextInput, Text, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import React, {useState} from 'react';

const Login = ({ route, navigation }) => {
    const [selected, setSelected] = useState('Login');

    return (
        <ScrollView contentContainerStyle={styles.mainCont}>
            <View style={styles.logoCont}>
                <ImageBackground source={require('../assets/loginSignUpBG.png')} style={styles.mainLogoBG}>
                    <Image source={require('../assets/icon.png')} style={styles.mainLogo} />
                    <Text style={styles.mainLogoTxt}>G! Tara Na!</Text>
                </ImageBackground>
            </View>

            <View style={styles.loginContainer}>
                <View style={styles.userMethodCont}>
                    <TouchableOpacity 
                        style={[styles.button, 
                            selected === 'SignUp' ? styles.activeButton : 
                            styles.inactiveButton
                        ]} 
                        onPress={() => {setSelected('Login')}} 
                    >
                        <Text style={[styles.buttonText, 
                            selected === 'SignUp' ? styles.activeText : 
                            styles.inactiveText
                        ]}
                        >
                            {'Login'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, 
                            selected === 'SignUp' ? styles.activeButton : 
                            styles.inactiveButton
                        ]}                         
                        onPress={() => {setSelected('SignUp'); 
                            navigation.navigate('SignUp')
                        }} 
                    >
                        <Text style={[styles.buttonText, 
                            selected === 'SignUp' ? styles.activeText : 
                            styles.inactiveText]}
                        >
                            {'SignUp'}
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <TextInput
                    style={styles.inputFields}
                    placeholder="Email"
                    placeholderTextColor={"#FFF"}
                    // value={email}
                    // onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.inputFields}
                    placeholder="Password"
                    placeholderTextColor={"#FFF"}
                    // value={password}
                    // onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginBtnTxt}>{'Login'}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.mainTxt}>"Harmony Unleashed: Your Ultimate Guide to Guitar Chords!"</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
        marginTop: 20,
        width: 120,
        height: 120,
    },
    mainLogoTxt: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: '800',
    },
    //#endregion LogoBox 

    //#region EntryMethods
    userMethodCont: {
        flexDirection: 'row',
        borderRadius: 25,
        borderWidth: 2,
        overflow: 'hidden',
    },
    button: {
        flex: 1, 
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#A8F94F', 
    },
    inactiveButton: {
        backgroundColor: '#0a0f1b', 
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeText: {
        color: '#000', 
        textTransform: 'uppercase'
    },
    inactiveText: {
        color: '#FFF', 
        textTransform: 'uppercase'
    },
    //#endregion EntryMethods

    //#region LoginBox 
    loginContainer: {
        display: 'flex',
        backgroundColor: '#1A2433',
        paddingVertical: 30,
        paddingHorizontal: 25,
        alignItems: 'center',
        borderRadius: 10,
        gap: 20,
        width: '95%',
    },
    headerTwo: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '700',
        color: '#FFF',
        textTransform: 'uppercase',
    },
    inputFields: {
        width: '90%',
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 8,
        borderColor: '#FFF',
        color: '#FFF',
        fontWeight: '800',
    },
    loginBtn: {
        backgroundColor: '#A8F94F', 
        padding: 8,
        borderRadius: 5,
        marginBottom: 5,
    },
    loginBtnTxt: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    //#endregion LoginBox 

    // Bottom Quote
    mainTxt: {
        marginTop: 40,
        color: '#FFF',
        fontSize: 13,
        textAlign: 'center',
        width: '75%',
        fontWeight: '700',
    },
})

export default Login;