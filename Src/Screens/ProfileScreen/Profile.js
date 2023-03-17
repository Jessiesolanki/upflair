
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, StatusBar, useWindowDimensions, Dimensions } from 'react-native';
import Colors from '../../Assets/Colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import ControlledInput from '../../Components/ControlledInput';
import { Avatar, Icon } from 'react-native-elements';
import { BASE_URL } from '../../Providers';
import CustomButton from '../../Components/CustomButton';
import { getInitials } from '../../Utils/Utility';

const Profile = ({ navigation }) => {

  const [selectedImage, setSelectedImage] = useState()
  const insets = useSafeAreaInsets()

  const { updateProfile, userData } = useContext(AuthContext)

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

  useEffect(() => {
    reset(userData)
  }, [userData])

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => StatusBar.setBarStyle('light-content'))
    const blurListener = navigation.addListener('blur', () => StatusBar.setBarStyle('dark-content'))
    return () => {
      focusListener()
      blurListener()
    }
  }, [])

  const onSubmit = data => {
    if (selectedImage) data = { ...data, 'profile-file': selectedImage }
    updateProfile(data)
  }

  const onImageSelected = res => {
    if (!res || res?.didCancel) return
    setSelectedImage(res.assets[0])
  }

  return (
    <KeyboardAvoidingView
     behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} style={{ flex: 1, backgroundColor: Colors.pinkColor }}
     >
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: Dimensions.get('screen').height / 2, backgroundColor: 'white' }} />

      <ScrollView style={{}} contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }} showsVerticalScrollIndicator={false} >

        <View style={{ backgroundColor: Colors.pinkColor, padding: 24, paddingTop: 24 + insets.top, alignItems: 'center', }} >
          <View>
            <Avatar
              rounded
              size={80}
              title={getInitials(userData?.first_name+' '+userData?.last_name)}
              containerStyle={{ borderWidth: 2, borderColor: Colors.white }}
              source={selectedImage ? selectedImage : (userData?.profile_image ? { uri: BASE_URL + userData?.profile_image } : null)} />

            <Icon
              onPress={() => launchImageLibrary({}, onImageSelected)}
              color={Colors.pinkColor}
              size={12}
              iconStyle={{ padding: 5 }}
              containerStyle={{ position: 'absolute', borderRadius: 30, backgroundColor: Colors.white, bottom: 2, right: 2 }}
              name='edit' />
          </View>

          <Text style={{ paddingTop: 10, fontWeight: 'bold', color: Colors.white, fontSize: 18 }} >{userData?.first_name} {userData?.last_name}</Text>
        </View>

        <View style={{ padding: 24 }} >
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
            label={'User Name'}
            leftIconProps={{ name: 'edit' }}
            textInputProps={{ placeholder: 'example_username', autoCapitalize: 'none', editable: false }}
            controllerProps={{ name: 'username', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <ControlledInput
            label={'Email Address'}
            leftIconProps={{ name: 'email' }}
            textInputProps={{ placeholder: 'example@domain.com', keyboardType: 'email-address', autoCapitalize: 'none', editable: false }}
            controllerProps={{ name: 'email', control, errors, rules: { required: true }, }}
            containerStyle={{ marginBottom: 20 }} />

          <CustomButton
            secondary
            onPress={() => navigation.navigate('ShippingAddressList')}
            label={'ADD SHIPPING ADDRESS'}
            containerStyle={{ padding: 20, marginBottom: 20 }} />

          <CustomButton
            secondary
            onPress={() => navigation.navigate('ChangePassword')}
            label={'CHANGE PASSWORD'}
            containerStyle={{ padding: 20, marginBottom: 20 }} />

          <CustomButton
            onPress={handleSubmit(onSubmit)}
            label={'UPDATE'}
            containerStyle={{ padding: 20, marginBottom: 20 }} />

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  )

};
export default Profile;
