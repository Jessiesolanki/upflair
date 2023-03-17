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

ManageBig = ({ navigation }) => {
  const [buyerOfferList, setBuyerOfferList] = useState([])
  const { updateProfile, userData } = useContext(AuthContext)
  const { getBuyerOfferList, } = useContext(MyOfferContext)
 

  const imagerender = ({ item, index }) => {
    return (
      <Image style={{ height: 50, width: 50, borderRadius: 4, marginRight: 10 }} source={{ uri: IMAGE_BASE_URL + item.product_img }} />

    )
  }
  const Buyer = () => {
    const insets = useSafeAreaInsets()
    useEffect(() => {
      getBuyerbidlist();
    }, []);

    const [loading, setLoading] = useState(false);
    const [buyerBidList, setBuyerBidList] = useState([]);
    const getBuyerbidlist = async () => {

      var bodyParam = {
        // id:savedUserData.data.id
      }
      const AuthToken = await AsyncStorage.getItem('accessToken');
      setLoading(true)
      return fetch(BASE_URL + 'api/bidlist', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': AuthToken
        },
        body: JSON.stringify(bodyParam)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false)
          if (responseJson.response === true) {
            setBuyerBidList(responseJson.data.rows)
          }
          else if (responseJson.response === false) {
            alert(responseJson.message)
          }
        })
        .catch((error) => {
          console.error('error= ', error);
        });
    };
    const deleteBid = async (id) => {

      var bodyParam = {
        id: id
      }
      const AuthToken = await AsyncStorage.getItem('accessToken');
      setLoading(true)
      return fetch(BASE_URL + 'api/cancelBidRequest', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': AuthToken
        },
        body: JSON.stringify(bodyParam)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false)
          if (responseJson.status === true) {
            getBuyerbidlist();
          }
          else if (responseJson.status === false) {
            alert(responseJson.message)
          }
        })
        .catch((error) => {
          console.error('error= ', error);
        });
    };

    const StatusItem = ({ item }) => {
      console.log('-----------', item.bid_amount)
      const Btn = ({ label, color, onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: color, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8, flexDirection: 'row', alignItems: 'center', }} >
          <Text style={{ fontWeight: 'bold', color: Colors.white }} >{label}</Text>
        </TouchableOpacity>
      )
      const Status = ({ label, color, onPress }) => (
        <View onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: color, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8, flexDirection: 'row', alignItems: 'center', }} >
          <Text style={{ fontWeight: 'bold', color: Colors.white }} >{label}</Text>
        </View>
      )
      return (
        <View style={{ flexDirection: 'row' }} >
          <Image style={{ height: 110, width: 110, borderRadius: 3 }} source={{ uri: IMAGE_BASE_URL + item.product?.product_imgs[0]?.product_img }} />
          <View style={{ paddingLeft: 15 }} >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.darkGrey, paddingBottom: 5 }} >{item.product.product_name}</Text>
          {item.bid_amount !=null?
       <Text> <Text  style={{ fontSize: 16, fontWeight: 'bold', color: Colors.pinkColor,textDecorationLine: 'line-through', }} >${item.product.price}</Text> <Text  style={{ fontSize: 16, fontWeight: 'bold', color: Colors.pinkColor, }} >  ${item.bid_amount} </Text> 
        </Text>       :  <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.pinkColor }} >${item.product.price} </Text>
      }
           
            {item.status == 0 ? <Status label={'Pending'} color={Colors.darkGrey} /> : item.status == 4 ?
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Status label={'In Progress'} color={Colors.green} />
                <TouchableOpacity onPress={() => { navigation.navigate('Chat', { product_id: item.product.id, seller_id: item.product.user_id, price: item.product.price }) }}
                  style={{ marginTop: 4, marginLeft: 10 }}>
                  <ImageIcon size={22} containerStyle={{ alignSelf: 'flex-start', marginLeft: 'auto' }} name={'chat'} />
                </TouchableOpacity>
              </View> :
              <View>
                <Btn onPress={()=>{navigation.navigate('Checkout')}} label={'Checkout'} color={Colors.pinkColor} />
                {/* <TouchableOpacity onPress={() => { navigation.navigate('Chat', { product_id: item.product.id, seller_id: item.product.user_id, price: item.product.price }) }}
                  style={{ marginTop: 4, marginLeft: 10 }}>
                  <ImageIcon size={22} containerStyle={{ alignSelf: 'flex-start', marginLeft: 'auto' }} name={'chat'} />
                </TouchableOpacity> */}
              </View>
            }
          </View>
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'Delete',
              'Are you sure you want to delete ?',
              [{
                text: 'Cancel', onPress: () => {
                  return null;
                },
              }, { text: 'Confirm', onPress: async () => { deleteBid(item.id) }, },], { cancelable: false },
            );
          }} style={{ flex: 1, marginLeft: 'auto' }}>
            <ImageIcon size={22} containerStyle={{ alignSelf: 'flex-start', marginLeft: 'auto' }} name={'delete'} />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <FlatList
        style={{ backgroundColor: Colors.backgroundColorW }}
        ListEmptyComponent={() => <Error message={'You have no bids right now'} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: insets.bottom + 20 }}
        renderItem={StatusItem}
        data={buyerBidList} />
    )
  }

  const Seller = () => {
    const insets = useSafeAreaInsets()
    const [bidModalVisible, setBidModalVisibility] = useState(false)
    const [id, setId] = useState('')
    const [finalAmount, setFinalAmount] = useState('')
    useEffect(() => {
      getSellerBidlist();
    }, []);

    const [loading, setLoading] = useState(false);
    const [sellerBidData, setSellerBidData] = useState([]);
    const getSellerBidlist = async () => {

      var bodyParam = {
        // id:savedUserData.data.id
      }
      const AuthToken = await AsyncStorage.getItem('accessToken');
      setLoading(true)
      return fetch(BASE_URL + 'api/sellerBidlist', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': AuthToken
        },
        body: JSON.stringify(bodyParam)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false)
          console.log('seller side offer list', responseJson.data.rows)
          if (responseJson.response === true) {
            setSellerBidData(responseJson.data.rows)
          }
          else if (responseJson.response === false) {
            alert(responseJson.message)
          }
        })
        .catch((error) => {
          console.error('error= ', error);
        });
    };
    const accept_CancelRequest = async (id, status) => {

if(finalAmount==''){
      var bodyParam = JSON.stringify({
        "id": id,
        "status": status,
        
      });
    }else{
      var bodyParam = JSON.stringify({
        "id": id,
        "status": status,
        "bid_amount":finalAmount
      });
    }
    console.log('print boday params',bodyParam)
      const AuthToken = await AsyncStorage.getItem('accessToken');
      return fetch(BASE_URL + 'api/bidStatusUpdate', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 'x-access-token': AuthToken
        },
        body: bodyParam
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === true) {
            getSellerBidlist();
          }
          else if (responseJson.status === false) {
            alert(responseJson.message)
          }
        })
        .catch((error) => {
          console.error('error= ', error);
        });
    };

    const BidItem = ({ item, index }) => {

      console.log('print---', item.user.profile_image)

      const Btn = ({ label, color, onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: color, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8, flexDirection: 'row', alignItems: 'center', }} >
          <Text style={{ fontWeight: 'bold', color: Colors.white }} >{label}</Text>
        </TouchableOpacity>
      )
      const BidModal = ({ visible, dismiss }) => {
        const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
        return (
          <Modal animationType='fade' transparent statusBarTranslucent visible={visible} onRequestClose={dismiss} >
            <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#00000020', flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }} >
              <TouchableOpacity activeOpacity={1} style={{ backgroundColor: Colors.white, borderRadius: 10, padding: 10, ...shadow, alignSelf: 'stretch' }} >

                <Icon onPress={dismiss} containerStyle={{ alignSelf: 'flex-end', marginBottom: 5 }} type='ionicon' name='close-circle-outline' />

                <View style={{ padding: 10 }} >
                  <View style={{ borderRadius: 10, backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#00000020', padding: 10, paddingBottom: 0, ...shadow, shadowOpacity: .1, }} >
                    <Text>Final Price</Text>
                    <TextInput placeholder="Ex:- $ 150" 
                            onChangeText={setFinalAmount}
                            value={finalAmount}
                    keyboardType="number" style={{
                      marginRight: 5,
                      marginBottom: -4,
                      fontSize: 16,
                      color: 'black',
                      height: 50,
                      justifyContent: 'center',
                    }}>

                    </TextInput>
                  </View>

                  <Btn onPress={() =>{setBidModalVisibility(false), accept_CancelRequest(id, 1)}} label={'Submit'} color={Colors.pinkColor} />

                </View>

              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )
      }

      return (
        <TouchableOpacity style={{ borderWidth: 2, borderColor: '#eee', backgroundColor: '#fbfbfb', ...shadow, shadowOpacity: .08, borderRadius: 10, padding: 20 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BidModal visible={bidModalVisible} dismiss={() => setBidModalVisibility(false)} />
            <Image
              style={{ width: 35, height: 35, borderRadius: 17, borderColor: '#CCC', borderWidth: 1, resizeMode: 'contain' }}
              source={{ uri: IMAGE_BASE_URL + item.user.profile_image }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }} >{item.user.username}</Text>
              <Text style={{ color: Colors.pinkColor }} >{moment(item.product.createdAt).format('DD/MM/YYYY')}</Text>
            </View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.pinkColor, marginLeft: 'auto' }}  > ${item.product.price}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>

              <Text style={{ fontSize: 16, fontWeight: 'bold' }} >{item.product.product_name}</Text>
              <Text style={{ opacity: .5, marginVertical: 10 }} >{item.product.description}</Text>
              <View style={{ flexDirection: 'row' }} >
                <FlatList
                  style={{ backgroundColor: Colors.backgroundColorW }}
                  showsVerticalScrollIndicator={true}
                  // ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                  // contentContainerStyle={{ flexGrow: 1,  paddingBottom: insets.bottom + 5}}
                  renderItem={imagerender}
                  data={item.product.product_imgs} />
              </View>
            </View>
            {item.status == 0 ?
              <View style={{ alignSelf: 'flex-end' }} >
                <Btn onPress={() => accept_CancelRequest(item.id, 4)} label={'Accept'} color={Colors.pinkColor} />
                <Btn onPress={() => { accept_CancelRequest(item.id, 2); }} label={'Decline'} color={Colors.darkGrey} />
              </View>
              :  
              <View style={{flexDirection:'row',justifyContent:'center'}}> 
              <Btn onPress={() => {setBidModalVisibility(true);setId(item.id)}} label={'Final Amount'} color={Colors.pinkColor} />
              <TouchableOpacity onPress={() => { navigation.navigate('Chat', { product_id: item.product.id, seller_id: item.product.user_id, price: item.product.price }) }}
              style={{ marginTop: 10, marginLeft:5 }}>
              <ImageIcon size={22} containerStyle={{ }} name={'chat'} />
            </TouchableOpacity>
            </View>
            }
          </View>

        </TouchableOpacity>
      )
    }
    return (
      <FlatList
        style={{ backgroundColor: Colors.backgroundColorW }}
        ListEmptyComponent={() => <Error message={'You have no bids right now'} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: insets.bottom + 20 }}
        renderItem={BidItem}
        data={sellerBidData} />
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <Tab.Navigator tabBarOptions={{
        // tabStyle: { backgroundColor: "black" },
        indicatorStyle: {
          borderBottomColor: Colors.pinkColor,
          borderBottomWidth: 2,
        },
      }}
        screenOptions={{
          tabBarActiveTintColor: Colors.pinkColor,
          tabBarInactiveTintColor: Colors.subHeadingTextColor, tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
          tabBarStyle: {},
        }}
      >
        <Tab.Screen name="Buyer" component={Buyer} />
        {userData?.type == 1 ?
          <Tab.Screen name="Seller" component={Seller} /> : null}
      </Tab.Navigator>
    </View>
  )
}
export default ManageBig