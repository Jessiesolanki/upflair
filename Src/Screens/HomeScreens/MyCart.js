import React, { useState, createRef, useEffect, useContext } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../Assets/Colors";
import ImageIcon from "../../Components/ImageIcon";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, IMAGE_BASE_URL } from '../../Constant/BaseURL';
import Loader from '../../Components/Loader';
import { OrderContext } from '../../Providers/OrderProvider';
import Error from '../../Components/Error';
const MyCart = () => {

  const { cart, removeFromCart } = useContext(OrderContext)
  const insets = useSafeAreaInsets()

  const CartItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row' }} >
        <Image style={{ height: 90, width: 90, borderRadius: 10, borderWidth :1, borderColor : '#eee' }} source={{ uri: IMAGE_BASE_URL + item?.product?.product_imgs?.[0]?.product_img }} />
        <View style={{ paddingLeft: 15 }} >
          <View>
            <Text style={{ color: Colors.blackColor, fontWeight: '500', fontSize: 17, paddingBottom : 5 }} >{item?.product?.product_name}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.pinkColor }} >${item?.product?.price}</Text>
          </View>
        </View>
        <Icon onPress={() => removeFromCart(item.id)} containerStyle={{ position: 'absolute', top: 0, right: 0, borderWidth: 1, borderColor: '#eee' }} iconStyle={{ padding: 3, borderRadius: 5 }} name='delete-forever' color={'#f00f0090'} />
      </View>
    )
  }

  return (
    <FlatList
      ListEmptyComponent={() => <Error message={'Cart is empty'} />}
      showsVerticalScrollIndicator={false}
      style={{backgroundColor : 'white'}}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e5e5e5', marginVertical: 15 }} />}
      contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: insets.bottom + 60 }}
      renderItem={CartItem}
      data={cart} />
  )



}
export default MyCart;