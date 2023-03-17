import moment from "moment";
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, Alert, Modal, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../Assets/Colors";
import { shadow } from "../../Assets/Styles";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, IMAGE_BASE_URL, IMAGE_BRAND_BASE_URL } from '../../Constant/BaseURL';
import Error from "../../Components/Error";
import { MyOfferContext } from "../../Providers/MyOfferProvider";
import { AuthContext } from '../../Providers/AuthProvider';
import ControlledInput from '../../Components/ControlledInput';
import { Avatar, Icon } from 'react-native-elements';
import { useForm } from 'react-hook-form';
const Tab = createMaterialTopTabNavigator();

Checkout = ({ navigation }) => {
  const [buyerOfferList, setBuyerOfferList] = useState([])
  const { updateProfile, userData } = useContext(AuthContext)
  const { getBuyerOfferList, } = useContext(MyOfferContext)

  return (
    <View style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Text style={{ textAlign: 'center', marginTop: 10 }}>Under Processing....!</Text>
    </View>
  )
}
export default Checkout