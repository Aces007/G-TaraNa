import { View, TouchableOpacity, TextInput, Text, Image, ImageBackground, StyleSheet, ScrollView, Alert } from 'react-native';
import React, {useState} from 'react';
import { useAppContext } from '../AppContext';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SignUp = ({ route, navigation }) => {
    const [selected, setSelected] = useState('SignUp');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [dobString, setDobString] = useState('');

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { role, signUp } = useAppContext();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const onChange = ( event, selectedDate ) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDobString(currentDate.toLocaleDateString()); 
    }

    const handleAuth = async () => {
        if (!role) {
            Alert.alert("Role is not defined. Please select a role.");
            return;
        }

        if (!email || !password) {
            Alert.alert("Please fill in the required fields.");
            return;
        }

        if (!emailRegex.test(email)) {
            Alert.alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 7) {
            Alert.alert("Please enter a password with a minimum of 7 characters.");
            return;
        }

        if (username.length < 3) {
            alert('Username should be at least 3 characters long.');
            return;
        }

        try {
            await signUp(email, username, firstname, lastname, age, password, role);
            navigation.navigate('mainTabs');
        } catch (error) {
            Alert.alert("Error during sign-up", error.message);
        }
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const [fontsLoaded] = useFonts({
        'Poppins-ExtraB': require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        'Montserrat-Med': require('../assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
        'RedHat-Bold': require('../assets/fonts/Red_Hat_Display/static/RedHatDisplay-Bold.ttf'),
    });
    

    return (
        <ScrollView contentContainerStyle={styles.mainCont}>
            <View style={styles.logoCont}>
                <ImageBackground source={require('../assets/loginSignUpBG.png')} style={styles.mainLogoBG}>
                    <Image source={require('../assets/icon4-1.png')} style={styles.mainLogo} />
                    <Text style={styles.mainLogoTxt}>G! Tara Na!</Text>
                </ImageBackground>
            </View>

            <View style={styles.signUpContainer}>
                <View style={styles.userMethodCont}>
                    <TouchableOpacity 
                        style={[styles.button, 
                            selected === 'SignUp' ? styles.activeButton : 
                            styles.inactiveButton
                        ]} 
                        onPress={() => {setSelected('Login'); 
                            navigation.navigate('Login')
                        }} 
                    >
                        <Text style={[styles.buttonText, 
                            selected === 'SignUp' ? styles.activeText : 
                            styles.inactiveText]}
                        >
                            {'Login'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, 
                        selected === 'SignUp' ? styles.activeButton : 
                        styles.inactiveButton
                    ]} 
                        onPress={() => setSelected('SignUp')}>
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
                    placeholder="First Name"
                    placeholderTextColor={"#FFF"}
                    value={firstname}
                    onChangeText={setFirstName}
                    autoCapitalize="none"
                />
                
                <TextInput
                    style={styles.inputFields}
                    placeholder="Surname"
                    placeholderTextColor={"#FFF"}
                    value={lastname}
                    onChangeText={setLastName}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.inputFields}
                    placeholder="Age"
                    placeholderTextColor={"#FFF"}
                    value={age}
                    onChangeText={setAge}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.inputFields}
                    placeholder="Username"
                    placeholderTextColor={"#FFF"}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

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


                <TouchableOpacity onPress={()=> setShow(true)} style={styles.birthBtn}> 
                    <Text style={dobString ? styles.birthDateTxt : styles.birthBtnTxt}>
                        {dobString ? dobString : 'Date of Birth'}
                    </Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker 
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />
                )}

                <TouchableOpacity style={styles.signUpBtn} onPress={handleAuth}>
                    <Text style={styles.signUpBtnTxt}>{'SignUp'}</Text>
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
        fontFamily: 'Poppins-ExtraB'
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

    //#region SignUpBox 
    signUpContainer: {
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
    birthBtn: {
        width: '90%',
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 8,
        borderColor: '#FFF',
    },
    birthBtnTxt: {
        color: '#FFF',
        fontFamily: 'Montserrat-Bold',
    },
    birthDateTxt: {
        color: '#FFF',
        fontFamily: 'Montserrat-Bold',
    },
    signUpBtn: {
        backgroundColor: '#A8F94F', 
        padding: 8,
        borderRadius: 5,
        marginBottom: 5,
    },
    signUpBtnTxt: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'RedHat-Bold',
        textTransform: 'uppercase',
    },
    //#endregion SignUpBox 

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

export default SignUp;



