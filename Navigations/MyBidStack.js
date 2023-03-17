
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProduct from '../Src/Screens/MyProductScreens/MyProduct';
import UpdateProduct from '../Src/Screens/MyProductScreens/UpdateProduct';
import ProductDetail from '../Src/Screens/MyProductScreens/ProductDetail';
import MyBid from '../Src/Screens/MyBidScreens/MyBid';
import BidStatus from '../Src/Screens/ManageBidScreens/BidStatus';
import ImageIcon from '../Src/Components/ImageIcon';
import Colors from '../Src/Assets/Colors';
const Stack = createNativeStackNavigator();

const MyBidStack = () => {
    const navigation = useNavigation()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="My Bid"
                component={MyBid}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Bid Status"
                component={BidStatus}
                options={{
                    headerShadowVisible: false,
                    headerLeft: () => <ImageIcon containerStyle={{marginRight : 15}} onPress={() => navigation.navigate('My Bid')} name={'back'} />,
                    headerRight: () => <ImageIcon name={'search'} />,
                }}
            />
        </Stack.Navigator>
    );
};


export default MyBidStack;