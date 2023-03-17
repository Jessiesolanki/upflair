
import 'react-native-gesture-handler';

import * as React from 'react';
import { DrawerActions, NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ImageIcon from '../Src/Components/ImageIcon';
import Colors from '../Src/Assets/Colors';
import MyOrder from '../Src/Screens/MyOrderScreen/MyOrder';
import MyOrderDetails from '../Src/Screens/MyOrderScreen/MyOrderDetails';
const Stack = createNativeStackNavigator();

const MyOrderStack = () => {
    const navigation = useNavigation()
    return (
        <Stack.Navigator
            screenOptions={{
                headerLeft: () => <ImageIcon containerStyle={{ marginRight: 15 }} onPress={() => navigation.dispatch(StackActions.pop())} name={'back'} />
            }}
            initialRouteName="My Purchases">
            <Stack.Screen
                name="My Purchases"
                component={MyOrder}
                options={{ headerLeft: () => <ImageIcon size={22} containerStyle={{ marginRight: 15 }} color={Colors.pinkColor} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} name={'menu'} />, }}
            />

            <Stack.Screen
                name="My Order Detail"
                component={MyOrderDetails}
                options={{ title: 'Order Details' }}
            />
        </Stack.Navigator>
    );
};


export default MyOrderStack;