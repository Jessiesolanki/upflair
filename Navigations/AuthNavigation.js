
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Src/Screens/AuthScreen/Login';
import SignUp from '../Src/Screens/AuthScreen/SignUp';
import UserType from '../Src/Screens/AuthScreen/UserType';
import SelectCategory from '../Src/Screens/AuthScreen/SelectCategory';
import SelectBrand from '../Src/Screens/AuthScreen/SelectBrand';
import ForgotPassword from '../Src/Screens/AuthScreen/ForgotPassword';
import AddNewPassword from '../Src/Screens/AuthScreen/AddNewPassword';
import ResendPassword from '../Src/Screens/AuthScreen/ResentPassword';
import ForgotPasswordOtp from '../Src/Screens/AuthScreen/ForgotPasswordOtp';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen

  const route = useRoute()

  return (
    <Stack.Navigator initialRouteName={route.params?.route || 'SignUp'}>
       <Stack.Screen
        name="UserType"
        component={UserType}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="SelectCategory"
        component={SelectCategory}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="SelectBrand"
        component={SelectBrand}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="ForgotPasswordOtp"
        component={ForgotPasswordOtp}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="AddNewPassword"
        component={AddNewPassword}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ResendPassword"
        component={ResendPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Auth;