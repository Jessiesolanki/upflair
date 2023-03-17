import React, { useContext, useEffect } from 'react';
import { Text, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import Colors from '../../Assets/Colors';
import CustomButton from '../../Components/CustomButton'
import ControlledInput from '../../Components/ControlledInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomPicker from '../../Components/CustomPicker';
import { AuthContext } from '../../Providers/AuthProvider';

export default KycAddress = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()

  const { states, userData } = useContext(AuthContext)

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      state_id: userData?.user_addresses?.[0]?.state_id,
      city : userData?.user_addresses?.[0]?.city,
      address : userData?.user_addresses?.[0]?.address_line_one,
      zip_code : userData?.user_addresses?.[0]?.zip_code
    }
  });

  useEffect(() => {
    reset({ country: 'USA' })
  }, [])

  const onSubmit = data => {
    console.log(data)
    navigation.navigate('KycAddAccount', { kycData: { ...data, ...route.params?.kycData } })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={33} style={{ flex: 1 }} >

      <ImageBackground resizeMode='cover'
        style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 0, paddingBottom: 0 }}
        source={require('../../Assets/Login.png')}>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >

          <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 10 }}>Address</Text>
          <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15 }}>You have to fill the KYC details{"\n"}Here is the step 2/3</Text>

          <ControlledInput
            label={'Country'}
            disabled
            leftIconProps={{ name: 'flag' }}
            textInputProps={{ placeholder: 'Enter Country' }}
            controllerProps={{ name: 'country', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <CustomPicker
            options={states.map(state => ({ ...state, label: state.name, value: state.id }))}
            controllerProps={{ name: 'state_id', control, errors, rules: { required: true }, }}
            label={'State'}
            leftIconProps={{ name: 'place' }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'City'}
            leftIconProps={{ name: 'location-city' }}
            textInputProps={{ placeholder: 'Enter City' }}
            controllerProps={{ name: 'city', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'Address'}
            leftIconProps={{ name: 'place' }}
            textInputProps={{ placeholder: 'Enter Address' }}
            controllerProps={{ name: 'address', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'Zip Code'}
            leftIconProps={{ name: 'subtitles' }}
            textInputProps={{ placeholder: 'Enter Zip Code' }}
            controllerProps={{ name: 'zip_code', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <CustomButton onPress={handleSubmit(onSubmit)} label={'NEXT'} containerStyle={{ padding: 20, marginBottom: 24 }} />

        </ScrollView>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
