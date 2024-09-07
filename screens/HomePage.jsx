import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';




const HomePage = () => {
    return (
        <ScrollView contentContainerStyle={styles.mainCont}>
            <View style={styles.headerCont}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.logoImg}/>
                    <Text style={styles.logoTxt}>G! Tara Na!</Text>
                </View>
                <TouchableOpacity style={styles.searchBox}>
                    <FontAwesome5 name='search' size={18}/>
                    <Text style={styles.searchTxt}>Search a Chord</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.mainContent}>
                <Text style={styles.mainTxt}>Harmony Unleashed: Your Ultimate Guide to Guitar Chords!</Text>
                <Image source={require('../assets/homeImg.png')} style={styles.mainImg}/>
            </View>

            <View style={styles.charBoxes}>
                <TouchableOpacity style={styles.charBox1}>
                    <FontAwesome5 name='hands-helping' color='#FFF' size={25}/>
                    <Text style={styles.charTxt1}>Easy To Use</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.charBox2}>                    
                    <FontAwesome6 name='ear-listen' color='#FFF' size={25}/>
                    <Text style={styles.charTxt2}>Ear Trainer</Text>    
                </TouchableOpacity>
                <TouchableOpacity style={styles.charBox3}>                    
                    <Ionicons name='musical-note' color='#FFF' size={25}/>
                    <Text style={styles.charTxt3}>Harmonic Bliss</Text>    
                </TouchableOpacity>
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
        gap: 7,
    },
    searchTxt: {
        fontSize: 14,
        fontWeight: '800'
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        padding: 10,
        marginVertical: 25,
    },
    mainTxt: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        width: '75%',
        fontWeight: '700',
    },  
    mainImg: {
        width: 300,
        height: 280,
    },

    /*region charBoxes */
    charBoxes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 5,
    },
    charBox1: {
        backgroundColor: '#26393E',
        width: 100,
        height: 130,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }, charTxt1: {
        color: '#FFF',
        fontWeight: '700',
    },
    charBox2: {
        backgroundColor: '#26393E',
        width: 100,
        height: 130,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }, charTxt2: {
        color: '#FFF',
        fontWeight: '700',
    },
    charBox3: {
        backgroundColor: '#26393E',
        width: 100,
        height: 130,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }, charTxt3: {
        color: '#FFF',
        fontWeight: '700',
    },
    /*endregion charBoxes */
})

export default HomePage;