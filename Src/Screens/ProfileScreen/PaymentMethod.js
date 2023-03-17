
import React, { useContext, useMemo, useState, useImperativeHandle, forwardRef, useRef ,useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, DeviceEventEmitter, Modal, Image,FlatList } from "react-native";
import Colors from '../../Assets/Colors';
import { getInitials } from "../../Utils/Utility";
import { useQuery } from "react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "react-query";
import CustomButton from "../../Components/CustomButton";
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Providers/AuthProvider';
import { CheckBox, Icon } from 'react-native-elements';
import { EVENTS } from '../../Hooks/useDeviceEventEmitter';
import { useNavigation } from '@react-navigation/native';
import { OrderContext } from "../../Providers/OrderProvider";
import mastercard from '../../Assets/images/mastercaed.png';
import visacaed from '../../Assets/images/visacard.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ControlledInput from "../../Components/ControlledInput";
import closeIcon from '../../../Src/Assets/close.png'
const PaymentMethod = () => {

  const navigation = useNavigation()
  const { userData, selectAddress, deleteAddress } = useContext(AuthContext)
  const { paymentList,listOfPayMethodOfUser } = useContext(OrderContext)   
  const [cardDetails ,setCardDetails]= useState(false)
  const { data: havePayment,refetch } = useQuery( listOfPayMethodOfUser);
  console.log(JSON.stringify(userData, null, 2))
  const Modalref = useRef()
  const AddressItem = ({ item ,index }) => {
console.log(paymentList.data.data[0].id,'paymentListpaymentListpaymentList')
    const onSelect = async(e) => {
       
      await AsyncStorage.setItem('payment_id',e)
      navigation.goBack()
    //   selectAddress({
    //     params: { id: item.id },
    //     onSuccess: () =>{ 
    //       navigation.goBack()
    //       DeviceEventEmitter.emit(EVENTS.USER_DATA_UPDATED)
    //     }
    //   })
    }

    const onDelete = () => {
      deleteAddress({
        params: { id: item.id },
        onSuccess: () => DeviceEventEmitter.emit(EVENTS.USER_DATA_UPDATED)
      })
    }

    const onUpdate = () =>{
      navigation.navigate('AddShippingAddress', {address : item})
    }

    console.log(navigation.getState())

    return (
      <View style={{ flex: 1, width: '100%', marginRight: 15, height: '100%', borderWidth: 1, borderColor: Colors.black30, borderRadius: 10, padding: 10, }}>

        {/* <Text style={{ fontSize: 16, textAlign: 'left', marginBottom: 5, fontWeight: '500' }} >{item?.card?.last4}</Text> */}
        {  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginBottom:13 }} >
                <Image source={ item?.card?.brand == 'visa' ? visacaed : mastercard} style={{ height: "100%", width: '13%', resizeMode: 'cover' ,borderRadius:8}} />
                <Text style={{ lineHeight: 20, marginLeft: 7, flex: 2 }}>{`****${item?.card?.last4 == undefined ? '4242':paymentList?.data?.data[0]?.card?.last4}`}</Text>
                
                    {/* {!submitted && <CustomButton onPress={() => navigation.navigate('PaymentMethod')} secondary label={selectedAddress ? 'Change' : 'Select an Address'} containerStyle={{ flex: 1, height: 40, justifyContent: 'center', padding: 0, paddingHorizontal: 30 }} />} */}
                </View> }
        <CheckBox
          onPress={()=>onSelect(item.id)}
          checkedColor={Colors.pinkColor}
          textStyle={{ fontWeight: 'normal' }}
          containerStyle={{ marginBottom: -5, marginLeft: -5, marginRight: -5, borderRadius: 5 }}
          title={'Use as the shipping address'}
        //  checked={check}
           />

        {/* <View style={{ position: 'absolute', right: 14, bottom: 18, flexDirection: 'row', alignItems: 'center' }} >
          <Icon
            size={20}
            onPress={onUpdate}
            color={Colors.black50}
            containerStyle={{}}
            name='edit' />
          <View style={{ width: 1, alignSelf: 'stretch', marginHorizontal: 5, backgroundColor: Colors.black30 }} />
          <Icon
            size={20}
            onPress={onDelete}
            color={Colors.black50}
            containerStyle={{}}
            name='delete-forever' />
        </View> */}
      </View>

    );
  };

  const AddBtn = () => (
    <TouchableOpacity
    onPress={() => Modalref?.current?.showModal()}
      style={{ padding: 20, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.black20, marginTop: 15 }} >

      <Image
        resizeMode='contain'
        style={{ width: 40, height: 40, borderRadius: 20 }}
        source={require('../../Assets/p_plus.png')} />
    </TouchableOpacity>
  )

  return (
    <>
    <ModalReference cardDetails={({data,params})=>{
        setCardDetails(params)
        refetch()
    }} ref={Modalref} />
    <FlatList
      ListFooterComponent={AddBtn}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      contentContainerStyle={{ padding: 15, backgroundColor: Colors.white, flexGrow: 1 }}
      style={{ backgroundColor: 'white' }}
      data={paymentList?.data?.data}
      renderItem={AddressItem} />

</>
  );
};

export default PaymentMethod;
const PopupModal = ({ cardDetails }, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { attachPMToUser } = useContext(OrderContext)

    const mutation = useMutation({
    mutationFn:attachPMToUser,
        onSuccess: (newPost) => {
            cardDetails(newPost)
            cancelModal()
        },
        onError: (error, variables, context) => {
            // An error happened!
            console.log(`rolling back optimistic update with id ${context.id}`)
          },
      }
)


  
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm();

    const showModal = () => setModalVisible(true)

    const cancelModal = () => setModalVisible(false)

    useImperativeHandle(ref, () => ({
        showModal,
        cancelModal
    }))

    const onModalComplete = (details) => {
      console.log(details,'detailsdetailsdetailsdetails')
        mutation.mutate(details)
        // cancelModal()
    }
    
    //! {
    //!     "card_number": "4242424242424242",
    //!     "exp_month": 8,
    //!     "exp_year": 2023,
    //!     "cvc": 314
    //!   }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() =>setModalVisible(!modalVisible)}>
            <View style={{ flex: 1, backgroundColor: '#00000030', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', width: "90%", padding: 20, borderRadius: 24 }}>
                    <TouchableOpacity onPress={cancelModal} style={{ height: 13, width: 13, marginBottom: 15, alignSelf: 'flex-end', marginRight: 6 }} >
                        <Image source={closeIcon} style={{ height: "100%", width: '100%', resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <ControlledInput
                        label={"Card Number"}
                        textInputProps={{ placeholder: "Enter Card Number" , keyboardType:'number-pad'}}
                        controllerProps={{
                            name: "card_number",
                            control,
                            errors,
                            rules: { required: true ,minLength: 15},
                        }}
                        containerStyle={{ marginBottom: 20 }}
                    />

                    <ControlledInput
                        label={"Expiry Month"}
                        textInputProps={{ placeholder: "Enter Expiry Month", keyboardType:'number-pad' }}
                        controllerProps={{
                            name: "exp_month",
                            control,
                            errors,
                            rules: { required: true },
                        }}
                        containerStyle={{ marginBottom: 20 }}
                    />

                    <ControlledInput
                        label={"Expiry Year"}
                        textInputProps={{ placeholder: "Enter Expiry Year", keyboardType:'number-pad' }}
                        controllerProps={{
                            name: "exp_year",
                            control,
                            errors,
                            rules: { required: true },
                        }}
                        containerStyle={{ marginBottom: 20 }}
                    />

                    <ControlledInput
                        label={"CVC"}
                        textInputProps={{ placeholder: "Enter CVC", keyboardType:'number-pad' }}
                        controllerProps={{
                            name: "cvc",
                            control,
                            errors,
                            rules: { required: true },
                        }}
                        containerStyle={{ marginBottom: 20 }}
                    />

                    <CustomButton secondary={false} onPress={handleSubmit(onModalComplete)} label={'OK'} containerStyle={{}} />
                </View>

            </View>
        </Modal>
    )
}

const ModalReference = forwardRef(PopupModal)