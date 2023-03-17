import React from 'react';
import { Text } from 'react-native';
import { View } from "react-native";
import Colors from '../Assets/Colors';

export default Divider = ({ text, containerStyle }) => {

    if (text) return (
        <View style={{ backgroundColor: Colors.black10, paddingHorizontal: 15, paddingVertical: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.black30, marginVertical: 15, ...containerStyle }} >
            <Text style={{ color: Colors.black50 }} >{text}</Text>
        </View>
    )

    return (
        <View style={{ height : 1, backgroundColor: Colors.black20, marginVertical: 15, ...containerStyle }} />
    )

}