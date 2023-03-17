import React, { useContext } from 'react';
import { Text, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import Colors from '../../Assets/Colors';
import CustomButton from '../../Components/CustomButton'
import ControlledInput from '../../Components/ControlledInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../Providers/AuthProvider';

export default Sell = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const { switchAccount, userData } = useContext(AuthContext)

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({ defaultValues: { email: userData.email, username: userData.username }, });

  const onSubmit = data => {
    console.log(data)
    switchAccount()
    navigation.navigate('KycAddress', { kycData: data })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={33} style={{ flex: 1 }} >

      <ImageBackground resizeMode='cover'
        style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 0, paddingBottom: 24 + insets.bottom }}
        source={require('../../Assets/Login.png')}>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >

          <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 10 }}>Profile Detail</Text>
          <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15 }}>You have to fill the KYC details{"\n"}Here is the step 1/3</Text>

          <ControlledInput
            label={'Email Address'}
            leftIconProps={{ name: 'email' }}
            textInputProps={{ placeholder: 'example@domain.com', keyboardType: 'email-address', autoCapitalize: 'none' }}
            controllerProps={{ name: 'email', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'User Name'}
            leftIconProps={{ name: 'account-circle' }}
            textInputProps={{ placeholder: 'Please insert user name', }}
            controllerProps={{ name: 'username', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <CustomButton onPress={handleSubmit(onSubmit)} label={'NEXT'} containerStyle={{ padding: 20 }} />
        </ScrollView>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
