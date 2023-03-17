import { useNavigation } from "@react-navigation/native";
import React, { useContext, useMemo, useState, useImperativeHandle, forwardRef, useRef ,useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, ScrollView, Modal, Image } from "react-native";
import { Avatar } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "react-query";
import Colors from "../../Assets/Colors";
import CustomButton from "../../Components/CustomButton";
import Divider from "../../Components/Divider";
import { IMAGE_BASE_URL } from "../../Constant/BaseURL";
import useStripePaymentSheet from "../../Hooks/useStripePaymentSheet";
import { AuthContext } from "../../Providers/AuthProvider";
import { OrderContext } from "../../Providers/OrderProvider";
import { getInitials } from "../../Utils/Utility";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import closeIcon from '../../../Src/Assets/close.png'
import visacaed from '../../Assets/images/visacard.png'
import mastercard from '../../Assets/images/mastercaed.png'
import ControlledInput from "../../Components/ControlledInput";
import AsyncStorage from "@react-native-async-storage/async-storage";


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

export default OfferDetails = ({ route }) => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const offer = route.params?.offer
    const submitted = offer?.id
    const { submitOffer, updateOffer, getCounterOfferChat, resChatList, listOfPayMethodOfUser,paymentList, setpaymentList } = useContext(OrderContext)
    const { userData } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const { openPaymentSheet } = useStripePaymentSheet({ price: offer.bid_amount, product_id: offer.product.id })
    const BID_ID = offer.id
    const { data, error, isLoading } = useQuery(BID_ID + '', getCounterOfferChat);
    // , error, isLoading
    const { data: havePayment,refetch } = useQuery( listOfPayMethodOfUser);
    const IS_SHOW_BUTTON = havePayment?.length == 0
    const Modalref = useRef()
    const Type = route.params?.type
    const [cardDetails ,setCardDetails]= useState(false)
  const [cardList, setcardList] = useState('')
  console.log(offer?.status,'offer?.statusoffer?.statusoffer?.status',cardDetails)
    const mutation = useMutation(
        async (status) => await updateOffer({ id: route.params?.offer?.id, status: status }), {
        onSuccess: () => {
            navigation.goBack()
            queryClient.invalidateQueries(['buyer', 'bids'])
        },
        onError: () => console.log('er')
    })
    const cardlistmutation = useMutation(
        async (status) => await listOfPayMethodOfUser({ }), {
        onSuccess: (params) => {
           
        },
        onError: () => console.log('er')
    })
   
  //  console.log(id,'ididid')
  useEffect(() => {
    cardlistmutation.mutate()
 }, [])
    const onSubmit = async() => {
        const id = await AsyncStorage.getItem('payment_id')
console.log(id,  offer.product.id,  offer.product.user_id,offer.bid_amount, userData.user_addresses?.[0]?.id,'oooooooooooooooooooooooooo')
        if (submitted) {
            mutation.mutate("2")
        } else {
            if (userData?.user_addresses?.length > 0) {
                if (userData?.user_addresses?.filter(item => item.type == 1).length == 0) {
                    Alert.alert('Shipping Address', 'Please select a shipping address to continue.', [
                        { text: 'Okay', onPress: () => navigation.navigate('ShippingAddressList') },
                        { text: 'Cancel' }
                    ])
                } else {
                    submitOffer({
                        params: { product_id: offer.product.id, seller_id: offer.product.user_id, bid_amount: offer.bid_amount, shipping_address_id: userData.user_addresses?.[0]?.id },
                        onSuccess: () => navigation.reset({ index: 0, routes: [{ name: 'MyDrawer' }] }),
                    })
                }
            } else {
                Alert.alert('Shipping Address', 'Please add a shipping address to continue.')
            }
        }
    }

    const selectedAddress = useMemo(() => userData?.user_addresses?.find(item => item.type == 1), [userData])

    const ChatLayout = () => {

        const CHAT_SIDES = {
            SELLER: 'seller',
            BUYER: 'buyer'
        }

        //! const chatList = useMemo(() => {
        //!     const list = [
        //!         { username: 'seller', text: 'listed item at $' + offer?.product?.price?.toFixed(2), side: CHAT_SIDES.SELLER },
        //!         { username: 'buyer', text: 'offered $' + offer?.bid_amount?.toFixed(2), side: CHAT_SIDES.BUYER },
        //!     ]

        //!     //! if (offer.status == 1) list.push({ username: 'seller', text: 'accepted $' + offer?.bid_amount?.toFixed(2), side: CHAT_SIDES.SELLER })
        //!     //! if (offer.status == 2) list.push({ username: 'buyer', text: 'cancelled offer', side: CHAT_SIDES.BUYER })
        //!     //! if (offer.status == 3) list.push({ username: 'seller', text: 'declined your offer', side: CHAT_SIDES.SELLER })

        //!     console.log(list.length)
        //!     return list
        //! }, [offer])



        const ChatItem = ({ item, index }) => {

            const isListedMessage = index == 0 ? 'You listed item at ' : index == 1 ? 'You offer item at' : "You counter offer  at"

            const USER_NAME = index == 0 ? offer.user.username : ''

            const IS_USER = userData.id == item.user_id

            const TYPE_MESSAGE = Type == 'seller' ? item?.user?.username + ' offer at' : 'listed item at'

            return (
                <View style={{ flexDirection: IS_USER ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: 10, }} >
                    <Avatar
                        size={35}
                        rounded
                        title={getInitials(item.username)}
                        containerStyle={{ backgroundColor: Colors.pinkColor }}
                        source={item?.user?.profile_image ? { uri: IMAGE_BASE_URL + item?.user?.profile_image } : null}
                    />
                    <View style={{ padding: 10, borderRadius: 5, backgroundColor: IS_USER ? Colors.pinkColor : Colors.black20, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} >
                        <Text style={{ color: IS_USER ? Colors.white : Colors.pinkColor, paddingRight: 5, fontWeight: 'bold' }} >{IS_USER ? isListedMessage : USER_NAME}</Text>
                        <Text style={{ color: IS_USER ? Colors.white : Colors.blackColor }} >{`${IS_USER ? '$ ' + item.offer_price : TYPE_MESSAGE + ' $' + item.offer_price}`}</Text>
                    </View>
                </View>
            )
        }



        const ActionButton = ({ style, tittle, onPress, enable }) => (
            <TouchableOpacity onPress={onPress} style={{ backgroundColor: enable ? '#2e84b2' : 'transparent', borderColor: '#bfbfbf', borderRadius: 5, borderWidth: 1, flex: 1, justifyContent: 'center', alignItems: 'center', ...style }}>
                <Text style={enable && { color: 'white' }}>{tittle}</Text>
            </TouchableOpacity>
        )

        const ButtonsRow = () => {
            const [buttonState, setButtonState] = useState(-1)
            return (
                <View style={{ height: 50, flexDirection: 'row', marginTop: 10, marginBottom: 40 }}>
                    <ActionButton enable={buttonState == 1} onPress={() => {
                        mutation.mutate('3')
                        setButtonState(1)
                    }} tittle='Decline' />
                    <ActionButton enable={buttonState == 2} onPress={() => {
                        // CounterOffer
                        navigation.navigate('CounterOffer', { BID_ID })
                        setButtonState(2)

                    }} tittle='Counter' style={{ marginHorizontal: '4%' }} />
                    <ActionButton enable={buttonState == 3} onPress={() => { setButtonState(3) }} tittle='Accept' />
                </View>
            )
        }

        // snapToEnd={()=>{
        //     console.log('this is the end')
        // }}


        if (!submitted) return null
        return (
            <>

                <Divider text={'STATUS'} containerStyle={{ marginHorizontal: -15 }} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View  >

                        {[{
                            "id": 4,
                            "offer_price": offer?.product?.price?.toFixed(2),
                            "offered_by": "buyer",
                            "status": 0,
                            "updatedAt": "2023-01-24T05:27:12.000Z",
                            "user": {
                                profile_image: offer.user.profile_image
                            },
                            "user_id": route.params?.type == 'buyer' ? -2 : userData.id
                        }, ...resChatList]?.map((item, index) => <ChatItem key={index} item={item} index={index} />)}
                    </View>

                    <ButtonsRow />
                    {/* <Divider text={'STATUS'} containerStyle={{ marginHorizontal: -15 }} /> */}

                </ScrollView>
            </>
        )
    }








    return (
        <View style={{ flex: 1, backgroundColor: Colors.white, padding: 15, paddingBottom: (submitted ? insets.bottom : 15) + 15 }} >
            <ModalReference cardDetails={({data,params})=>{
                setCardDetails(params)
                refetch()
            }} ref={Modalref} />
            <View style={{ flexDirection: 'row' }} >
                <FastImage
                    style={{ height: 65, width: 65, borderRadius: 5, marginRight: 15 }}
                    source={{ uri: IMAGE_BASE_URL + offer?.product?.product_imgs[0]?.product_img }} />

                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500', paddingBottom: 7 }} >{offer.product.product_name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                        {offer?.product?.size?.size && <Text style={{ color: Colors.black50, paddingRight: 20 }} >Size: <Text style={{ color: Colors.blackColor, fontWeight: '500' }} >{offer.product?.size?.size}</Text></Text>}
                    </View>
                </View>
            </View>

            <Divider />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }} >
                <Text>Offer Price</Text>
                <Text>${offer?.bid_amount?.toFixed(2)}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15 }} >
                <Text>Shipping</Text>
                <Text>FREE</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 6 }} >
                <Text style={{ fontSize: 16, fontWeight: '600' }} >Net Charged</Text>
                <Text style={{ fontSize: 16, fontWeight: '600' }} >${offer?.bid_amount?.toFixed(2)}</Text>
            </View>

            {!IS_SHOW_BUTTON &&paymentList?.data?.data.length == 0 && <CustomButton secondary={submitted} onPress={() => Modalref?.current?.showModal()} label={'Add Details'} containerStyle={{marginVertical:10,marginTop:25}} />}
            {paymentList?.data?.data.length !==0  && <View>
                <Divider text={'PAYMENT'} containerStyle={{ marginHorizontal: -15 }} />
           {  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginBottom:13 }} >
                <Image source={ paymentList?.data?.data[0]?.card?.brand == 'visa' ? visacaed : mastercard} style={{ height: "75%", width: '13%', resizeMode: 'cover' ,borderRadius:8}} />
                <Text style={{ lineHeight: 20, marginLeft: 7, flex: 2 }}>{`****${paymentList?.data?.data[0]?.card?.last4 == undefined ? '4242':paymentList?.data?.data[0]?.card?.last4}`}</Text>
                
                    {!submitted && <CustomButton onPress={() => navigation.navigate('PaymentMethod')} secondary label={selectedAddress ? 'Change' : 'Select an Address'} containerStyle={{ flex: 1, height: 40, justifyContent: 'center', padding: 0, paddingHorizontal: 30 }} />}
                </View> }
            </View>}
            {!submitted && <View>
                <Divider text={'SHIP TO'} containerStyle={{ marginHorizontal: -15 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    {selectedAddress && <Text style={{ lineHeight: 20, marginRight: 50, flex: 2 }} >
                        {userData.first_name + ' ' + userData.last_name}{'\n'}
                        {selectedAddress.address_line_one}, {selectedAddress.city}, {selectedAddress.zip_code}
                    </Text>}
                    {!submitted && <CustomButton onPress={() => navigation.navigate('ShippingAddressList')} secondary label={selectedAddress ? 'Change' : 'Select an Address'} containerStyle={{ flex: 1, height: 40, justifyContent: 'center', padding: 0, paddingHorizontal: 30 }} />}
                </View>
                <Text style={{ color: Colors.black50, textAlign: 'center', fontSize: 12, marginTop: 10 }} >All offers expire within 24 hours. If the seller accepts, payments will be processed. If applicable, tax is estimated based on the offer and may vary based on the final order price.</Text>
            </View>}

            <ChatLayout />

            <View style={{ marginTop: 'auto' }} >
                {offer?.status == 1 && <CustomButton onPress={openPaymentSheet} label={'Continue to Payment'} containerStyle={{}} />}
                {offer?.status == 1 && <View style={{ height: 15 }} />}
                {(offer?.status || 0) < 2 && paymentList?.data?.data.length !==0 &&!submitted && <CustomButton secondary={submitted} onPress={onSubmit} label={submitted ? 'Cancel Offer' : 'Submit Offer'} containerStyle={{}} />}
            </View>

        </View>
    )

}


const dummyProduct = {
    "id": 4513,
    "product_name": "Wall paintings",
    "description": "Putting some description here",
    "product_size_id": "1",
    "product_color_id": "48",
    "product_category_id": 38,
    "product_subcat_id": 13,
    "product_brand_id": 8,
    "user_id": 56,
    "price": 225,
    "bid_request": null,
    "is_approved": 0,
    "status": 1,
    "quantity": 1,
    "is_active": 1,
    "is_deleted": 0,
    "createdAt": "2022-04-15T09:27:50.000Z",
    "updatedAt": "2022-04-26T08:54:37.000Z",
    "product_imgs": [
        {
            "id": 74,
            "product_id": 4513,
            "product_img": "uploads/product/1649053459459--2.jpg",
            "createdAt": "2022-04-04T06:24:19.000Z",
            "updatedAt": "2022-04-04T06:24:19.000Z"
        }
    ],
    "size": {
        "id": 1,
        "size": "XS",
        "createdAt": "2022-03-12T06:48:36.000Z",
        "updatedAt": "2022-03-12T06:48:36.000Z"
    },
    "brand": {
        "id": 8,
        "brand_name": "Adidas",
        "brand_image": "uploads/brand/1648802114724--download.png",
        "status": true,
        "createdAt": "2022-04-01T08:34:25.000Z",
        "updatedAt": "2022-04-01T08:35:14.000Z"
    },
    "category": {
        "id": 38,
        "category_name": "Bedroom",
        "category_image": "uploads/category/1650442182263--Bedroom%20image.jpg",
        "status": true,
        "commission": 50,
        "createdAt": "2022-04-20T08:09:43.000Z",
        "updatedAt": "2022-06-16T05:17:48.000Z"
    },
    "color": {
        "id": 48,
        "COL_1": "beige",
        "COL_2": "Beige",
        "COL_3": "#f5f5dc",
        "COL_4": 245,
        "COL_5": 245,
        "COL_6": 220,
        "createdAt": null,
        "updatedAt": null
    },
    "user_carts": [],
    "sub_category": null,
    "bid_requests": [],
    "user_wishlist_or_favourites": []
}