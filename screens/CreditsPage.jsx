import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Ionicons from  'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';
import { Linking } from 'react-native';


const CreditsPage = () => {
    return(
        <ScrollView contentContainerStyle={styles.mainCont}>
            <View style={styles.labelCont}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('mainTabs')}>
                    <Ionicons name='arrow-back' color="white" size={24} style={styles.manageSVG} />
                </TouchableOpacity>
                <Text style={styles.themeLabel}>Credits to the Creator</Text>
            </View>

            <Text style={styles.appTrademark}>G! Tara Na!</Text>

            <TouchableOpacity style={styles.quoteCont}>
                <Text style={styles.mainQuote}>Harmony Unleashed</Text>
                <Text style={styles.subQuote}>Your Ultimate Guide to Guitar Chords!</Text>
            </TouchableOpacity>

            <View style={styles.contriCont}>
                <Text style={styles.contriLabel}>Contributors</Text>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.instagram.com/lawlensphotography/")
                }}>
                    <Image source={require('../assets/Contributors/Ace.jpg')} style={styles.contriJPG}/>
                    <Text style={styles.contriTXT}>Ace Clavano</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.instagram.com/airacaughton4k/")
                }}>
                    <Image source={require('../assets/Contributors/Aira.png')} style={styles.contriJPG}/>
                    <Text style={styles.contriTXT}>Aira Estur</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.instagram.com/cmllnieto_/")
                }}>
                    <Image source={require('../assets/Contributors/Cams.jpg')} style={styles.contriJPG}/>
                    <Text style={styles.contriTXT}>Camille Nieto</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.instagram.com/ec_pzzz/")
                }}>
                    <Image source={require('../assets/Contributors/Eros.jpg')} style={styles.contriJPG}/>
                    <Text style={styles.contriTXT}>Eros Ruffy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.frameworkCont}>
                <Text style={styles.frameworkLabel}>Frameworks and Languages</Text>
                <View style={styles.frame1}>
                    <Image source={require('../assets/react-native.png')} style={styles.frameworkJPG1}/>
                    <Image source={require('../assets/js.png')} style={styles.frameworkJPG1}/>
                </View>
                <View style={styles.frame2}>
                    <Image source={require('../assets/expo.png')} style={styles.frameworkJPG2}/>
                    <Image source={require('../assets/supabase.png')} style={styles.frameworkJPG2}/>
                </View>
            </View>

            <Text style={styles.rightsReserve}>@ 2024 G! Tara Na! by AACE. All Rights Reserved</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        flexGrow: 1,
        backgroundColor: '#0a0f1b',
        padding: 20,
        paddingTop: 40,
        paddingBottom: 50,
    },
    appTrademark: {
        marginTop: 30,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 45,
        fontWeight: '900'
    },

    rightsReserve: {
        textAlign: 'center',
        color: '#FFF',
        marginTop: 50,
    },
    
    //#region Quote Container
    quoteCont:{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    mainQuote: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '900'
    },
    subQuote: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500'
    },
    //#endregion Quote Container

    //#region Label Container
    labelCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    manageSVG: {
        padding: 7.5,
        width: 40,
        height: 40,
        textAlign: 'center'
    },
    themeLabel: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 21,
    },
    //#endregion Label Container

    //#region Contributors
    contriCont: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 40,
    },
    contriLabel: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '800',
    },
    contriJPG: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 20,
    },
    contriTXT: {
        fontSize: 21,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '800',
    },  
    //#endregion Contributors

    //#region Frameworks and Languages
    frameworkCont: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 40,
        gap: 30,
    },
    frameworkJPG1: {
        width: 90,
        height: 90,
    },
    frameworkJPG2: {
        width: 110,
        height: 110,
    },
    frameworkLabel: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '800',
    },
    frame1: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
    },
    frame2: {
        display: 'flex',
        flexDirection: 'row',
        gap: 35,
    },
    //#endregion Frameworks and Languages
})

export default CreditsPage;