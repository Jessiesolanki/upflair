
import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
  Text,
  View, Image, FlatList, ImageBackground, ActivityIndicator
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../Assets/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductContext } from '../../Providers/ProductProvider';
import Error from '../../Components/Error';
import { BASE_URL, ERROR, LOADING } from '../../Providers';
import { PRODUCT_STATUS } from '../../Utils/Constants';
import ProductItem from '../../Components/ProductItem';
import { AuthContext } from '../../Providers/AuthProvider';
import { Avatar } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { shadow } from '../../Assets/Styles';
import { getInitials } from '../../Utils/Utility';

const Tab = createMaterialTopTabNavigator()
const MyProduct = ({ navigation }) => {

  const insets = useSafeAreaInsets()
  const { userData } = useContext(AuthContext)
  const [publicProducts, setPublicProducts] = useState()
  const [draftProducts, setDraftProducts] = useState()

  const { getSellerProducts, deleteProduct } = useContext(ProductContext)

  useEffect(() => {
    getSellerProducts({ status: PRODUCT_STATUS.PUBLIC }, setPublicProducts)
    getSellerProducts({ status: PRODUCT_STATUS.DRAFT }, setDraftProducts)
  }, [])

  const onDelete = (id) => {
    deleteProduct(id, () => {
      setPublicProducts(products => products.filter(product => product.id != id))
      setDraftProducts(products => products.filter(product => product.id != id))
    })
  }

  const ProductList = useMemo(() => ({ title, products, retry }) => {
    const Header = () => (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, paddingHorizontal: 24 }}>
        <Text style={{ color: Colors.blackColor, fontSize: 20, fontWeight: '500', }}>{title}</Text>
        <TouchableOpacity style={{ borderColor: Colors.darkGrey, borderWidth: 1, padding: 2, borderRadius: 7 }} onPress={() => { navigation.navigate('AddNewProduct') }}>
          <Image style={{ width: 22, height: 22, tintColor: Colors.darkGrey, alignItems: 'center', alignSelf: 'center', }} source={require('../../Assets/p_plus.png')} />
        </TouchableOpacity>
      </View>
    )


    switch (products) {
      case ERROR:
        return <Error style={{ paddingTop: 80 }} message="Error loading products" retry={retry} />
      case LOADING:
        return <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 15 }} />
      default:
        return (
          <FlatList
            ListEmptyComponent={() => <Error style={{ paddingTop: 80 }} message="No products yet." retry={() => getSellerProducts({ status: PRODUCT_STATUS.PUBLIC }, setPublicProducts)} />}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={Header}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
            horizontal={false}
            data={products}
            renderItem={({ item, index }) => <ProductItem index={index} item={item} myProduct withContextMenu onDelete={() => onDelete(item.id)} />}
          />
        )
    }
  }, [])

  const PublicProducts = () => <ProductList retry={() => getSellerProducts({ status: PRODUCT_STATUS.PUBLIC }, setPublicProducts)} title={'My Products'} products={publicProducts} />
  const DraftProducts = () => <ProductList retry={() => getSellerProducts({ status: PRODUCT_STATUS.DRAFT }, setDraftProducts)} title={'My Draft Products'} products={draftProducts} />

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <View style={{ backgroundColor: Colors.blackColor, padding: 20, paddingTop: insets.top + 20, }}>

        <FastImage
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: .6, }}
          source={{ uri: BASE_URL + userData.profile_image }} />

        <View style={{flexDirection : 'row', alignItems : 'center', marginBottom : 20}} >
          <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => navigation.openDrawer()}>
            <Image style={{ width: 20, height: 20, tintColor: Colors.white }} source={require('../../Assets/side.png')} />
          </TouchableOpacity>

          <View style={{marginLeft  :'auto', marginRight : 10, alignItems : 'flex-end'}} >
            <Text style={{color  :Colors.white, fontWeight : 'bold', fontSize : 18}} >{userData?.first_name + ' ' + userData?.last_name}</Text>
            <Text style={{opacity : .8, color : Colors.white, }} >@{userData.username}</Text>
          </View>
          <Avatar
            size={50}
            rounded
            ImageComponent={FastImage}
            title={getInitials(userData?.first_name + ' ' + userData?.last_name)}
            containerStyle={{ backgroundColor: Colors.pinkColor, ...shadow }}
            source={userData?.profile_image ? { uri: BASE_URL + userData.profile_image } : null}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={{ flexDirection: 'row', flex : 1,marginRight : 20, height: 40, backgroundColor: '#F7F7F8', borderRadius: 5 }}>
            <Image style={{ width: 20, height: 20, alignItems: 'center', alignSelf: 'center', marginLeft: 5 }} source={require('../../Assets/search.png')} />
            <TextInput
              style={{ marginHorizontal: 5, maxWidth: '70%' }}
              placeholder='What are you looking for?'/>
          </View>
          <View style={{ width: 50, height: 40, backgroundColor: '#F7F7F8', justifyContent: 'center', borderRadius: 5 }}>

            <Image style={{ width: 17, height: 17, tintColor: Colors.darkGrey, alignItems: 'center', alignSelf: 'center', }} source={require('../../Assets/sort.png')} />
          </View>
        </View>

      </View>

      <Tab.Navigator
        offscreenPageLimit={2}
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: Colors.pinkColor, height: 1 },
          tabBarActiveTintColor: Colors.pinkColor,
          tabBarInactiveTintColor: Colors.subHeadingTextColor, tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
          tabBarStyle: {},
        }}
      >
        <Tab.Screen name="Public Product" component={PublicProducts} />
        {/* <Tab.Screen name="Draft Product" component={DraftProducts} /> */}
      </Tab.Navigator>
    </View>
  );
};


export default MyProduct;
