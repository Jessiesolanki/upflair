import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import Colors from '../../Assets/Colors';
import CustomButton from '../../Components/CustomButton'
import { CheckBox } from 'react-native-elements';
import ControlledInput from '../../Components/ControlledInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../Providers/AuthProvider';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('Authorization status(authStatus):', authStatus);
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

export default LoginScreen = ({ }) => {
  const navigation = useNavigation()
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisibility] = useState(false)
  const insets = useSafeAreaInsets()
  const [fcmToken,setFcmToken]= useState('')

  const { login } = useContext(AuthContext)

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const onSubmit = data => login({ ...data, rememberMe ,device_token:fcmToken}, () => navigation.reset({ index: 0, routes: [{ name: 'MyDrawer' }] }))

  useEffect(() => {
    DataSet();
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(Token => {
          console.log('FCM Token -> ', Token);
          setFcmToken(Token);
        });
    }
  }, []);

  const DataSet = async () => {
    let data = JSON.parse(await AsyncStorage.getItem('user_Login'));
    console.log('login remeber data', data)
    reset({
      ...data

    });
  }
  return (
    <ImageBackground resizeMode='cover'
      style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 24 + insets.top, paddingBottom: 24 + insets.bottom }}
      source={require('../../Assets/Login.png')}>

      <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 10 }}>Login</Text>
      <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15 }}>Welcome back! {"\n"}Please login to continue</Text>

      <ControlledInput
        label={'Email Address'}
        leftIconProps={{ name: 'email' }}
        textInputProps={{ placeholder: 'example@domain.com', keyboardType: 'email-address', autoCapitalize: 'none' }}
        controllerProps={{ name: 'email', control, errors, rules: { required: true }, }}
        containerStyle={{ marginBottom: 20 }} />

      <ControlledInput
        label={'Password'}
        leftIconProps={{ name: 'lock' }}
        rightIconProps={{ name: passwordVisible ? 'visibility-off' : 'visibility', onPress: () => setPasswordVisibility(cv => !cv) }}
        textInputProps={{ placeholder: '_  _  _  _  _  ', secureTextEntry: !passwordVisible }}
        controllerProps={{ name: 'password', control, errors, rules: { required: true }, }}
        containerStyle={{ marginBottom: 20 }} />

      <CustomButton onPress={handleSubmit(onSubmit)} label={'LOGIN'} containerStyle={{ padding: 20 }} />

      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', }}>
        <CheckBox
          title='Remember Me'
          titleProps={{ style: { color: Colors.pinkColor, fontWeight: '500', paddingLeft: 5 } }}
          checked={rememberMe}
          checkedColor={Colors.pinkColor}
          uncheckedColor={Colors.pinkColor}
          onPress={() => setRememberMe(cv => !cv)}
          containerStyle={{ backgroundColor: 'white', padding: 0, margin: 0, marginLeft: 0, borderWidth: 0 }}
        />
        <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }}>
          <Text style={{ color: Colors.pinkColor, textAlign: 'right', marginTop: 3, fontWeight: '500' }}>Forgot Password</Text>
        </TouchableOpacity>
      </View>


      <View style={{ justifyContent: 'flex-end', flex: 1, alignItems: 'flex-end' }}>
        <Text
          activeOpacity={0.9}
          style={{ color: Colors.darkGrey, textAlign: 'center', fontSize: 14, alignSelf: 'center', }}
          onPress={() => navigation.navigate('SignUp')}>Don't have an account? <Text style={{ color: Colors.pinkColor }}>Create Now</Text> </Text>
      </View>
    </ImageBackground>
  );
};
