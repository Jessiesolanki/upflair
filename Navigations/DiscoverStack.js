
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discover from '../Src/Screens/DiscoverScreens/Discover'
const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="Discover">
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{headerShown: false}}
      />
     
    </Stack.Navigator>
  );
};


export default DiscoverStack;