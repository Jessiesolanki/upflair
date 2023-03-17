import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import { useContext, useRef } from "react";
import { Alert } from "react-native";
import Colors from "../Assets/Colors";
import { API } from "../Providers";
import { AuthContext } from "../Providers/AuthProvider";
import { OrderContext } from "../Providers/OrderProvider";
import { waitFor } from "../Utils/Utility";
import useLoadingFn from "./useLoadingFn";


export default useStripePaymentSheet = ({ price, product_id }) => {

    const navigation = useNavigation()
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const paymentIntentId = useRef(null)
    const { addOrder } = useContext(OrderContext)
    const { userData } = useContext(AuthContext)

    const fetchPaymentSheetParams = async () => {

        console.log('ttc----------->', { product_id, price: price * 100, shipping_address_id: userData?.user_addresses?.find(item => item.type == 1)?.id })
        const res = await API.post('payment', { product_id, price: price * 100, shipping_address_id: userData?.user_addresses?.find(item => item.type == 1)?.id })
        console.log('while doing  the payment -------------->', !res?.data?.status)

        if (!res?.data?.status) {
            return alert(res.data.message || 'message')

        } else {
            const { paymentIntent, ephemeralKey, customer } = await res?.data?.data;
            return { paymentIntent, ephemeralKey, customer };
        }


    };


    const initializePaymentSheet = useLoadingFn(async () => {

        const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();



        paymentIntentId.current = paymentIntent.id

        //         // console.log(JSON.stringify(paymentIntentId, null, 2))

        // { error, }
        // initPaymentSheet
        const checkinitPaymentSheet = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent.client_secret,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            // allowsDelayedPaymentMethods: true,
            merchantDisplayName: 'Upflair',
            appearance: {
                colors: {
                    primary: Colors.pinkColor,
                },
                primaryButton: {
                    colors: {
                        text: Colors.white
                    }
                },
            }
        });



    }, { loadingText: 'Initializing Payment' }, true)



    const openPaymentSheet = async () => {
        if (userData?.user_addresses?.length > 0) {

            if (userData?.user_addresses?.filter(item => item.type == 1).length == 0) {
                Alert.alert('Shipping Address', 'Please select a shipping address to continue.', [
                    { text: 'Okay', onPress: () => navigation.navigate('ShippingAddressList') },
                    { text: 'Cancel' }
                ])
            } else {

                initializePaymentSheet({

                    onSuccess: async (res) => {

                        await waitFor(1000)
                        const {error} = await presentPaymentSheet();

                        if (error) {
                            // Alert.alert(error.code, error.message);
                        } else {
                            await waitFor(500)
                            console.log({ price, product_id, paymentIntent_id: paymentIntentId.current }, "addOrder")

                            addOrder({
                                params: { price, product_id, paymentIntent_id: paymentIntentId.current },
                                onSuccess: () => {
                                    navigation.reset({ index: 0, routes: [{ name: 'MyDrawer' }] })
                                    Alert.alert('Success', 'Your order is confirmed!');
                                }
                            })


                        }
                    }
                });
            }
        } else {
            Alert.alert('Shipping Address', 'Please add a shipping address to continue.', [
                { text: 'Okay', onPress: () => navigation.navigate('ShippingAddressList') },
                { text: 'Cancel' }
            ])
        }
    };

    return { openPaymentSheet }




}



