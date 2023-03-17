
import 'react-native-gesture-handler';

import * as React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyOrder from '../Src/Screens/MyOrderScreen/MyOrder';
import MyOrderDetails from '../Src/Screens/MyOrderScreen/MyOrderDetails';
import Help from '../Src/Screens/HomeScreens/Help';
import Content from '../Src/Screens/HomeScreens/Content';
import ImageIcon from '../Src/Components/ImageIcon';
const Stack = createNativeStackNavigator();

export default HelpStack = () => {
    const navigation = useNavigation()
    return (
        <Stack.Navigator initialRouteName="My Purchases">
            <Stack.Screen
                name="Help"
                component={Help}
                options={{ headerLeft: () => <ImageIcon size={22} containerStyle={{marginRight : 15}} color={Colors.pinkColor} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} name={'menu'} />, }}
            />

            <Stack.Screen
                name="Content"
                component={Content}
                options={{ 
                    contentStyle : {backgroundColor : 'white'},
                    headerLeft: () => <ImageIcon containerStyle={{marginRight : 15}} color={Colors.pinkColor} onPress={() => navigation.navigate('Help')} name={'back'} />, }}
            />

        </Stack.Navigator>
    );
};