
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WishList from '../Src/Screens/WishListScreen/WishList';
import ImageIcon from '../Src/Components/ImageIcon';
import Colors from '../Src/Assets/Colors';
const Stack = createNativeStackNavigator();

const WishListStack = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator initialRouteName="WishList">
      <Stack.Screen
        name="WishList"
        component={WishList}
        options={{ 
          headerShadowVisible : true, 
          headerLeft : ()=><ImageIcon size={22} containerStyle={{marginRight : 15}}  color={Colors.pinkColor} onPress={()=>navigation.openDrawer()} name={'menu'} />,
          // headerRight : ()=><ImageIcon name={'cart'} />,
          title : 'Wishlist'  
        }}
      />
     
    </Stack.Navigator>
  );
};


export default WishListStack;