import React from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-elements"
import Colors from "../Assets/Colors"
import { shadow } from "../Assets/Styles"


export default CustomButton = ({ label, onPress, containerStyle, disabled, secondary, icon, loading }) => {

    const Content = () => {
        if (loading) return <ActivityIndicator color={secondary ? Colors.pinkColor : '#fff'} size='small' />

        else return (
            <View>
                {icon && <Icon color={Colors.white} name={icon} />}
                {icon && label && <View style={{ width: 10 }} />}
                {label && <Text style={{ color: secondary ? Colors.pinkColor : '#fff', fontSize: 16, fontWeight : '500',  }} adjustsFontSizeToFit numberOfLines={1}>{label}</Text>}
            </View>
        )
    }

    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[{ backgroundColor:secondary ? Colors.white : Colors.pinkColor,borderWidth : 1.2, borderColor : Colors.pinkColor, ...shadow, alignItems: 'center', borderRadius: 10, opacity: disabled ? 0.5 : 1, padding: 14,  },containerStyle]}>
            <Content/>
        </TouchableOpacity>
    )
}