import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity, TextInput, useWindowDimensions, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import FastImage from "react-native-fast-image";
import Colors from "../../Assets/Colors";
import Divider from "../../Components/Divider";
import { IMAGE_BASE_URL } from "../../Constant/BaseURL";

const offers = [.15, .1, .05]

export default MakeOffer = ({ route }) => {
    const navigation = useNavigation()
    const product = route.params?.product
    const [customPrice, setCustomPrice] = useState()
    const [selectedOffer, setSelectedOffer] = useState(offers[0])
    const windowDimensions = useWindowDimensions()

    useEffect(() => {
        if (customPrice) setSelectedOffer(undefined)
        else setSelectedOffer(offers[0])
    }, [customPrice])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('OfferDetails', { product, offer: { product, bid_amount: customPrice ? parseFloat(customPrice) : (1 - selectedOffer) * product.price } })} style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={{ paddingTop: 1, paddingRight: 5 }} >NEXT</Text>
                    <Icon size={16} name='arrow-forward-ios' />
                </TouchableOpacity>
            )
        })
    }, [selectedOffer, customPrice])

    const OfferItem = ({ offer }) => {
        const selected = useMemo(() => offer == selectedOffer, [offer, selectedOffer])
        return (
            <TouchableOpacity onPress={() => setSelectedOffer(offer)} style={{ borderRadius: 5, borderWidth: 1, borderColor: selected ? Colors.pinkColor : Colors.white, alignSelf: 'flex-start', padding: 10, width: (Dimensions.get('window').width - 60) / 3, alignItems: 'center', backgroundColor: selected ? Colors.white : Colors.pinkColor }} >
                <Text style={{ fontWeight: '600', fontSize: 16, color: selected ? Colors.blackColor : Colors.white }} >${((1 - offer) * product.price)?.toFixed(2)}</Text>
                <Text style={{ color: selected ? Colors.pinkColor : Colors.white, fontSize: 12 }} >%{offer * 100} OFF</Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow : 1, padding : 15}} style={{ flex: 1, backgroundColor: Colors.white }} >

            <View style={{ }} >
                <FastImage
                    style={{ height: 300, width:'100%' , borderRadius: 5, marginBottom: 15 }}
                    source={{ uri: IMAGE_BASE_URL + product?.product_imgs[0]?.product_img }} />

                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500', paddingBottom: 7 }} >{product.product_name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                        <Text style={{ color: Colors.black50, paddingRight: 20 }} >Listing Price: <Text style={{ color: Colors.blackColor, fontWeight: '500' }} >${product.price?.toFixed(2)}</Text></Text>
                        <Text style={{ color: Colors.black50, paddingRight: 20 }} >Size: <Text style={{ color: Colors.blackColor, fontWeight: '500' }} >{product?.size?.size}</Text></Text>
                    </View>
                </View>
            </View>

            <Divider containerStyle={{ marginHorizontal: -15 }} text={'Select Your Offer'} />

            <FlatList
                style={{ marginHorizontal: -15, flexGrow: 0 }}
                contentContainerStyle={{ padding: 15, paddingTop: 0 }}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                horizontal
                renderItem={({ item }) => <OfferItem offer={item} />}
                data={offers} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }} >
                <View style={{ height: 1, backgroundColor: Colors.black20, flex: 1 }} />
                <Text style={{ marginHorizontal: 5 }} >or</Text>
                <View style={{ height: 1, backgroundColor: Colors.black20, flex: 1 }} />
            </View>

            <TextInput
                keyboardType='numeric'
                value={customPrice}
                onChangeText={setCustomPrice}
                placeholder="Create Your Own Offer"
                style={{ fontSize: 16, borderWidth: 1, borderRadius: 3, borderColor: Colors.black20, padding: 12 }} />

            <Text style={{ color: Colors.black50, textAlign: 'center', fontSize: 12, marginTop: 10 }} >All offers expire within 24 hours. If the seller confirms interest in your offer, you will  be notified to complete the purchase</Text>

        </ScrollView>
    )

}
