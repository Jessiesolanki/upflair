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
    KeyboardAvoidingView,
    StatusBar, ImageBackground
} from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../Components/CustomInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Assets/Colors';
import { BASE_URL } from '../../Constant/BaseURL';
import Loader from '../../Components/Loader';
const ForgotPassword = ({ navigation }) => {
    const [value, onChangeText] = React.useState('');

    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');


    const onSubmit = data => {
        console.log(data
        );

    };

    const validation = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setErrortext('');
        if (reg.test(userEmail) === false) {
          setErrortext('Please fill valide Email id');
          return;
        }
       
        SendOtpApi()
      }
      const SendOtpApi = () => {
     let params = {
          email: userEmail,
        };
        setLoading(true)
        return fetch(BASE_URL+'api/forgotpassword', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params)
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false)
            console.log("responseJson onLoginPressHandle", responseJson)
            if (responseJson.status === true) {
                console.log('---fdfdf',responseJson.data)
         navigation.navigate('ForgotPasswordOtp', {user_id:responseJson.data.user_id ,userEmail:userEmail })
            }
            else if (responseJson.status === false) {
              alert(responseJson.message)
            }
          })
          .catch((error) => {
            setLoading(false)
            console.error(error);
          });
    
      };
    return (

        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ImageBackground resizeMode='contain'
                style={{ width: '100%', height: '100%', flex: 1 }}
                source={require('../../Assets/Login.png')}>
                <SafeAreaView style={{ flex: 1 }} >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                            flex: 1,
                            // justifyContent: 'space-around',
                            alignContent: 'center', padding: 21
                        }}>
                        <View>
                            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: 30, height: 30, marginBottom: 15 }}
                                    source={require('../../Assets/arrow_circle.png')} />
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 25 }}>Forgot Password</Text>
                            {/* <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15 }}>Welcome back! {"\n"}Please login to continue</Text> */}
                            <KeyboardAvoidingView enabled>

                                <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={{ width: '20%', justifyContent: 'center' }}>
                                            <Image
                                                resizeMode='contain'
                                                style={{ width: 18, height: 18, marginHorizontal: 15 }}
                                                source={require('../../Assets/mail.png')} />
                                        </View>
                                        <View style={{ width: '77%' }}>
                                            <Text style={{ marginTop: 5 }}>Email Address</Text>
                                            <TextInput
                                                // style={styles.inputStyle}
                                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                                underlineColorAndroid="#f000"
                                                placeholder="Enter email address"
                                                width={'75%'}
                                                placeholderTextColor={Colors.darkGrey}
                                                keyboardType="email-address"

                                                blurOnSubmit={false}
                                            />
                                        </View>
                                    </View>
                                </View>


                            </KeyboardAvoidingView>
                            {errortext != '' ? (
                                <Text style={styles.errorTextStyle}>
                                    {errortext}
                                </Text>
                            ) : null}



                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={() => {validation() }}
                            >
                                <Text style={styles.buttonTextStyle}>Send Email</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};
export default ForgotPassword;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,

        backgroundColor: Colors.white,

    },
    SectionStyle: {
        justifyContent: 'center', alignItems: 'center',
        flex: 1, backgroundColor: 'red'

    },
    buttonStyle: {
        backgroundColor: Colors.pinkColor,
        color: '#FFFFFF',
        height: 65, width: '100%', borderRadius: 8, marginVertical: 15,
        alignItems: 'center', justifyContent: 'center'

    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10, fontWeight: 'bold',
        fontSize: 18,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: Colors.darkGrey,
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',

    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});