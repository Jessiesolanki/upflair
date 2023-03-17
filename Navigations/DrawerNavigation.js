
import React, { useContext } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ProfileStack from './ProfileStack'
import MyTabs from './TabBarNavigation';
import Colors from '../Src/Assets/Colors';
// import MyProduct from '../Src/Screens/MyProductScreens/MyProduct';
import MyProductStack from './MyProductStack';
import MySellesStack from './MySellesStack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ManageBid from '../Src/Screens/ManageBidScreens/ManageBid';
import MyOfferStack from './MyOfferStack';
import WishList from './WishListStack';
import MyOrderStack from './MyOrderStack';
import MyBalance from '../Src/Screens/HomeScreens/MyBalance';
import MyWallet from '../Src/Screens/HomeScreens/MyWallet';
import { AuthContext } from '../Src/Providers/AuthProvider';
import { BASE_URL } from '../Src/Providers';
import HelpStack from './HelpStack';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { getInitials } from '../Src/Utils/Utility';
import { Avatar } from 'react-native-elements';
import { shadow } from '../Src/Assets/Styles';
import { color } from 'react-native-reanimated';
function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerProfile />
      <DrawerContentScrollView {...props}>

        <DrawerItemList {...props} />
        <DrawerItem label="Log Out"
          labelStyle={{ color: Colors.headingTextColor }}
          icon={() => <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 5, }} source={require('../Src/Assets/side_bar_logout.png')} />}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: async () => {
                    // await AsyncStorage.clear()
                    AsyncStorage.setItem('user_info', JSON.stringify(''))
                    AsyncStorage.setItem('accessToken', '')
                    props.navigation.replace('Auth', { route: 'Login' });
                  },
                },
              ],
              { cancelable: false },
            );
          }}
        />
      </DrawerContentScrollView>
    </View>

  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const navigation = useNavigation()
  return (

    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 0 },
      }}

      activeBackgroundColor='#ccc'
      screenOptions={{
        drawerActiveBackgroundColor: Colors.pinkColor + '30',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#000'
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="Home" component={MyTabs} options={{ headerShown: false, drawerIcon: ({ color }) => <Image style={{ width: 22, height: 22, tintColor: Colors.pinkColor, marginRight: -15, marginLeft: 5, resizeMode: 'contain' }} source={require('../Src/Assets/home.png')} /> }} />
      {/* <Drawer.Screen name="Profile" component={ProfileStack} options={{ headerShown: false, drawerIcon: ({ color }) => <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 5, }} source={require('../Src/Assets/side_bar_profile.png')} /> }} /> */}
      <Drawer.Screen name="Wishlist" component={WishList} options={{ headerShown: false, drawerIcon: ({ color }) => <Icon name='favorite-border' color={Colors.pinkColor} containerStyle={{ marginRight: -15, marginLeft: 5 }} /> }} />
      <Drawer.Screen name="My Bid Stack" component={MyOfferStack} options={{
        title: 'My Offers', headerShown: false,
        drawerIcon: ({ color }) => <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 5, }} source={require('../Src/Assets/side_bar_bid.png')} />
      }} />
      <Drawer.Screen name="My Flair" component={MyProductStack} options={{ headerShown: false, drawerIcon: ({ color }) => <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 5, }} source={require('../Src/Assets/side_bar_cart.png')} /> }} />
      <Drawer.Screen name="My Purchases" component={MyOrderStack} options={{ headerShown: false, drawerIcon: ({ color }) => <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 5, tintColor: Colors.pinkColor }} source={require('../Src/Assets/main_wishlist.png')} /> }} />

      <Drawer.Screen name="My Sales" component={MySellesStack} options={{ headerShown: false, drawerIcon: ({ color }) => <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 5, }} source={require('../Src/Assets/side_bar_wallet.png')} /> }} />
      <Drawer.Screen name="My Balance" component={MyBalance} options={{ headerShown: false, drawerIcon: ({ color }) => <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 5, }} source={require('../Src/Assets/side_bar_support.png')} /> }} />
      {/* <Drawer.Screen name="My Wallet" component={MyWallet} options={{ headerShown: false, drawerIcon: ({ color }) => <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 5, }} source={require('../Src/Assets/side_bar_wallet.png')} /> }} /> */}
      <Drawer.Screen name="HelpStack" component={HelpStack} options={{ title: 'Help', headerShown: false, drawerIcon: ({ color }) => <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 5, }} source={require('../Src/Assets/side_bar_support.png')} /> }} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;

const DrawerProfile = () => {

  const { userData } = useContext(AuthContext)
  return (
    <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'flex-start', backgroundColor: Colors.pinkColor, paddingTop: 80 }}>
      {/* <Image style={{ width: 70, height: 70, alignItems: 'center', alignSelf: 'center', resizeMode: 'cover', borderRadius: 35, borderWidth: 2, borderColor: 'white' }} source={{ uri: BASE_URL + userData?.profile_image }} /> */}
      <Avatar
            size={50}
            rounded
            ImageComponent={FastImage}
            titleStyle={{color:"black"}}
            title={getInitials(userData?.first_name + ' ' + userData?.last_name)}
            containerStyle={{ backgroundColor: Colors.white, ...shadow }}
            source={userData?.profile_image ? { uri: BASE_URL + userData.profile_image } : null}
          />
      <View style={{ marginLeft: 5, justifyContent: 'center', width: '70%' }}>
        <Text style={{ color: Colors.white, fontSize: 20, paddingBottom: 6, marginTop: 10, fontWeight: 'bold' }}>{userData?.first_name} {userData?.last_name}</Text>
        <Text numberOfLines={2} style={{ color: '#fff', fontSize: 14, }}>{userData?.email}</Text>
      </View>
    </View>
  )

};