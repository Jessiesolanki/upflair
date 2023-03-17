
import 'react-native-gesture-handler';

import * as React from 'react';
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageIcon from '../Src/Components/ImageIcon';
import MySalles from '../Src/Screens/MySellesScreens/MySalles';
import MySellesDetails from '../Src/Screens/MySellesScreens/MySellesDetails';
import OrderDetails from '../Src/Screens/MySellesScreens/OrderDetails';
import AddShipping from '../Src/Screens/MySellesScreens/AddShipping';
const Stack = createNativeStackNavigator();

const SellStack = () => {

  const navigation = useNavigation()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MySales"
        component={MySalles}
        options={{ title:"My Sales", headerLeft: () => <ImageIcon size={22} containerStyle={{ marginRight: 15 }} color={Colors.pinkColor} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} name={'menu'} />, }}
      />
      
      <Stack.Screen
        name="Details"
        component={MySellesDetails}
        options={{ headerLeft: () => <ImageIcon containerStyle={{ marginRight: 15 }} color={Colors.pinkColor} onPress={() => navigation.navigate('My Saless')} name={'back'} />, }}
      />

      <Stack.Screen
        name='My Order Detail'
        component={OrderDetails}
        options={{headerShown:false }}
      />

      <Stack.Screen
        name='AddShipping'
        component={AddShipping}
        options={{
          headerShadowVisible:false,
          title: "Add Shipping",
          headerTitleAlign: "center", headerShown: true, headerLeft: () => <ImageIcon containerStyle={{ marginRight: 15 }} color={Colors.pinkColor} onPress={() => navigation.navigate('My Order Detail')} name={'back'} />, }}
      />
    </Stack.Navigator>
  );
};


export default SellStack;
