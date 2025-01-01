import React, { useState } from "react";
import { View, TouchableOpacity, TouchableHighlight, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useAppContext } from "../AppContext";


const CreateClass = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { userId, CreateClass } = useAppContext();


    const handleCreatingClass = async () => {
        try {
            const newClass = await CreateClass(name, description, userId);
            alert('Class Created')
        } catch {
            alert('Class Failed to Create')
        }
         
    }


    return (
        <ScrollView>
            <Text>DAMN</Text>
        </ScrollView>
    )
}

export default CreateClass;