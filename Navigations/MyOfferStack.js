
import 'react-native-gesture-handler';

import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { DrawerActions, NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageBig from '../Src/Screens/ManageBidScreens/ManageBid';
import BidStatus from '../Src/Screens/ManageBidScreens/BidStatus';
import Checkout from '../Src/Screens/ManageBidScreens/Checkout';
import ImageIcon from '../Src/Components/ImageIcon';
import Colors from '../Src/Assets/Colors';
import MyOffers from '../Src/Screens/HomeScreens/MyOffers';
import OfferDetails from '../Src/Screens/HomeScreens/OfferDetails';
import ShippingAddressList from '../Src/Screens/ProfileScreen/ShippingAddressList';
import AddShippingAdsress from '../Src/Screens/ProfileScreen/AddShippingAdsress';
import Payment from '../Src/Screens/HomeScreens/Payment';
import CounterOffer from '../Src/Screens/HomeScreens/CounterOffer';
import PaymentMethod from '../Src/Screens/ProfileScreen/PaymentMethod';
const Stack = createNativeStackNavigator();

const MyOfferStack = () => {
    const navigation = useNavigation()
    return (
        <Stack.Navigator
            screenOptions={{
                headerLeft: () => <ImageIcon containerStyle={{ marginRight: 15 }} onPress={() => navigation.dispatch(StackActions.pop())} name={'back'} />,
                // headerRight: 

            }} >
            <Stack.Screen
                name="My Offers"
                options={{ headerLeft: () => <ImageIcon size={22} containerStyle={{ marginRight: 15 }} color={Colors.pinkColor} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} name={'menu'} />, }}
                component={MyOffers} />

            <Stack.Screen
                name="OfferDetails"
                component={OfferDetails}
                options={{
                    headerShadowVisible: true,
                    title: 'Offer Details'
                }}
            />

            <Stack.Screen
                name="CounterOffer"
                component={CounterOffer}
                options={{
                    headerShadowVisible: true,
                    title: 'Counter Offer',
                }}
            />

            <Stack.Screen
                name="Bid Status"
                component={BidStatus}
                options={{
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{
                    headerShadowVisible: false,
                }}
            />

            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{
                    title: 'Select Payment'
                }}
            />

            <Stack.Screen
                name="ShippingAddressList"
                component={ShippingAddressList}
                options={{
                    title: 'Shipping Address',
                }}
            />
                 {/* <Stack.Screen
                name="PaymentMethod"
                component={PaymentMethod}
                options={{
                    title: 'Payment Method',
                }}
            /> */}

       
            <Stack.Screen
                name="AddShippingAddress"
                component={AddShippingAdsress}
                options={{
                    title: 'Add Shipping Address',
                }}
            />
        </Stack.Navigator>
    );
};


export default MyOfferStack;