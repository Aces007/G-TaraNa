import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';


const HomePage = () => {
    return (
        <View style={styles.mainCont}>
            <View style={styles.headerCont}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.logoImg}/>
                    <Text style={styles.logoTxt}>G! Tara Na!</Text>
                </View>
            </View>

            <View style={styles.mainTextCont}>
                <Text style={styles.mainText}>Harmony Unleashed: Your Ultimate Guide to Guitar Chords!</Text>
            </View>


        </View>
    )
}


const styles = StyleSheet.create ({
    mainCont: {
        flex: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 40,
    },
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    logoImg: {
        width: 52,
        height: 52,
    },
    logoTxt: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Roboto',
    },
    mainTextCont: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        width: '50%'
    },
    mainText: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center'
    },  
})

export default HomePage;