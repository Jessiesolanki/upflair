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
import OTPInputView from '@twotalltotems/react-native-otp-input'
import OTPTextView from 'react-native-otp-textinput';
import { BASE_URL } from '../../Constant/BaseURL';
import Loader from '../../Components/Loader';
const ForgotPasswordOtp = ({ navigation, route }) => {
  const [value, onChangeText] = React.useState('');

  const [otp, setOtp] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState();
  const onSubmit = data => {
    console.log(data
    );

  };

  const validation = () => {
    console.log('otp print -', route.params.user_id)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setErrortext('');
    setOtp('');
    if (otp.length === 4) {
      VerifyOtpApi()
      // setErrortext('Please Enter otp');
      return;
    }
    setErrortext('Please Enter otp');
    // VerifyOtpApi()
  }
  const VerifyOtpApi = () => {
    let params = {
      otp: otp,
      user_id: route.params.user_id

    };
    console.log('----', params)
    setLoading(true)
    return fetch(BASE_URL + 'api/verifyOTP', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson onLoginPressHandle", responseJson)
        setLoading(false)
        if (responseJson.status === true) {
          console.log('---fdfdf', responseJson)
          navigation.navigate('AddNewPassword', { token: responseJson.data })
        }
        else if (responseJson.status === false) {
          alert(responseJson.message)
        }
      })
      .catch((error) => {

        console.error(error);
      });

  };
  const ReSendOtpApi = () => {
    let params = {
      email: route.params.userEmail,
    };
    return fetch(BASE_URL + 'api/forgotpassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson onLoginPressHandle", responseJson)
        if (responseJson.status === true) {
          console.log('---fdfdf', responseJson.data)
          navigation.navigate('ForgotPasswordOtp', { user_id: responseJson.data.user_id, })
        }
        else if (responseJson.status === false) {
          alert(responseJson.message)
        }
      })
      .catch((error) => {

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
          <View style={{ padding: 21 }}>
            <View>
              <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }}>
                <Image
                  resizeMode='contain'
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../../Assets/arrow_circle.png')} />
              </TouchableOpacity>
              <Image
                resizeMode='contain'
                style={{ width: '100%', height: '35%', marginBottom: 15 }}
                source={require('../../Assets/check_you_email.png')} />
              {/* <Text style={{ color: Colors.darkGrey, fontSize: 50, paddingBottom: 5 }}>OTP</Text> */}
              <Text style={{ color: Colors.darkGrey, paddingBottom: 40 }}>An OTP has been sent to your linked e-mail address. Please enter that OTP below to log into your account.</Text>

              <OTPTextView

                handleTextChange={text => setOtp(text)}
                inputCount={4}
                keyboardType="numeric"
                tintColor={Colors.pinkColor}
              />
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                  {errortext}
                </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => ReSendOtpApi()
                  // navigation.navigate('SignUp')
                }
              >
                <Text style={styles.buttonTextStyle}>Resend Otp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => validation()
                  // navigation.navigate('SignUp')
                }
              >
                <Text style={styles.buttonTextStyle}>Submit</Text>
              </TouchableOpacity>

            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
export default ForgotPasswordOtp;

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

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  }, borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 50,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
  },
});