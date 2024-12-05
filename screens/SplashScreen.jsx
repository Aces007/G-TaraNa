import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAppContext } from '../AppContext';


const SplashScreen = ({ navigation }) => {
    const { userId } = useAppContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (userId) {
                navigation.replace('mainTabs');
            } else {
                navigation.replace('ClassPicker');
            }
        }, 6000)

        return () => clearTimeout(timer)
    }, [userId, navigation])

    return (
        <View style={styles.container}>
            <Image source={require('../assets/icon4-1.png')} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0f1b',
    },
    logo: {
        width: 150, 
        height: 150,
        resizeMode: 'contain',
    },
})

export default SplashScreen;