import React, { useState, createRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import NotificationStack from './NotificationStack';
import DiscoverStack from './DiscoverStack';
import SellStack from '../Navigations/SellStack';
import Colors from '../Src/Assets/Colors';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { shadow } from '../Src/Assets/Styles';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: Colors.pinkColor },
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.white
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarIcon: (props) => <TabBarIcon {...props} name='home' /> }} />

      <Tab.Screen name="Shop" component={DiscoverStack} options={{ headerShown  :true,title : 'Discover', tabBarIcon: (props) => <TabBarIcon {...props} name='search' /> }} />

      <Tab.Screen
        name="SellStack"
        component={SellStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ borderColor: '#fff', borderWidth: 4, width: 60, height: 60, marginBottom: 25, borderRadius: 30, backgroundColor: Colors.pinkColor, justifyContent: 'center', alignItems: 'center', ...shadow }}>
              <Icon size={24} name={'basket' + (focused ? '' : '-outline')} type='ionicon' containerStyle={{ borderColor: Colors.white }} color={color} />
            </View>
          )
        }}
      />

      <Tab.Screen name="Notifications" component={NotificationStack} options={{ tabBarIcon: (props) => <TabBarIcon {...props} name='notifications' />, headerShown: true }} />

      <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarIcon: (props) => <TabBarIcon {...props} name='person' /> }} />

    </Tab.Navigator>
  );
}
export default MyTabs;

const TabBarIcon = ({ color, focused, name }) => {
  return (
    <View style={{ alignItems: 'center', }}>
      <Icon size={20} name={name + (focused ? '' : '-outline')} type='ionicon' containerStyle={{ borderColor: Colors.white, marginTop: 8 }} color={color} />
      <View style={{ height: 4, width: 25, borderRadius: 5, backgroundColor: focused ? Colors.white : Colors.pinkColor, marginTop: 5, }} />
    </View>
  )
}