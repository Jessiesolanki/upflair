
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Src/Screens/HomeScreens/Home'
import { Text, TouchableOpacity, View } from 'react-native';
import ImageIcon from '../Src/Components/ImageIcon';
import BidProductDetails from '../Src/Screens/HomeScreens/BidProductDetails';
import ProductDetails from '../Src/Screens/HomeScreens/ProductDetails';
import Help from '../Src/Screens/HomeScreens/Help';
import MyCart from '../Src/Screens/HomeScreens/MyCart';
import FindPeople from '../Src/Screens/HomeScreens/FindPeople';
import Contacts from '../Src/Screens/HomeScreens/Contacts';
import Comments from '../Src/Screens/HomeScreens/Comments';
import MakeOffer from '../Src/Screens/HomeScreens/MakeOffer';
import { Icon } from 'react-native-elements';
import OfferDetails from '../Src/Screens/HomeScreens/OfferDetails';
import ShippingAddressList from '../Src/Screens/ProfileScreen/ShippingAddressList';
import AddShippingAdsress from '../Src/Screens/ProfileScreen/AddShippingAdsress';
import Colors from '../Src/Assets/Colors';
import SellerProducts from '../Src/Screens/MyProductScreens/SellerProducts';
import CounterOffer from '../Src/Screens/HomeScreens/CounterOffer';
import PaymentMethod from '../Src/Screens/ProfileScreen/PaymentMethod';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <ImageIcon containerStyle={{ marginRight: 15 }} onPress={() => navigation.dispatch(StackActions.pop())} name={'back'} />
      }}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Bid Product Details"
        component={BidProductDetails}
        options={{
          headerShadowVisible: false,
          headerLeft: () => <ImageIcon containerStyle={{ marginRight: 15 }} onPress={() => navigation.goBack()} name={'back'} />,
          headerRight: () => <ImageIcon name={'chat'} />,
          title: null
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Seller Products"
        component={SellerProducts}
        options={{
          headerShadowVisible: true,
        }}
      />

      <Stack.Screen
        name="MakeOffer"
        component={MakeOffer}
        options={{
          headerShadowVisible: true,
          title: 'Make an Offer'
        }}
      />

      <Stack.Screen
        name="OfferDetails"
        component={OfferDetails}
        options={{
          headerShadowVisible: true,
          title: 'Offer Details',
        }}
      />

     
      {/* CounterOffer */}
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          headerShadowVisible: true,
          title: 'Comments'
        }}
      />

      <Stack.Screen
        name="Help"
        component={Help}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MyCart"
        component={MyCart}
      />


      <Stack.Screen
        name="FindPeople"
        component={FindPeople}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{
          title: 'Payment Method',
        }}
      />
        <Stack.Screen
        name="ShippingAddressList"
        component={ShippingAddressList}
        options={{
          title: 'Shipping Address',
        }}
      />

      <Stack.Screen
        name="AddShippingAddress"
        component={AddShippingAdsress}
        options={{
          title: 'Add Shipping Address',
        }}
      />

      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: 'Select Payment'
        }}
      />

    </Stack.Navigator>
  );
};


export default HomeStack;
