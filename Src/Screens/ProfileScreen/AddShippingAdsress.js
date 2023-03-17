import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, ScrollView, DeviceEventEmitter } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomButton from '../../Components/CustomButton'
import ControlledInput from '../../Components/ControlledInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../Providers/AuthProvider';
import CustomPicker from '../../Components/CustomPicker';
import { EVENTS } from '../../Hooks/useDeviceEventEmitter';

export default AddShippingAddress = ({ navigation, route }) => {
    const [cities, setCities] = useState([])

    const address = route.params?.address

    const { addShippingAddress, states, getCities,updateAddress } = useContext(AuthContext)

    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: address ? {
            ...address,
            state: parseInt(address.state_id),
            address: address.address_line_one
        } : null
    });

    const selectedState = watch('state')

    useEffect(() => {
        console.log(selectedState)
        getCities({ state_id: selectedState }, setCities)
    }, [selectedState])

    const onSubmit = data => {
        //if there is an address passed to this screen it means the user wants to update
        if(address){
            updateAddress({
                params : data,
                onSuccess : ()=>{
                    navigation.goBack()
                    DeviceEventEmitter.emit(EVENTS.USER_DATA_UPDATED)
                }
            })
        } else {
            addShippingAddress(data, () => {
                navigation.goBack()
                DeviceEventEmitter.emit(EVENTS.USER_DATA_UPDATED)
            })
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} style={{ flex: 1 }} >

            <ImageBackground resizeMode='cover'
                style={{ flex: 1, backgroundColor: 'white', }}
                source={require('../../Assets/Login.png')}>

                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }} showsVerticalScrollIndicator={false} >

                    <CustomPicker
                        options={states.map(state => ({ ...state, label: state.name, value: state.id }))}
                        controllerProps={{ name: 'state', control, errors, rules: { required: true }, }}
                        label={'State'}
                        leftIconProps={{ name: 'place' }}
                        containerStyle={{ marginBottom: 20 }} />

                    <ControlledInput
                        label={'City'}
                        leftIconProps={{ name: 'apartment' }}
                        textInputProps={{ placeholder: 'Huston', }}
                        controllerProps={{ name: 'city', control, errors, rules: { required: true }, }}
                        containerStyle={{ marginBottom: 20 }} />

                    <ControlledInput
                        label={'Address'}
                        leftIconProps={{ name: 'home' }}
                        textInputProps={{ placeholder: 'Street 123', }}
                        controllerProps={{ name: 'address', control, errors, rules: { required: true }, }}
                        containerStyle={{ marginBottom: 20 }} />

                    <ControlledInput
                        label={'Zip Code'}
                        leftIconProps={{ name: 'map' }}
                        textInputProps={{ placeholder: '123456', }}
                        controllerProps={{ name: 'zip_code', control, errors, rules: { required: true }, }}
                        containerStyle={{ marginBottom: 20 }} />

                    <CustomButton onPress={handleSubmit(onSubmit)} label={address ? 'UPDATE' : 'SUBMIT'} containerStyle={{ padding: 20, marginBottom: 20 }} />

                </ScrollView>

            </ImageBackground>
        </KeyboardAvoidingView>
    );
};
