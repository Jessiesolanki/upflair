import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../../Assets/Colors";
import { shadow } from "../../Assets/Styles";
import ImageIcon from "../../Components/ImageIcon";


export default BidProductDetails = () => {
    const navigation = useNavigation()
    const windowDimensions = useWindowDimensions()

    const Header = ({ text }) => <Text style={{ color: Colors.darkGrey, fontSize: 16, fontWeight: 'bold', paddingTop: 16 }} >{text}</Text>
    const Btn = ({ item }) => (
        <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: Colors.pinkColor, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8, marginRight: 8, flexDirection : 'row', alignItems : 'center' }} >
           {item.color && <View style={{height : 10, width : 10, borderRadius : 10, backgroundColor : item.color, marginRight : 6}} />}
            <Text style={{ fontWeight: 'bold', color: Colors.white }} >{item.label}</Text>
        </TouchableOpacity>
    )

    return (
        <ScrollView onscroll style={{ backgroundColor: 'white' }} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', }} >
            <Image style={{ width: windowDimensions.width, height: windowDimensions.width, resizeMode: 'cover' }} source={{ uri: 'https://cdn.shopify.com/s/files/1/1461/0984/products/aarnio_originals_ballchair_grey11_1200x.png?v=1619786895' }} />
            <View style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: 20, ...shadow, backgroundColor: 'white', flex: 1, paddingBottom: 100 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }} >Paloma Lounge Chairs</Text>
                <Text style={{ color: Colors.green, fontSize: 16, paddingTop: 5 }} >BOSS Furniture Store</Text>
                <View style={{ flexDirection: 'row', paddingVertical: 20 }} >
                    {['red', 'brown', 'blue'].map((item, index) => <ColorItem key={index} color={item} />)}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.pinkColor }} >$50</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.lightGrey, paddingLeft: 10, textDecorationLine: 'line-through' }} >$100</Text>
                    <View style={{ width: 2, backgroundColor: Colors.lightGrey, alignSelf: 'stretch', marginHorizontal: 20 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.lightGrey }} >Size: UK OS</Text>
                </View>

                <Text style={{ color: Colors.darkGrey, lineHeight: 20, marginTop: 10 }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>

                <Header text={'My Product'} />
                <View style={{ flexDirection: 'row' }}>
                    {[{label :'Women'}].map((item, index) => <Btn item={item} key={index} />)}
                </View>

                <Header text={'Style Tags'} />
                <View style={{ flexDirection: 'row' }}>
                    {[{label : 'Earthenware'}].map((item, index) => <Btn item={item} key={index} />)}
                </View>

                <Header text={'Size'} />
                <View style={{ flexDirection: 'row' }}>
                    {[{label : 'UK OS'}, {label : 'UK NS'}].map((item, index) => <Btn item={item} key={index} />)}
                </View>

                <Header text={'Color'} />
                <View style={{ flexDirection: 'row' }}>
                    {[{ color: 'green', label: 'Green' }].map((item, index) => <Btn item={item} key={index} />)}
                </View>

                <Header text={'Additional Information'} />
                <View style={{flexDirection : 'row', padding : 15, borderRadius : 5, borderWidth : 1, borderColor : '#ddd', marginTop : 10, alignItems : 'center', justifyContent : 'space-between'}} >
                    <ImageIcon size={34} name='shipping' />
                    <Text style={{paddingHorizontal : 10}} >$99 (3-7 days) shipping on all orders</Text>
                    <Icon size={20} name='arrow-forward-ios' />
                </View>

            </View>
        </ScrollView>
    )
}
const ColorItem = ({ color }) => <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: color, borderWidth: 4, borderColor: 'white', ...shadow, borderRadius: 20, marginRight: 10 }} />
