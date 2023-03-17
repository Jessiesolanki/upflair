import React, { useMemo, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "../Assets/Colors";
import { shadow } from "../Assets/Styles";
import BidModal from "./BidModal";
import { IMAGE_BASE_URL } from "../Constant/BaseURL";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

export const BuyerBidItem = ({type, item, index }) => {

    const navigation  =useNavigation()

    const imagerender = ({ item, index }) => {
        return (
            <FastImage style={{ height: 50, width: 50, borderRadius: 4, }} source={{ uri: IMAGE_BASE_URL + item.product_img }} />

        )
    }

    const status = useMemo(() => {
        switch (item.status) {
            case 0: return 'Pending'
            case 1: return 'Confirmed'
            case 2: return 'Cancelled'
            case 3: return 'Decline'
            case 4: return 'Processing'
        }
    }, [item])

    const onPress = ()=>{
    //   console.log(item.user.username,'itemitemitem---------->')
        navigation.navigate('OfferDetails', {offer : item,type})
    }
    // console.log(item,'item--------------------------->')

    return (
    <TouchableOpacity onPress={onPress} style={{}} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={{ flex: 1, marginRight: 10 }} >
                            <Text style={{ fontSize: 16, fontWeight: '500', }} >{item.product.product_name}</Text>
                            <Text style={{ opacity: .5, marginVertical: 10 }} >{item.product.description}</Text>
                        </View>
                        <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }} >
                            <Text style={{ fontSize: 20, color: Colors.pinkColor, }}  > ${item.bid_amount}</Text>
                            <View style={{ paddingHorizontal: 7, paddingVertical: 3, borderColor: Colors.black20, borderRadius: 5, borderWidth: 1, marginTop: 5 }} >
                                <Text style={{ color: Colors.black50 }} >{status}</Text>
                            </View>
                        </View>
                    </View>

                    <FlatList
                        horizontal
                        showsVerticalScrollIndicator={true}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        renderItem={imagerender}
                        data={item.product.product_imgs.slice(0, 3)} />
                </View>
            </View>

        </TouchableOpacity>
    )
}