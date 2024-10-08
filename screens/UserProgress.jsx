import React, {useEffect, useState} from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useAppContext } from '../AppContext';
import { View, TouchableOpacity, TouchableHighlight, Text, TextInput, Image, StyleSheet, ScrollView, Alert, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';

const UserProgress = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [weekDays, setWeekDays] = useState([]);
    const { userId, fetchUserData } = useAppContext();
    const [userName, setUserName] = useState('');


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
            setUserName(userData.name);
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

    return (
        <ScrollView contentContainerStyle={styles.mainCont}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('User')}>
                <Ionicons name='arrow-back' color="white" size={21} style={styles.manageSVG} />
            </TouchableOpacity>
            
            <Text style={styles.progressLabel}>User Progress</Text>
            <Text style={styles.greetingCont}>Good Day! {userName}!</Text>

            <View style={styles.calendarCont}>
                <View style={styles.monthSelector}>
                    <Text style={styles.monthText}>{selectedDate.format('MMMM')}</Text>
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
                <View style={styles.progressMajor}>
                    <Text style={styles.progressMajorLabel}>Major Chords</Text>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={75}
                        tintColor='#A8F94F'
                        backgroundColor='#3d5875'
                    >
                        {
                            (fill) => (
                                <Text
                                    style={styles.progressMajorTxt}
                                >
                                    {`${Math.round(fill)}%`}
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>

                <View style={styles.progressMinor}>
                    <Text style={styles.progressMinorLabel}>Minor Chords</Text>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={75}
                        tintColor='#A8F94F'
                        backgroundColor='#3d5875'
                    >
                        {
                            (fill) => (
                                <Text
                                    style={styles.progressMinorTxt}
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
        textTransform: 'uppercase',
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 20,
    },
    greetingCont: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '700',
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
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
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
        fontSize: 14,
        fontWeight: 'bold',
    },
    dateLabel: {
        color: '#000',
        fontSize: 18,
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
        fontSize: 20,
        color: '#FFF',
        fontWeight: '700',
        marginBottom: 20,
    },
    progressMinor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d3d',
        padding: 25,
        borderRadius: 20,
    },
    progressMinorTxt: {
        fontSize: 19,
        color: '#FFF',
        fontWeight: '800',
    },
    //#endregion Minor Chords section

    //#region Major Chords section
    progressMajorLabel: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: '700',
        marginBottom: 20,
    },
    progressMajor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d3d',
        padding: 25,
        borderRadius: 20,
    },
    progressMajorTxt: {
        fontSize: 19,
        color: '#FFF',
        fontWeight: '800',
    },
    //#endregion Major Chords section
})

export default UserProgress;