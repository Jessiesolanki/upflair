import moment from "moment";
import React from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../Assets/Colors";
import { shadow } from "../../Assets/Styles";
import Divider from "../../Components/Divider";
import { IMAGE_BASE_URL } from "../../Constant/BaseURL";
import MyOrder from "./MyOrder";


export default MyOrderDetails = ({ route }) => {
    const order = route.params?.order

    console.log(JSON.stringify(order, null, 2))

    return (
        <ScrollView style={{ backgroundColor: Colors.white }} contentContainerStyle={{ flexGrow: 1, padding: 15 }} >
            <View style={{ flexDirection: 'row' }} >
                <Image
                    source={{ uri: IMAGE_BASE_URL + order?.product?.product_imgs?.[0]?.product_img }}
                    style={{ height: 60, width: 60, borderRadius: 5 }} />
                <View style={{ marginLeft: 10 }} >
                    <Text style={{ fontSize: 18, fontWeight: '500' }} >{order.product.product_name}</Text>
                    <Text style={{ fontSize: 16, color: Colors.black50 }} >Sold by - Aman Fashoin world</Text>
                </View>
            </View>

            <Divider containerStyle={{ marginHorizontal: -15 }} text={'Details'} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }} >
                <Text style={{ fontWeight: '500', fontSize: 16 }} >Order ID</Text>
                <Text style={{ fontSize: 16, color: Colors.black70 + 'cc' }} >{order.id}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }} >
                <Text style={{ fontWeight: '500', fontSize: 16 }} >Status</Text>
                <Text style={{ fontSize: 16, color: Colors.black70 + 'cc' }} >Processing</Text>
            </View>

            <Divider containerStyle={{ marginHorizontal: -15 }} text={'Price'} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }} >
                <Text style={{ fontWeight: '500', fontSize: 16 }} >Price</Text>
                <Text style={{ fontSize: 16, color: Colors.black70 + 'cc' }} >${order.product.price.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }} >
                <Text style={{ fontWeight: '500', fontSize: 16 }} >Discount</Text>
                <Text style={{ fontSize: 16, color: Colors.black70 + 'cc' }} >{(((order.product.price - order.price) / order.product.price) * 100)}%</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, alignItems : 'center' }} >
                <Text style={{ fontWeight: '500', fontSize: 16 }} >Transaction ID</Text>
                <Text style={{ fontSize: 12, color: Colors.black70 + 'cc' }} >{order.transaction_id}</Text>
            </View>

        </ScrollView>
    )
}
