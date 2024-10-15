import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Ionicons from  'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';


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

            <View>
                
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
    appTrademark: {
        marginTop: 30,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 45,
        fontWeight: '900'
    },
    
    //#region Quote Container
    quoteCont:{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
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
})

export default CreditsPage;