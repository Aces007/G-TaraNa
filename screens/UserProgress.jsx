import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, TextInput, Image, StyleSheet, ScrollView, Alert, Animated, ActivityIndicator } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useAppContext } from '../AppContext';
import { useTheme } from '../ThemeContext';
import { FlatList } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { safeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const UserProgress = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [weekDays, setWeekDays] = useState([]);
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
        const startOfWeek = moment().startOf('week');
        const days = Array.from({ length: 7 }).map((_, i) => 
            moment(startOfWeek).add(i, 'days')
        );
        setWeekDays(days);
    }, []);

    useEffect(() => {
        console.log('userId in UserProfile:', userId);
        const getUserData = async () => {
            const userData = await fetchUserData(userId);
            setUserName(userData.first_name);
        };

        getUserData();
    }, [userId])

    const renderDayItem = ({ item }) => {
        const isSelected = item.isSame(selectedDate, 'day');
        return (
            <TouchableOpacity onPress={() => setSelectedDate(item)} style={styles.dayContainer}>
                <Text style={[styles.dayLabel, isSelected && styles.selectedDayLabel]}>{item.format('ddd')}</Text>
                <Text style={[styles.dateLabel, isSelected && styles.selectedDateLabel]}>{item.format('D')}</Text>
            </TouchableOpacity>
        );
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
        <ScrollView contentContainerStyle={[styles.mainCont, {backgroundColor: currentTheme.backgroundColor}]}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('User')}>
                <Ionicons name='arrow-back' color="white" size={25} style={[styles.manageSVG, {color: currentTheme.textColor}]} />
            </TouchableOpacity>
            
            <Text style={[styles.progressLabel, {color: currentTheme.textColor}]}>User Progress</Text>
            <Text style={[styles.greetingCont, {color: currentTheme.textColor}]}>Good Day! {userName}!</Text>

            <View style={[styles.calendarCont, {backgroundColor: currentTheme.backgroundColor5}]}>
                <View style={styles.monthSelector}>
                    <Text style={styles.monthText}>{selectedDate.format('MMMM')} {selectedDate.format('YYYY')}</Text>
                </View>

                {/* Days of the Week */}
                <FlatList
                    horizontal
                    data={weekDays}
                    renderItem={renderDayItem}
                    keyExtractor={(item) => item.format('D')}
                    contentContainerStyle={styles.weekList}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            
            <View style={styles.progressCharts}>
                <View style={[styles.progressMajor, {backgroundColor: currentTheme.backgroundColor2}]}>
                    <Text style={[styles.progressMajorLabel, {color: currentTheme.textColor}]}>Major Chords</Text>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={75}
                        tintColor={currentTheme.buttonColor}
                        backgroundColor={currentTheme.borderColor}
                    >
                        {
                            (fill) => (
                                <Text
                                    style={[styles.progressMajorTxt, {color: currentTheme.textColor}]}
                                >
                                    {`${Math.round(fill)}%`}
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>

                <View style={[styles.progressMinor, {backgroundColor: currentTheme.backgroundColor2}]}>
                    <Text style={[styles.progressMinorLabel, {color: currentTheme.textColor}]}>Minor Chords</Text>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={75}
                        tintColor={currentTheme.buttonColor}
                        backgroundColor={currentTheme.borderColor}
                    >
                        {
                            (fill) => (
                                <Text
                                    style={[styles.progressMinorTxt, {color: currentTheme.textColor}]}
                                >
                                    {`${Math.round(fill)}%`}
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
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
        paddingTop: 40,
    },
    manageSVG: {
        padding: 7.5,
        width: 40,
        height: 40,
        textAlign: 'center'
    },
    progressLabel: {
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

    //#region Calendar Header
    calendarCont: {
        backgroundColor: '#A8F94F',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
    },
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    monthText: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Poppins-ExtraB',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 10,
    },
    weekList: {
        justifyContent: 'space-around',
    },
    dayContainer: {
        alignItems: 'center',
        padding: 10,
    },
    dayLabel: {
        color: '#000',
        fontSize: 15,
        fontFamily: 'Montserrat-Med',
        textAlign: 'center',
    },
    dateLabel: {
        color: '#000',
        fontSize: 15,
        fontFamily: 'Montserrat-Reg',
        textAlign: 'center',
        marginTop: 5,
    },
    selectedDayLabel: {
        color: '#000',
    },
    selectedDateLabel: {
        backgroundColor: '#FFF',
        color: '#000',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    //#endregion Calendar Header

    progressCharts: {
        display: 'flex',
        gap: 20,
    },

    //#region Minor Chords section
    progressMinorLabel: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    progressMinor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        borderRadius: 20,
    },
    progressMinorTxt: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Montserrat-Med',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 25,
    },
    //#endregion Minor Chords section

    //#region Major Chords section
    progressMajorLabel: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    progressMajor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        borderRadius: 20,
    },
    progressMajorTxt: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Montserrat-Med',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 25,
    },
    //#endregion Major Chords section
})

export default UserProgress;