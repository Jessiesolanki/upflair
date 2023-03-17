import React, { useContext } from 'react';
import { Text, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, DeviceEventEmitter } from 'react-native';
import { useForm } from 'react-hook-form';
import Colors from '../../Assets/Colors';
import CustomButton from '../../Components/CustomButton'
import ControlledInput from '../../Components/ControlledInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../Providers/AuthProvider';
import { EVENTS } from '../../Hooks/useDeviceEventEmitter';

export default KycAddAccount = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const { updateKycData } = useContext(AuthContext)

  const onSubmit = data => {
    let Shipdata =  { ...data, ...route.params?.kycData }
    Shipdata.country_id='233'
    // return  navigation.navigate('AddProducts')
    console.log(JSON.stringify(Shipdata),'ooooip')

    updateKycData({
      params: Shipdata,
      onSuccess: (res) => {

        if (res?.data?.status) {
          navigation.navigate('AddNewProduct')
          DeviceEventEmitter.emit(EVENTS.USER_DATA_UPDATED)
        } else {
          alert(res.data.message)
        }

      }
    })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={33} style={{ flex: 1 }} >

      <ImageBackground resizeMode='cover'
        style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 0, paddingBottom: 0 }}
        source={require('../../Assets/Login.png')}>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >

          <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 10 }}>Account Detail</Text>
          <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15 }}>You have to fill the KYC details{"\n"}Here is the step 3/3</Text>

          <ControlledInput
            label={'Account Number'}
            leftIconProps={{ name: 'account-balance' }}
            textInputProps={{ placeholder: 'Enter Account Number' }}
            controllerProps={{ name: 'account_no', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'Holder Name'}
            leftIconProps={{ name: 'badge' }}
            textInputProps={{ placeholder: 'Enter Holder Name' }}
            controllerProps={{ name: 'account_holder_name', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'Routing Number'}
            leftIconProps={{ name: 'source' }}
            textInputProps={{ placeholder: 'Enter Routing Number' }}
            controllerProps={{ name: 'routing_no', control, errors, rules: { required: true, minLength: 9, maxLength: 9 }, }}
            containerStyle={{ marginBottom: 20 }} />

          <CustomButton onPress={handleSubmit(onSubmit)} label={'NEXT'} containerStyle={{ padding: 20, marginBottom: 24 }} />

        </ScrollView>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
