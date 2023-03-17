import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash  from '../Src/Screens/AuthScreen/Splash';
import Intro  from '../Src/Screens/AuthScreen/Intro';
import Auth from './AuthNavigation';
import MyTabs from './TabBarNavigation';
import MyDrawer from './DrawerNavigation';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (

      <Stack.Navigator>

        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Auth" component={Auth}   options={{headerShown: false}} />
        <Stack.Screen name="MyDrawer" component={MyDrawer}   options={{headerShown: false}}   />
      </Stack.Navigator>
  );
};

export default MyStack;