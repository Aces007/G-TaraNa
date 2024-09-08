import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserProfile = () => {
    return (
        <ScrollView contentContainerStyle={styles.mainCont}>
            <View style={styles.headerCont}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.logoImg}/>
                    <Text style={styles.logoTxt}>G! Tara Na!</Text>
                </View>
                <TouchableOpacity style={styles.searchBox}>
                    <FontAwesome5 name='search' size={16}/>
                    <Text style={styles.searchTxt}>Search a Chord</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.userProfileCont}>
                <View style={styles.userProfLeft}>
                    <View style={styles.userProfPic}>
                        <Image></Image>
                    </View>
                    <Text>User Name</Text>
                </View>
                <View style={styles.userProfRight}>
                    <TouchableOpacity >
                        <Text>Joined</Text>
                        <Text>No. Year Ago</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text>Joined</Text>
                        <Text>No. Year Ago</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create ({
    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 40,
    },
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30,
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 13,
    },
    logoImg: {
        width: 48,
        height: 48,
    },
    logoTxt: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800',
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#A8F94F',
        width: 135,
        height: 30,
        borderRadius: 5,
        gap: 10,
    },
    searchTxt: {
        fontSize: 13,
        fontWeight: '800'
    },
})

export default UserProfile;