import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, TouchableHighlight, Text, TextInput, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAppContext } from '../AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';


const UserProgress = ({ navigation }) => {
    return (
        <ScrollView style={styles.mainCont}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('User')}>
                <Ionicons name='arrow-back' color="white" size={21} style={styles.manageSVG} />
            </TouchableOpacity>

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
})

export default UserProgress;