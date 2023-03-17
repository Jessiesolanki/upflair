import React, { useContext, useState } from 'react';
import { Text, ImageBackground, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import Colors from '../../Assets/Colors';
import CustomButton from '../../Components/CustomButton'
import ControlledInput from '../../Components/ControlledInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../Providers/AuthProvider';
import { CheckBox, Icon } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import { shadow } from '../../Assets/Styles';

export default SignUp = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState()
  const [passwordVisible, setPasswordVisibility] = useState(false)
  const insets = useSafeAreaInsets()

  const { signUp } = useContext(AuthContext)

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const onSubmit = data => {
    if (selectedImage) data = { ...data, 'profile-file': selectedImage }
    signUp(data, () => navigation.navigate('SelectBrand'))
  }

  const onImageSelected = res => {
    if (!res || res?.didCancel) return
    setSelectedImage(res.assets[0])
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null} keyboardVerticalOffset={0} style={{ flex: 1 }} >

      <ImageBackground resizeMode='cover'
        style={{ flex: 1, backgroundColor: 'white', }}
        source={require('../../Assets/Login.png')}>

        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 24 + insets.top, paddingBottom: 24 + insets.bottom }} showsVerticalScrollIndicator={false} >

          <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 10 }}>Create Account</Text>
          <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15 }}>Enter your information below</Text>

          <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: 90, height: 90, ...shadow, shadowOpacity: .2, borderRadius: 10, marginBottom: 20, borderColor: '#00000020', borderWidth: 1, backgroundColor: '#f9f9f9' }} >
            <Image
              source={selectedImage}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, resizeMode: 'cover', width: 90, height: 90, borderRadius: 10, }} />

            {/* {!selectedImage && <Text style={{ color: Colors.borderColor, fontSize: 12, position: 'absolute', left: 0, right: 0, bottom: 10, textAlign: 'center' }}>Add Photo</Text>} */}

            <Icon
              onPress={() => launchImageLibrary({}, onImageSelected)}
              name={selectedImage ? 'refresh' : 'add-photo-alternate'}
              color={selectedImage ? 'white' : Colors.pinkColor}
              size={selectedImage ? 35 : 40}
              containerStyle={{ width: '100%', height: '100%', backgroundColor: selectedImage ? '#00000050' : 'transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} />

          </View>

          <ControlledInput
            label={'First Name'}
            leftIconProps={{ name: 'person' }}
            textInputProps={{ placeholder: 'Jane', }}
            controllerProps={{ name: 'first_name', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'Last Name'}
            leftIconProps={{ name: 'person' }}
            textInputProps={{ placeholder: 'Doe', }}
            controllerProps={{ name: 'last_name', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'Email Address'}
            leftIconProps={{ name: 'email' }}
            textInputProps={{ placeholder: 'example@domain.com', keyboardType: 'email-address', autoCapitalize: 'none' }}
            controllerProps={{ name: 'email', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'User Name'}
            leftIconProps={{ name: 'edit' }}
            textInputProps={{ placeholder: 'example_username', autoCapitalize: 'none' }}
            controllerProps={{ name: 'username', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'Password'}
            leftIconProps={{ name: 'lock' }}
            rightIconProps={{ name: passwordVisible ? 'visibility-off' : 'visibility', onPress: () => setPasswordVisibility(cv => !cv) }}
            textInputProps={{ placeholder: '_  _  _  _  _  ', secureTextEntry: !passwordVisible }}
            controllerProps={{ name: 'password', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <CustomButton onPress={handleSubmit(onSubmit)} label={'SIGN UP'} containerStyle={{ padding: 20, marginBottom: 20 }} />

          <View style={{ justifyContent: 'flex-end', flex: 1, alignItems: 'flex-end' }}>
            <Text
              activeOpacity={0.9}
              style={{ color: Colors.darkGrey, textAlign: 'center', fontSize: 14, alignSelf: 'center', }}
              onPress={() => navigation.navigate('Login')}>Already an account? <Text style={{ color: Colors.pinkColor }}>Sign In</Text> </Text>
          </View>
        </ScrollView>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
