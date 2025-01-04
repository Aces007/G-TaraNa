import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, FlatList, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppContext } from '../AppContext';
import { useTheme } from '../ThemeContext';
import { useFonts } from 'expo-font';
import { safeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const StudentsList = ({ route, navigation }) => {
    const { fetchStudentsInClass, userId } = useAppContext();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isDarkMode, toggleTheme, currentTheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(isDarkMode ? 'dark' : 'light');


    useEffect(() => {
        const getStudents = async () => {
            try {
                const studentsList = await fetchStudentsInClass();
                setStudents(studentsList)
            } catch (error) {
                Alert('Error', "Students Fetching Failed")
            } finally {
                setLoading(false);
            }
            
        };


        getStudents();
    });


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


    return (
        <View style={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>

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
})

export default StudentsList;