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
  StatusBar,
} from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../Components/CustomInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Assets/Colors';

// import Loader from './Components/Loader';

const ResendPassword = ({ navigation }) => {
  const [value, onChangeText] = React.useState('');

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [passwordShow, setPasswordShow] = useState(false);
  const passwordInputRef = createRef();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data
    );

  };
  return (

    <View style={styles.mainBody}>
      <SafeAreaView style={{ flex: 1 }} >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            // justifyContent: 'space-around',
            alignContent: 'center', padding: 21
          }}>
          <View>
            <TouchableOpacity onPress={() => { navigation.navigate('UserType') }}>
              <Image
                resizeMode='contain'
                style={{ width: 30, height: 30, marginBottom: 15 }}
                source={require('../../Assets/arrow_circle.png')} />
            </TouchableOpacity>
            <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 20 }}>Reset Password</Text>
            {/* <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15 }}>Welcome back! {"\n"}Please login to continue</Text> */}
            <KeyboardAvoidingView enabled>

              <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={{ width: '20%', justifyContent: 'center' }}>
                    <Image
                      resizeMode='contain'
                      style={{ width: 18, height: 18, marginHorizontal: 15 }}
                      source={require('../../Assets/lock.png')} />
                  </View>
                  <View style={{ width: '66%', }}>
                    <Text style={{ marginBottom: 5 }}>New Password</Text>
                    <TextInput
                      style={{}}
                      // style={styles.inputStyle}
                      onChangeText={(UserPassword) =>
                        setUserPassword(UserPassword)
                      }

                      placeholder="Enter new password"
                      placeholderTextColor={Colors.darkGrey}

                      blurOnSubmit={false}
                    />
                  </View>
                  <TouchableOpacity onPress={() => { passwordShow === true ? setPasswordShow(false) : setPasswordShow(true) }} >
                    <Image
                      resizeMode='contain'
                      style={{ width: 18, height: 18, marginRight: 19, marginTop: 5 }}
                      source={require('../../Assets/eye.png')} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={{ width: '20%', justifyContent: 'center' }}>
                    <Image
                      resizeMode='contain'
                      style={{ width: 18, height: 18, marginHorizontal: 15 }}
                      source={require('../../Assets/lock.png')} />
                  </View>
                  <View style={{ width: '66%', }}>
                    <Text style={{ marginBottom: 5 }}>Confirm Password</Text>
                    <TextInput
                      style={{}}
                      // style={styles.inputStyle}
                      onChangeText={(UserPassword) =>
                        setUserPassword(UserPassword)
                      }

                      placeholder="Enter confirm password"
                      placeholderTextColor={Colors.darkGrey}

                      blurOnSubmit={false}
                    />
                  </View>
                  <TouchableOpacity onPress={() => { passwordShow === true ? setPasswordShow(false) : setPasswordShow(true) }} >
                    <Image
                      resizeMode='contain'
                      style={{ width: 18, height: 18, marginRight: 19, marginTop: 5 }}
                      source={require('../../Assets/eye.png')} />
                  </TouchableOpacity>
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
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.buttonTextStyle}>Save</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default ResendPassword;

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