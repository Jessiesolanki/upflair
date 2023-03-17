
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useInfiniteQuery } from "react-query";
import { FlatList, Image ,ActivityIndicator} from 'react-native';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../Assets/Colors';
import Error from "../../Components/Error";
import { OrderContext } from '../../Providers/OrderProvider';


const MyBalance = () => {

  const navigation = useNavigation()

  const { TransactionList, listTransactionUser } = useContext(OrderContext)


  // const { data } = getTransactionList({
  //   "status": "0",
  //   "sorting": "id|asc",
  //   "search_key": "brw",
  //   "page": 0
  // })
  const getParams = () => ({search_key:'', sorting:'id|asc',page: 0,status: "3",})
  
const {status,data,fetchNextPage,hasNextPage,refetch} = useInfiniteQuery(['listTransactionUser', getParams()], ({ pageParam = getParams() }) => listTransactionUser(pageParam),
{
    getNextPageParam: lastPage => {
        if (!lastPage) return undefined
        if ((lastPage?.data?.currentPage + 1) >= lastPage?.data?.totalPages) return undefined
        return { ...getParams(), page: lastPage?.data?.currentPage + 1 }
    }
}
)

  console.log(data);
    const insets = useSafeAreaInsets()
  switch (status) {
    case 'error':
      return <Error style={{ paddingTop: 80 }} message="Error loading transaction" retry={refetch} />
    case 'loading':
      return <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 15 }} />
    default:
  return (

    <View style={{ flex: 1, padding: 24, backgroundColor: '#fff' }}>
      <SafeAreaView >
        <StatusBar barStyle={'dark-content'} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginTop: 14, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.openDrawer()}>
            <Image style={{ width: 20, height: 20, tintColor: Colors.pinkColor }} source={require('../../Assets/side.png')}>

            </Image>

          </TouchableOpacity>
          <Text style={{ color: Colors.blackColor, fontSize: 18, fontWeight: 'bold', marginVertical: 15, paddingLeft: 15 }}>My Balance</Text>

        </View>

        <View>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>Recent Transaction</Text>
          </View>


          {/* <FlatList
            ListEmptyComponent={myListEmpty}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.black30, marginVertical: 10 }} />}
            contentContainerStyle={{ padding: 15, flexGrow: 1, }}
            data={DummyData}
            renderItem={({ item }) => <TransactionItem item={item} />}

           
          /> */}

<FlatList
              onEndReachedThreshold={.1}
              onEndReached={hasNextPage ? fetchNextPage : null}
            
              ListFooterComponent={hasNextPage ? <ActivityIndicator color={Colors.pinkColor} size={'large'} style={{ alignItems: 'center', padding: 20 }} /> : null}
              ListEmptyComponent={<Error style={{ paddingTop: 80 }} message="No Transaction Found" retry={refetch} />}
              contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: insets.bottom + 20 }}
              ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e5e5e5', marginVertical: 15 }} />}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              style={{backgroundColor : Colors.white}}
              data={data?.pages?.map(page => page?.data?.data?.rows).reduce((t, c) => [...t, ...c], [])}
              renderItem={({ item, index }) => <TransactionItem item={item} index={index} />}
            /> 

        </View>
      </SafeAreaView>
    </View>

  );
  }
};



const TransactionItem = ({ item,index }) => {
  console.log(item);
  return (
    <View>
      <Text>Transaction Id: {item.transaction_id}</Text>
      <Text>Transaction Amount: ${item.payment_amount}</Text>
      <Text>Transaction Status: {item.status}</Text>
    </View>
  )
}

// const TransactionItem = ({ item }) => {
//   return (
//     <View style={{paddingTop: 200}}>
//       <Text>{item.user.id}</Text>
//       <Text>{item.user.email}</Text>
//       <Text>{item.user.createdAt}</Text>
//     </View>
//   )
// }

const myListEmpty = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: 25, paddingTop: 250, paddingLeft: 25, opacity: .4 }} > No Transaction Yet</Text>
    </View >
  );
};


const DummyData = [
  { transacrionid: '36401', amount: '2500', status: 'completed' },
  { transacrionid: '12789', amount: '5400', status: 'pending' },
  { transacrionid: '00641', amount: '5400', status: 'cancelled' },
  { transacrionid: '12070', amount: '5400', status: 'completed' },
  { transacrionid: '12106', amount: '5400', status: 'completed' },
]

// const dummyTransactionData = [{
//   "id": 20,
//   "product_id": "4554",
//   "user_id": 116,
//   "seller_id": 164,
//   "order_id": 83,
//   "transaction_id": "txn_3LOEv6Aq5oX68JYz0Q5D8Lgx",
//   "payment_amount": 200,
//   "payment_title": "Normal",
//   "payment_mode": "card",
//   "payment_method": "pm_1LLl6dAq5oX68JYzKVmokPgp",
//   "status": "succeeded",
//   "is_deleted": false,
//   "createdAt": "2022-07-22T06:17:33.000Z",
//   "updatedAt": "2022-07-22T06:17:33.000Z",
//   "seller": {
//     "id": 164,
//     "title": null,
//     "first_name": "Jhone",
//     "last_name": "Doe",
//     "username": "example_user",
//     "email": "example@gmail.com",
//     "phone": null,
//     "gender": null,
//     "address": null,
//     "pin_code": null,
//     "description": null,
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY0LCJpYXQiOjE2NTg0MTAzMjAsImV4cCI6MTY1OTAxNTEyMH0.9cEw5AzMaIJFqM2TV55fUmVadZ-_uaHPs2eMjkM81u0",
//     "password": "$2a$08$NiBP4z85ItYrHSh.WUQlF.tXYRSyk9FqBvYd5AycyHQr4KtQIcn4C",
//     "type": 1,
//     "profile_image": "uploads/1658167762767--rn_image_picker_lib_temp_9c773ffa-1e85-4e17-b9e4-8001561732f4.png",
//     "size": null,
//     "color": null,
//     "category": null,
//     "brand": "[8,18,13]",
//     "status": true,
//     "customer_id": "cus_M58i2a5u25EHNy",
//     "bank_account_id": null,
//     "verification_status": 1,
//     "is_block": false,
//     "is_kyc_approve": true,
//     "permanent_block": false,
//     "is_register": "1",
//     "last_login": "2022-07-18T18:09:23.000Z",
//     "resetPasswordToken": null,
//     "resetPasswordExpires": null,
//     "complete_profile": 1,
//     "createdAt": "2022-07-18T18:09:23.000Z",
//     "updatedAt": "2022-07-21T13:32:00.000Z"
//   },
//   "user": {
//     "id": 116,
//     "title": null,
//     "first_name": "Neha",
//     "last_name": "Doe",
//     "username": "doe_neha",
//     "email": "doe@gmail.com",
//     "phone": null,
//     "gender": null,
//     "address": null,
//     "pin_code": null,
//     "description": null,
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE2LCJpYXQiOjE2NTg3MjYyOTcsImV4cCI6MTY1OTMzMTA5N30.xAP7jHN6ZhwwT9fHmsQOPOEKUTRdeFqBLXufAVAu1_g",
//     "password": "$2a$08$fROhjpVMVIvzIZBC97NE5.qlJ3BGV7..fii0AU.BGpHmQ/12SW9M2",
//     "type": 1,
//     "profile_image": "uploads/1652357384768--rn_image_picker_lib_temp_1d3c3af4-eebd-4b53-8236-0f9643872e64.jpg",
//     "size": null,
//     "color": null,
//     "category": null,
//     "brand": "[8]",
//     "status": true,
//     "customer_id": "cus_M0vXnrU2qBT6yW",
//     "bank_account_id": null,
//     "verification_status": 1,
//     "is_block": false,
//     "is_kyc_approve": true,
//     "permanent_block": false,
//     "is_register": "1",
//     "last_login": "2022-05-12T12:09:44.000Z",
//     "resetPasswordToken": null,
//     "resetPasswordExpires": null,
//     "complete_profile": 1,
//     "createdAt": "2022-05-12T12:09:44.000Z",
//     "updatedAt": "2022-07-25T05:18:17.000Z"
//   },
//   "product": {
//     "id": 4554,
//     "product_name": "Sofa Set",
//     "description": "Test product",
//     "product_size_id": null,
//     "product_color_id": null,
//     "product_decor_id": null,
//     "product_category_id": 37,
//     "product_subcat_id": 20,
//     "product_brand_id": 13,
//     "user_id": 164,
//     "price": 200,
//     "selling_price": null,
//     "bid_request": null,
//     "is_approved": 0,
//     "status": 1,
//     "sold": 1,
//     "quantity": 1,
//     "is_active": 1,
//     "is_deleted": 0,
//     "createdAt": "2022-07-21T13:40:38.000Z",
//     "updatedAt": "2022-07-22T06:17:33.000Z",
//     "product_imgs": []
//   }
// }
// ]


export default MyBalance;


