import { View, TouchableOpacity, TextInput, Text, Image, ImageBackground, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import { useAppContext } from '../AppContext';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Login = ({ route, navigation }) => {
    const [selected, setSelected] = useState('Login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { logIn } = useAppContext();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert("Please fill in the required fields.");
            return;
        }

        if (password.length < 7) {
            Alert.alert("Please enter a password with a minimum of 7 characters.");
            return;
        }

        const isLoginCorrect = await logIn(email, password);

        if (isLoginCorrect) {
            navigation.navigate('mainTabs');
        }
        else {
            Alert.alert("Error during Log-in", "Invalid login credentials");
        }
    }

    // Loading Graphic 
    const [fontsLoaded] = useFonts({
        'Poppins-ExtraB': require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        'Montserrat-Med': require('../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
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
        <ScrollView contentContainerStyle={styles.mainCont}>
            <View style={styles.logoCont}>
                <ImageBackground source={require('../assets/loginSignUpBG.png')} style={styles.mainLogoBG}>
                    <Image source={require('../assets/icon4-1.png')} style={styles.mainLogo} />
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
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <View style={styles.passwordInputCont}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor={"#FFF"}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <MaterialIcons
                            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                            size={20}
                            color='#FFF'
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.loginBtn} onPress={handleAuth}>
                    <Text style={styles.loginBtnTxt}>{'Login'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomQuote}>
                <Text style={styles.mainTxtBottom}>Harmony Unleashed</Text>
                <Text style={styles.subTxtBottom}>Your Ultimate Guide to Guitar Chords!</Text>
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
        fontFamily: 'Poppins-ExtraB',
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
        fontFamily: 'RedHat-Bold',
    },
    activeText: {
        color: '#000', 
        textTransform: 'uppercase',
        fontFamily: 'RedHat-Bold',
    },
    inactiveText: {
        color: '#FFF', 
        textTransform: 'uppercase',
        fontFamily: 'RedHat-Bold',
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
    inputFields: {
        width: '90%',
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 8,
        borderColor: '#FFF',
        color: '#FFF',
        fontFamily: 'Montserrat-Bold',
    },
    passwordInputCont: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#FFF',
        marginBottom: 20,
        width: '90%',
    },
    passwordInput: {
        flex: 1,
        color: '#FFF',
        padding: 8,
        fontFamily: 'Montserrat-Bold',
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
        fontFamily: 'RedHat-Bold',
        textTransform: 'uppercase',
    },
    //#endregion LoginBox 

    // Bottom Quote
    bottomQuote: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 30,
    },
    mainTxtBottom: {
        color: '#FFF',
        fontSize: 13,
        textAlign: 'center',
        width: '75%',
        fontFamily: 'Montserrat-Reg',
    },
    subTxtBottom: {
        color: '#FFF',
        fontSize: 11,
        textAlign: 'center',
        width: '80%',
        fontFamily: 'Montserrat-Thin',
    },
})

export default Login;