import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, FlatList, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppContext } from '../AppContext';
import { useTheme } from '../ThemeContext';
import { useFonts } from 'expo-font';
import { safeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const PrimaryClasses = ({ navigation }) => {
    const { userId, fetchCoachClasses, fetchUserClasses, fetchUserData, logOut } = useAppContext();
    const [userRole, setUserRole] = useState('');
    const [classes, setClasses] = useState([]);
    const { isDarkMode, toggleTheme, currentTheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(isDarkMode ? 'dark' : 'light');

    useEffect(() => {
        console.log('userId in UserProfile:', userId);
        const getUserData = async () => {
            const userData = await fetchUserData(userId);
            setUserRole(userData.user_role)
        };

        getUserData();
    }, [userId]);
    
    
    useEffect(() => {
        const filterClassesByRole = async () => {
            try {
                if  (userRole === 'coach') {
                    const myClasses = await fetchCoachClasses(userId);
                    setClasses(myClasses);
                } else {
                    const allClasses = await fetchUserClasses(userId);
                    setClasses(allClasses);
                }
            } catch (error) {
                Alert('Class Fetching Error: ', error.message);
            }
        };
        
        if (userRole) {
            filterClassesByRole();
        }
    }, [userId, userRole]);

    const renderClasses = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('mainTabs')}>
            <View style={[styles.classLists, {borderColor: currentTheme.borderColor}]}>
                <Text style={[styles.className, {color: currentTheme.textColor}]}>{item.class_name}</Text>
                <Text style={[styles.classCode, {color: currentTheme.textColor}]}>Class Code: {item.class_code}</Text>
            </View>
        </TouchableOpacity>
    )

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


    return(
        <View style={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>
            <View style={[styles.headerCont, {backgroundColor: currentTheme.backgroundColor}]}>
                <TouchableOpacity style={styles.classBtn} onPress={() => userRole === 'user' ? navigation.navigate('JoinClass') : navigation.navigate('CreateClass')}>
                    <Ionicons name='add-circle-outline' size={25} color={currentTheme.textColor} style={styles.manageSVG} />
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.logoutCont, {backgroundColor: currentTheme.buttonColor}]} onPress={handleLogout}>
                    <AntDesign name='logout' color={'#000'} size={16}/>
                    <Text style={styles.logoutTxt}>Logout</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.classCont, {color: currentTheme.textColor}]}>My Classes</Text>


            <FlatList
                data={classes}
                renderItem={renderClasses}
                keyExtractor={(item) => item.id.toString()}
                style={[styles.classListCont, {color: currentTheme.textColor, borderColor: currentTheme.textColor}]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 55,
    },
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 30,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    classCont: {
        color: '#FFF',
        fontSize: 28,
        fontFamily: 'Montserrat-ExtraB',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
    },
    classLists: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 40,
    },
    className: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
    },
    classCode: {
        fontFamily: 'Montserrat-Med',
        fontSize: 18,
    },
    classListCont: {
        marginVertical: 25,
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
        marginRight: 5,
    },
    logoutTxt: {
        color: '#000',
        fontSize: 12,
        textTransform: 'uppercase',
        fontFamily: 'RedHat-Bold',
    },
})  


export default PrimaryClasses;