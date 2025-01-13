import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useAppContext } from '../AppContext';
import { useTheme } from '../ThemeContext';
import { useFonts } from 'expo-font';
import { safeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import IconDark from '../assets/icon4-1.png';
import IconLight from '../assets/icon4-2.png';

const ChordHistory = ({ navigation }) => {
    const { userId, fetchUserData } = useAppContext();
    const [userName, setUserName] = useState('');
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
            setUserName(userData.first_name);
        };

        getUserData();
    }, [userId])

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

    const handlePing = async () => {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 3000)
        );
    
        try {
          const response = await Promise.race([
            fetch("http://192.168.1.34:5000/api/detect2", {
              method: "GET",
            }),
            timeout,
        ]);

        if (response.ok) {
        console.log("Ping successful");

        let chords = await response.json();

        Alert.alert("Chords", chords.chords.join(", "));
        } else {
        // Alert.alert("Error", "Failed to communicate with the server.");
        console.log("Error", "Failed to communicate with the server.");
        }
    } catch (error) {
        //   Alert.alert(
        //     "Error",
        //     error.message === "Timeout" ? "Failed ping" : "Server error"
        //   );

        console.log(
        "Error",
        error.message === "Timeout"
            ? "Failed ping"
            : "Server error" + error.message
        );
    }
    };

    return (
        <ScrollView contentContainerStyle={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('User')}>
                <Ionicons name='arrow-back' color="white" size={25} style={[styles.manageSVG, {color: currentTheme.textColor}]} />
            </TouchableOpacity>

            <Text style={[styles.historyLabel, {color: currentTheme.textColor}]}>Chord History</Text>
            <Text style={[styles.greetingCont, {color: currentTheme.textColor}]}>Good Day! {userName}!</Text>

            <View style={styles.btnCont}>
                <TouchableOpacity onPress={handlePing} style={[styles.fetchBtn, {borderColor: currentTheme.borderColor}]}>
                    <Text style={[styles.fetchBtnTxt, {color: currentTheme.textColor}]}>Fetch Chords</Text>
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
    historyLabel: {
        color: '#FFF',
        fontSize: 28,
        fontFamily: 'Montserrat-ExtraB',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
    },
    greetingCont: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
    },
    btnCont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
    },
    fetchBtn: {
        borderWidth: 3,
        paddingVertical: 50,
        paddingHorizontal: 20,
        width: '100',
        height: '100',
        borderRadius: 64,
        marginTop: 50,
    },  
    fetchBtnTxt: {
        fontFamily: 'RedHat-Bold',
        textAlign: 'center',
    },
})
export default ChordHistory;