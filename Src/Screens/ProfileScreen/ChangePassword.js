import React, { useContext, useState } from 'react';
import { Text, ImageBackground, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, Image, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import Colors from '../../Assets/Colors';
import CustomButton from '../../Components/CustomButton'
import ControlledInput from '../../Components/ControlledInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../Providers/AuthProvider';
import { Icon } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import { shadow } from '../../Assets/Styles';
import ImageIcon from '../../Components/ImageIcon';

export default ChangePassword = ({ navigation }) => {
  const [passwordVisible, setPasswordVisibility] = useState(false)
  const insets = useSafeAreaInsets()

  const { changePassword } = useContext(AuthContext)

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const onSubmit = data => {
    if(data.newpwd!=data.confirmpwd) return Alert.alert('Change Password', "Password confirmation doesn't match")
    changePassword({
      params : data,
      onSuccess : ()=>navigation.goBack()
    })
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} style={{ flex: 1 }} >

      <ImageBackground resizeMode='cover'
        style={{ flex: 1, backgroundColor: 'white', }}
        source={require('../../Assets/Login.png')}>

        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 24 + insets.top, paddingBottom: 24 + insets.bottom }} showsVerticalScrollIndicator={false} >

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }} >
            <ImageIcon containerStyle={{ marginRight: 15 }} onPress={() => navigation.goBack()} name={'back'} />
            <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 10 }}>Change Password</Text>
          </View>

          <ControlledInput
            label={'Old Password'}
            leftIconProps={{ name: 'lock' }}
            rightIconProps={{ name: passwordVisible ? 'visibility-off' : 'visibility', onPress: () => setPasswordVisibility(cv => !cv) }}
            textInputProps={{ placeholder: '* * * * * *', secureTextEntry: !passwordVisible }}
            controllerProps={{ name: 'oldpwd', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'New Password'}
            leftIconProps={{ name: 'lock' }}
            rightIconProps={{ name: passwordVisible ? 'visibility-off' : 'visibility', onPress: () => setPasswordVisibility(cv => !cv) }}
            textInputProps={{ placeholder: '* * * * * *', secureTextEntry: !passwordVisible }}
            controllerProps={{ name: 'newpwd', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'Confirm Password'}
            leftIconProps={{ name: 'lock' }}
            rightIconProps={{ name: passwordVisible ? 'visibility-off' : 'visibility', onPress: () => setPasswordVisibility(cv => !cv) }}
            textInputProps={{ placeholder: '* * * * * *', secureTextEntry: !passwordVisible }}
            controllerProps={{ name: 'confirmpwd', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <CustomButton onPress={handleSubmit(onSubmit)} label={'SIGN UP'} containerStyle={{ padding: 20, marginBottom: 20 }} />

        </ScrollView>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
