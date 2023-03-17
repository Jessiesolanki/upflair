
import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
  Text,
  View, Image, FlatList, ImageBackground, ActivityIndicator, TouchableOpacity, ScrollView
} from 'react-native';
import Colors from '../../Assets/Colors';
import moment from "moment";
import { shadow } from "../../Assets/Styles";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Error from '../../Components/Error';
import { ERROR, LOADING } from '../../Providers';
import { PRODUCT_STATUS } from '../../Utils/Constants';
import { OrderContext } from '../../Providers/OrderProvider';

const MySellesDetails = ({ navigation, route }) => {

  const insets = useSafeAreaInsets()
  const [deliveredData, setDeliveredData] = useState()

  const { getOrderDetail, } = useContext(OrderContext)

  useEffect(() => {
    getOrderDetail({ id: route.params.id }, setDeliveredData)
    console.log('----=-=-=',deliveredData)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1, }}>
        <View style={{ padding: 21 }}>
          <View style={{ borderWidth: 1, borderColor: '#fbfbfb', backgroundColor: '#fff', ...shadow, shadowOpacity: .2, borderRadius: 10, padding: 20, marginTop: 15, }} >
            <View style={{ flexDirection: 'row' }}>
              <Image style={{ height: 50, width: 50, resizeMode: 'contain', marginRight: 10, borderRadius: 10 }} source={require('../../Assets/images/product1.png')}></Image>
              <View >
                <Text style={{ color: Colors.headingTextColor, fontSize: 16, fontWeight: 'bold' }}>{deliveredData?.product?.product_name}</Text>
                <Text style={{ color: Colors.subHeadingTextColor, fontSize: 14, fontWeight: 'bold' }}>Sold By- {deliveredData?.user?.username}</Text>
              </View>
            </View>
            <Text style={{ color: Colors.headingTextColor, fontSize: 16, fontWeight: 'bold', marginTop: 10 }} > ${deliveredData?.price}  
             {/* <Text lineBreakMode='middle' style={{ color: Colors.subHeadingTextColor, fontSize: 14 }}>190   </Text> <Text style={{ color: Colors.pinkColor, fontSize: 15, fontWeight: 'bold' }}>10% Off</Text>   */}
             </Text>

          </View>

          <View style={{ borderWidth: 1, borderColor: '#fbfbfb', backgroundColor: '#fff', ...shadow, shadowOpacity: .2, borderRadius: 10, padding: 20, marginTop: 25, }} >
            <Text style={{ color: Colors.headingTextColor, fontSize: 14, fontWeight: 'bold' }}>Track Order</Text>
            <Text style={{ color: Colors.subHeadingTextColor, fontSize: 13, marginTop: 4 }}>Order id:{deliveredData?.id}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={{ alignItems: 'center', marginTop: 5 }}>

                <Image style={{ width: 27, height: 27, resizeMode: 'contain' }} source={require('../../Assets/order_placed.png')} />
                <View style={{ height: 25, width: 2, backgroundColor: Colors.sepration_lineColor }} />
              </View>
              <View style={{}}>
                <Text style={{ color: Colors.pinkColor, fontSize: 16, fontWeight: 'bold' }}>Order Placed</Text>
                <Text style={{ color: Colors.subHeadingTextColor, marginTop: 4 }}>we have received your order</Text>
              </View>
              <Text style={{ color: Colors.subHeadingTextColor }}> {moment(deliveredData?.updatedAt).format('DD/MM/YYYY')} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={{ alignItems: 'center', marginTop: 5 }}>

                <Image style={{ width: 27, height: 27, resizeMode: 'contain' }} source={require('../../Assets/order_packed.png')} />
                <View style={{ height: 25, width: 2, backgroundColor: Colors.sepration_lineColor }} />
              </View>
              <View style={{}}>
                <Text style={{ color: Colors.pinkColor, fontSize: 16, fontWeight: 'bold' }}>Order Packed</Text>
                <Text style={{ color: Colors.subHeadingTextColor, marginTop: 4 }}>we have received your order</Text>
              </View>
              <Text style={{ color: Colors.subHeadingTextColor }}>{moment(deliveredData?.updatedAt).format('DD/MM/YYYY')} </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ alignItems: 'center', marginTop: 5 }}>

                <Image style={{ width: 27, height: 27, resizeMode: 'contain' }} source={require('../../Assets/theway.png')} />
                <View style={{ height: 25, width: 2, backgroundColor: Colors.sepration_lineColor }} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: Colors.pinkColor, fontSize: 16, fontWeight: 'bold' }}>On the way</Text>
                {/* <Text style={{color:Colors.subHeadingTextColor,marginTop:4}}>we have received your order</Text> */}
              </View>
              <Text style={{ color: Colors.subHeadingTextColor }}></Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ alignItems: 'center', marginTop: 5 }}>

                <Image style={{ width: 27, height: 27, resizeMode: 'contain' }} source={require('../../Assets/deliverd.png')} />
                {/* <View style={{height:25,width:2,backgroundColor:Colors.sepration_lineColor}}/> */}
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: Colors.subHeadingTextColor, fontSize: 16, fontWeight: 'bold' }}>Product deleverd</Text>
                {/* <Text style={{color:Colors.subHeadingTextColor,marginTop:4}}>we have received your order</Text> */}
              </View>
              <Text style={{ color: Colors.subHeadingTextColor }}></Text>
            </View>

          </View>

          <View style={{ borderWidth: 1, borderColor: '#fbfbfb', backgroundColor: '#fff', ...shadow, shadowOpacity: .2, borderRadius: 10, padding: 20, marginTop: 25, }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.headingTextColor, fontSize: 14, fontWeight: 'bold' }}>Amount</Text>

              <Text style={{ color: Colors.headingTextColor, fontSize: 14, fontWeight: 'bold' }}>$ {deliveredData?.price} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ color: Colors.headingTextColor, fontSize: 14, fontWeight: 'bold' }}>Quantity</Text>

              <Text style={{ color: Colors.headingTextColor, fontSize: 14, fontWeight: 'bold' }}> {deliveredData?.quantity} </Text>
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
              <Text style={{ color: Colors.headingTextColor, fontSize: 14, fontWeight: 'bold' }}>Service Tax</Text>

              <Text style={{ color: Colors.headingTextColor, fontSize: 14, fontWeight: 'bold' }}>$ 10.000</Text>
            </View> */}
            <View style={{ marginVertical: 10, width: '100%', height: 1.5, backgroundColor: Colors.pinkColor }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ color: Colors.headingTextColor, fontSize: 18, fontWeight: 'bold' }}>Total</Text>

              <Text style={{ color: Colors.headingTextColor, fontSize: 16, fontWeight: 'bold' }}>$ {deliveredData?.total_bill}</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <TouchableOpacity style={{ backgroundColor: Colors.pinkColor, height: 36, width: 120, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Invoice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default MySellesDetails;