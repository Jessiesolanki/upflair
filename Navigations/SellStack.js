
import 'react-native-gesture-handler';

import * as React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageIcon from '../Src/Components/ImageIcon';
import Sell from '../Src/Screens/SellScreens/Sell';
import KycAddress from '../Src/Screens/SellScreens/KycAddress';
import KycAddAccount from '../Src/Screens/SellScreens/KycAddAccount';
import AddNewProduct from '../Src/Screens/MyProductScreens/AddNewProduct';
import AddShipping from '../Src/Screens/MySellesScreens/AddShipping';
import { AuthContext } from '../Src/Providers/AuthProvider';
const Stack = createNativeStackNavigator();

const SellStack = () => {
  const navigation = useNavigation()
  const {userData} = React.useContext(AuthContext)

  return (
    <Stack.Navigator 
    screenOptions={{
      headerLeft: () => <ImageIcon containerStyle={{ marginRight: 15 }} onPress={() => navigation.dispatch(StackActions.pop())} name={'back'} />
    }}
    initialRouteName={userData?.is_kyc_approve  ? 'AddNewProduct' : 'Sell'}>
      <Stack.Screen
        name="Sell"
        component={Sell}
        options={{
          headerShadowVisible: false,
          title: null
        }}
      />

      <Stack.Screen
        name="KycAddress"
        component={KycAddress}
        options={{
          headerShadowVisible: false,
          title: null
        }}
      />
      <Stack.Screen
        name="KycAddAccount"
        component={KycAddAccount}
        options={{
          headerShadowVisible: false,
          title: null
        }}
      />
        <Stack.Screen
        name="AddShipping"
        component={AddShipping}
        options={{
          headerShadowVisible: false,
          title: null
        }}
      />
      <Stack.Screen
        name="AddNewProduct"
        component={AddNewProduct}
        initialParams={{resetNavigationOnSuccess : true}}
        options={{
          title: 'Add New Product'
        }}
      />

    </Stack.Navigator>
  );
};

// AddShipping
export default SellStack;
