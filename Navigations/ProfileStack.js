
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Src/Screens/ProfileScreen/Profile'
import ShippingAddressList from '../Src/Screens/ProfileScreen/ShippingAddressList';
import AddShippingAddress from '../Src/Screens/ProfileScreen/AddShippingAdsress';
import ChangePassword from '../Src/Screens/ProfileScreen/ChangePassword';
import ImageIcon from '../Src/Components/ImageIcon';
import Colors from '../Src/Assets/Colors';
import PaymentMethod from '../Src/Screens/ProfileScreen/PaymentMethod'
const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator initialRouteName="Profiles">
      <Stack.Screen
        name="Profiles"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShippingAddressList"
        component={ShippingAddressList}
        options={{
          title: 'Shipping Address',
          headerLeft: () => <ImageIcon containerStyle={{marginRight : 15}} color={Colors.pinkColor}
          onPress={() =>{ navigation.navigate('Profiles')}}
            name={'back'} />,
        }}
      />
       <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{
          title: 'Payment Method',
          headerLeft: () => <ImageIcon containerStyle={{marginRight : 15}} color={Colors.pinkColor}
          onPress={() =>{ navigation.navigate('Profiles')}}
            name={'back'} />,
        }}
      />
      <Stack.Screen
        name="AddShippingAddress"
        component={AddShippingAddress}
        options={{
          title: 'Add Shipping Address',
          headerLeft: () => <ImageIcon containerStyle={{marginRight : 15}} color={Colors.pinkColor}
            onPress={() => navigation.navigate('ShippingAddressList')}
            name={'back'} />,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


export default ProfileStack;