import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,useWindowDimensions,ImageBackground,
    StatusBar,
} from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../Components/CustomInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Assets/Colors';

// import Loader from './Components/Loader';

const UserType = ({ navigation }) => {
    const [value, onChangeText] = React.useState('');
    const windowDimensions = useWindowDimensions()

    return (

        <View style={{flex:1,width: windowDimensions.width,backgroundColor:Colors.backgroundColorW}}>
 <ImageBackground style={{width:'100%',height:'100%'}} source={require('../../../Src/Assets/splash.jpg')}>

            <View style={{  justifyContent: 'center', alignItems: 'center' ,flex:1}}>
               
<View style={{justifyContent:'flex-end',flex:1,marginBottom:35,width: windowDimensions.width,alignContent:'center' }}> 
              <View style={{alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.buyerButtonStyle}
                    activeOpacity={0.5}
                onPress={()=>{navigation.navigate('Login')}}
                >
                    <Text style={styles.buttonTextStyle}>Sign up as a buyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sellerButtonStyle}
                    activeOpacity={0.5}
                // onPress={onSubmit}
                >
                    <Text style={styles.sellerTextStyle}>Sign up as a seller</Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
            </ImageBackground>
        </View>
    );
};
export default UserType;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,backgroundColor: '#307ecc',

    },

    buyerButtonStyle: {
        backgroundColor: Colors.pinkColor,
        color: Colors.white,
        height: 60, width: '87%',borderRadius:7,
        alignItems: 'center',justifyContent:'center',marginBottom:13

    },
    sellerButtonStyle: {
        backgroundColor: Colors.white,marginVertical:10,
        height: 60, width: '87%',borderRadius:7,
        alignItems: 'center',justifyContent:'center'

    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,fontWeight:'bold',
        fontSize: 18,
    },
    sellerTextStyle: {
        color: Colors.darkGrey,
        paddingVertical: 10,
        fontSize: 16,
    },

});