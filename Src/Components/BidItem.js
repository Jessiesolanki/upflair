import React, { useContext, useMemo, useState,useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "../Assets/Colors";
import { shadow } from "../Assets/Styles";
import BidModal from "./BidModal";
import { IMAGE_BASE_URL } from "../Constant/BaseURL";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { useMutation, useQueryClient } from "react-query";
import { OrderContext } from "../Providers/OrderProvider";
import { Avatar } from "react-native-elements";
import { getInitials } from "../Utils/Utility";

export const BidItem = ({ item, index }) => {

    const [bidModalVisible, setBidModalVisibility] = useState(false)
    const { updateOffer } = useContext(OrderContext)
    const queryClient = useQueryClient()
     const [updateState,setUpdateState]= useState(0)
    const offerMutation = useMutation(
        async (status) => await updateOffer({ id: item.id, status: status }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['seller', 'bids'])
            setUpdateState(state=>state+1)
        }
    })

 
    useEffect(()=>{},[updateState])
    const imagerender = ({ item, index }) => {
        return (
            <FastImage style={{ height: 50, width: 50, borderRadius: 4, }} source={{ uri: IMAGE_BASE_URL + item.product_img }} />
        )
    }

    const Btn = ({ label, color, onPress, disabled }) => (
        <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: color, borderRadius: 3, alignSelf: 'flex-start', marginTop: 8, flexDirection: 'row', alignItems: 'center' }} >
            <Text style={{ color: Colors.white }} >{label}</Text>
        </TouchableOpacity>
    )

    const status = useMemo(() => {
        switch (item.status) {
            case 0: return 'Pending'
            case 1: return 'Confirmed'
            case 2: return 'Cancelled'
            case 3: return 'Decline'
            case 4: return 'Processing'
        }
    }, [item,updateState])

    const Buttons = useMemo(() => () => {
        switch (item.status) {
            case 0: return (
                <View style={{ alignSelf: 'flex-end' }} >
                    <Btn onPress={() => offerMutation.mutate('1')} label={'Accept'} color={Colors.pinkColor} />
                    <Btn onPress={() => offerMutation.mutate('3')} label={'Decline'} color={Colors.darkGrey} />
                </View>
            )
            case 1: return (
                <View style={{ alignSelf: 'flex-end' }} >
                    <View style={{ paddingHorizontal: 7, paddingVertical: 3, borderColor: Colors.black20, borderRadius: 5, borderWidth: 1, marginTop: 5, }} >
                        <Text style={{ color: Colors.black50, textAlign: 'center' }} >{status}</Text>
                    </View>
                    <Btn onPress={() => offerMutation.mutate('0')} label={'Undo Accept'} color={'#fcba03'} />
                </View>
            )

            default: return (
                <View style={{ paddingHorizontal: 7, paddingVertical: 3, borderColor: Colors.black20, borderRadius: 5, borderWidth: 1, marginTop: 5,alignSelf : 'flex-start' }} >
                    <Text style={{ color: Colors.black50, textAlign: 'center' }} >{status}</Text>
                </View>
            )
        }
    }, [item,updateState])



    
    return (
        <View style={{}} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BidModal visible={bidModalVisible} dismiss={() => setBidModalVisibility(false)} />

                <Avatar
                    rounded
                    ImageComponent={FastImage}
                    size={50}
                    containerStyle={{ backgroundColor: Colors.pinkColor, ...shadow }}
                    title={getInitials(item.user?.username)}
                    source={item.user?.profile_image ? { uri: IMAGE_BASE_URL + item.user?.profile_image, } : null} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }} >{item.user.username}</Text>
                    <Text style={{ color: Colors.pinkColor }} >{moment(item.product.createdAt).format('DD/MM/YYYY')}</Text>
                </View>
                <Text style={{ fontSize: 20, color: Colors.pinkColor, marginLeft: 'auto' }}  > ${item.product.price}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginTop: 5 }}>

                    <Text style={{ fontSize: 16, fontWeight: 'bold' }} >{item.product.product_name}</Text>
                    <Text style={{ opacity: .5, }} >{item.product.description}</Text>

                    <FlatList
                        horizontal
                        style={{ backgroundColor: Colors.backgroundColorW, marginTop: 10 }}
                        showsVerticalScrollIndicator={true}
                        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                        renderItem={imagerender}
                        data={item.product.product_imgs.slice(0, 3)} />
                </View>
                <Buttons />
            </View>

        </View>
    )
}