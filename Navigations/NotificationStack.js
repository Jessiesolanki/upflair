
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../Src/Screens/NotificationScreens/Notifications'
const Stack = createNativeStackNavigator();

const NotificationStack = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="Notifications">
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
     
    </Stack.Navigator>
  );
};


export default NotificationStack;