
import React, { useContext } from 'react';
import {
  View,
  Text, FlatList,
  Image,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import Colors from '../../Assets/Colors';
import { AuthContext } from '../../Providers/AuthProvider';
import { CheckBox, Icon } from 'react-native-elements';
import { EVENTS } from '../../Hooks/useDeviceEventEmitter';
import { useNavigation } from '@react-navigation/native';
const ShippingAddressList = () => {

  const navigation = useNavigation()
  const { userData, selectAddress, deleteAddress } = useContext(AuthContext)

  console.log(JSON.stringify(userData, null, 2))

  const AddressItem = ({ item }) => {

    const onSelect = () => {
      selectAddress({
        params: { id: item.id },
        onSuccess: () =>{ 
          navigation.goBack()
          DeviceEventEmitter.emit(EVENTS.USER_DATA_UPDATED)
        }
      })
    }

    const onDelete = () => {
      deleteAddress({
        params: { id: item.id },
        onSuccess: () => DeviceEventEmitter.emit(EVENTS.USER_DATA_UPDATED)
      })
    }

    const onUpdate = () =>{
      navigation.navigate('AddShippingAddress', {address : item})
    }

    console.log(navigation.getState())

    return (
      <View style={{ flex: 1, width: '100%', marginRight: 15, height: '100%', borderWidth: 1, borderColor: Colors.black30, borderRadius: 10, padding: 10, }}>

        <Text style={{ fontSize: 16, textAlign: 'left', marginBottom: 5, fontWeight: '500' }} >{item.address_line_one}, {item.city}, {item.zip_code}</Text>

        <CheckBox
          onPress={onSelect}
          checkedColor={Colors.pinkColor}
          textStyle={{ fontWeight: 'normal' }}
          containerStyle={{ marginBottom: -5, marginLeft: -5, marginRight: -5, borderRadius: 5 }}
          title={'Use as the shipping address'}
          checked={item.type == 1} />

        <View style={{ position: 'absolute', right: 14, bottom: 18, flexDirection: 'row', alignItems: 'center' }} >
          <Icon
            size={20}
            onPress={onUpdate}
            color={Colors.black50}
            containerStyle={{}}
            name='edit' />
          <View style={{ width: 1, alignSelf: 'stretch', marginHorizontal: 5, backgroundColor: Colors.black30 }} />
          <Icon
            size={20}
            onPress={onDelete}
            color={Colors.black50}
            containerStyle={{}}
            name='delete-forever' />
        </View>
      </View>

    );
  };

  const AddBtn = () => (
    <TouchableOpacity
      onPress={() => { navigation.navigate('AddShippingAddress') }}
      style={{ padding: 20, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.black20, marginTop: 15 }} >

      <Image
        resizeMode='contain'
        style={{ width: 40, height: 40, borderRadius: 20 }}
        source={require('../../Assets/p_plus.png')} />
    </TouchableOpacity>
  )

  return (

    <FlatList
      ListFooterComponent={AddBtn}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      contentContainerStyle={{ padding: 15, backgroundColor: Colors.white, flexGrow: 1 }}
      style={{ backgroundColor: 'white' }}
      data={userData?.user_addresses}
      renderItem={AddressItem} />


  );
};

export default ShippingAddressList;
