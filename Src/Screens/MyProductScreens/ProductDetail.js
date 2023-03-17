
// import { NavigationContainer } from '@react-navigation/native';
// import React, { useState, createRef } from 'react';
// import {
//     StyleSheet,
//     TextInput,
//     View,
//     Text,
//     Image,
//     KeyboardAvoidingView,
//     Keyboard,
//     TouchableOpacity, FlatList,
//     ScrollView, ImageBackground, Modal,useWindowDimensions,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Avatar, Icon } from "react-native-elements";
// import { shadow } from '../../Assets/Styles';
// import Colors from '../../Assets/Colors';
// import RNPickerSelect from 'react-native-picker-select';
// import Loader from '../../Components/Loader';
// import { BASE_URL } from '../../Constant/BaseURL';
// import { ImageSlider } from "react-native-image-slider-banner";
// const ProductDetail = ({ navigation }) => {

//     const windowDimensions = useWindowDimensions()
//     const insets = useSafeAreaInsets()
//     const CategoryRender = ({ item }) => {
//         return (

//              <View style={{ width: windowDimensions.width - 60 }}>
//              <Image source={item.image}style={{ height: 450, width: '100%' }} />
//          </View>
//         );
//     };
//     return (
//         <View style={{ flex: 1, backgroundColor: Colors.white }}>
//             <SafeAreaView style={{ flex: 1 }}>
//                 <ScrollView style={{ backgroundColor: 'white' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 80 }} >
//                 {/* <View style={{ position: 'absolute', left: 59, top: 0, ...shadow ,}}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                         <TouchableOpacity onPress={() => { navigation.goBack()}} style={{ marginRight: '40%', }}>
//                             <Image
//                                 resizeMode='contain'
//                                 style={{ width: 30, height: 30, marginBottom: 0, }}
//                                 source={require('../../Assets/arrow_circle.png')} />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={{ backgroundColor: Colors.pinkColor, width: 32, height: 32, borderRadius: 16, marginRight: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => { }}>
//                             <Image
//                                 resizeMode='contain'
//                                 style={{ width: 28, height: 28, marginBottom: 0, borderRadius: 14 }}
//                                 source={require('../../Assets/edit.png')} />
//                         </TouchableOpacity>
//                     </View>

// </View> */}
//                        <View style={{ position: 'absolute', left: 37, top: 75, ...shadow }}>
//                             <Icon name={'arrow-back-ios'} onPress={() => navigation.goBack()} iconStyle={{ padding: 10, paddingLeft: 15, paddingRight: 5 }} containerStyle={{ backgroundColor: 'white', borderRadius: 10, ...shadow }} />
//                         </View>  
//                       <View pointerEvents='none' style={{ marginLeft: 60, borderBottomLeftRadius: 60, overflow: 'hidden' }}>
//                             <FlatList
//                                 contentContainerStyle={{ flexGrow: 1, }}
//                                 style={{ backgroundColor: '#eee', height: 450, }}
//                                 horizontal={true}
//                                 snapToAlignment='start'
//                                 decelerationRate={"fast"}
//                                 snapToInterval={windowDimensions.width - 60}
//                                 showsHorizontalScrollIndicator={false}
//                                 data={dummyArray}
//                                 renderItem={CategoryRender}
//                             />
//                         </View>

//                     <View style={{ flex: 1, padding: 21 }}>
//                         <Text style={{ color: Colors.headingTextColor, fontSize: 18 }}>Minimal Stand</Text>
//                         <Text style={{ color: Colors.subHeadingTextColor, fontSize: 13 }}>Minimal Stand made of by natural wood.The design that is very simple and minimal. This is truly once of the best egdge dfsgdfg dgdfg</Text>
//                         <Text style={{ color: Colors.subHeadingTextColor, fontSize: 16, marginTop: 13, marginBottom: 0 }}>My Product</Text>
//                         <TouchableOpacity style={{ backgroundColor: Colors.pinkColor, width: 90, height: 35, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
//                             <Text style={{ color: '#fff' }}>Women</Text>
//                         </TouchableOpacity>
//                         <Text style={{ color: Colors.subHeadingTextColor, fontSize: 16, marginTop: 10, marginBottom: 5 }}>Size</Text>
//                         <TouchableOpacity style={{ backgroundColor: Colors.pinkColor, width: 90, height: 35, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
//                             <Text style={{ color: '#fff' }}>UK OS</Text>
//                         </TouchableOpacity>
//                         <Text style={{ color: Colors.subHeadingTextColor, fontSize: 16, marginTop: 10, marginBottom: 5 }}>Color</Text>
//                         <TouchableOpacity style={{ backgroundColor: Colors.pinkColor, width: 90, height: 35, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
//                             <Text style={{ color: '#fff' }}>Green</Text>
//                         </TouchableOpacity>
//                         <Text style={{ color: Colors.subHeadingTextColor, fontSize: 16, marginTop: 10, marginBottom: 5, fontWeight: '400' }}>Additional Information</Text>
//                         <View style={{ borderColor: Colors.borderColor, borderWidth: 1, padding: 5, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
//                             <Image
//                                 resizeMode='contain'
//                                 style={{ width: 28, height: 28, marginBottom: 0, borderRadius: 14 }}
//                                 source={require('../../Assets/theway.png')} />
//                             <View>
//                                 <Text style={{ fontSize: 15, color: Colors.headingTextColor }}>$99 (3-7 days) Shipping</Text>
//                                 <Text style={{ fontSize: 14, color: Colors.headingTextColor }}>on all orders</Text>
//                             </View>
//                             <Image
//                                 resizeMode='contain'
//                                 style={{ width: 28, height: 28, marginBottom: 0, borderRadius: 14 }}
//                                 source={require('../../Assets/edit.png')} />
//                         </View>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </View>
//     );
// }
// const dummyArray = [
//     { id: '1', value: 'A', image: require('../../Assets/images/product1.png') },
//     { id: '2', value: 'B', image: require('../../Assets/images/product2.png') },
//     { id: '3', value: 'C', image: require('../../Assets/images/product1.png') },
//     { id: '4', value: 'D', image: require('../../Assets/images/product2.png') },
//     { id: '5', value: 'E', image: require('../../Assets/images/product1.png') },
//     { id: '6', value: 'F', image: require('../../Assets/images/product2.png') },
// ]
// export default ProductDetail;


import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../Assets/Colors';
import { IMAGE_BASE_URL } from '../../Constant/BaseURL';
import { Avatar, Icon } from "react-native-elements";
import { shadow } from '../../Assets/Styles';
import { WishlistContext } from '../../Providers/WishlistProvider';
import { ERROR, LOADING } from '../../Providers';
import Error from '../../Components/Error';
import { ProductContext } from '../../Providers/ProductProvider';
import { OrderContext } from '../../Providers/OrderProvider';
import CustomButton from '../../Components/CustomButton';
import { CheckBox } from 'react-native-elements';
const ProductDetails = ({ navigation, route }) => {

    const { addToWishlist, wishlist, removeFromWishlist } = useContext(WishlistContext)
    const { getSellerProductDetails, updateActiveUnactive } = useContext(ProductContext)
    const { bidRequestSend } = useContext(OrderContext)
    const insets = useSafeAreaInsets()
    const windowDimensions = useWindowDimensions()
    const id = route.params?.productId
    console.log(id, 'fsd');
    const productIsInWishlist = useMemo(() => wishlist.map(item => item.product_id).includes(id), [wishlist, product])
    const [product, setProduct] = useState(LOADING)
    const [activeUnactive, setActiveUnactive] = useState();

    useEffect(() => {
        getSellerProductDetails(id, setProduct)
        // console.log('--------------useEffect',product)
        setTimeout(() => {
            valuesSets();
        }, 5000);
    }, []);
    const valuesSets = () => {
        console.log('--------------useEffect', product)
        if (product.is_active == 1) {
            setActiveUnactive(true)
        } else { setActiveUnactive(false) }
    }
    const ProductImageItem = ({ item }) => (
        <View style={{ width: windowDimensions.width - 60 }}>
            <Image source={{ uri: IMAGE_BASE_URL + item.product_img }} style={{ height: 450, width: '100%' }} />
        </View>
    )

    const ColorPicker = ({ colors }) => {

        const ColorItem = ({ color, showSeparator }) => (
            <TouchableOpacity style={{ borderColor: '#eee', borderWidth: 3, backgroundColor: color, height: 30, width: 30, borderRadius: 100, marginBottom: showSeparator ? 20 : 0 }} />
        )

        return (
            <View style={{ padding: 15, borderRadius: 100, ...shadow, position: 'absolute', backgroundColor: 'white', top: 200, left: 31.5 }} >
                {colors.map((color, index) => <ColorItem color={color} key={index} showSeparator={index != colors.length - 1} />)}
            </View>
        )
    }

    const SellerDetails = () => {
        const Detail = () => (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }} >
                <Text style={{ fontWeight: 'bold' }}> 144</Text>
                <Text style={{ color: Colors.lightGrey }} >Reviews</Text>
            </View>
        )
        return (
            <View style={{ backgroundColor: 'white', borderRadius: 10, ...shadow, padding: 15 }} >
                <Text style={{ color: Colors.lightGrey, fontSize: 20 }} >About the seller</Text>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }} >
                    <Avatar
                        rounded
                        size={50}
                        source={{ uri: 'https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg', }} />

                    <View style={{ paddingHorizontal: 10 }} >
                        <Text>Seller name</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', opacity: .5, paddingTop: 5 }} >
                            <Icon size={14} name='place' />
                            <Text style={{ fontSize: 12 }} >Seller location</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }} >
                    <Detail />
                    <Detail />
                    <Detail />
                    <Detail />
                </View>
            </View>
        )
    }

    switch (product) {
        case ERROR:
            return <Error style={{ marginTop: 100 }} message="Error loading product" retry={() => getSellerProductDetails(id, setProduct)} />
        case LOADING:
            return <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 100 }} />
        default:
            return (
                <ScrollView style={{ backgroundColor: 'white' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 80 }} >

                    <View style={{}}>

                        <View pointerEvents='none' style={{ marginLeft: 60, borderBottomLeftRadius: 60, overflow: 'hidden' }}>
                            <FlatList
                                contentContainerStyle={{ flexGrow: 1, }}
                                style={{ backgroundColor: '#eee', height: 450, }}
                                horizontal={true}
                                snapToAlignment='start'
                                decelerationRate={"fast"}
                                snapToInterval={windowDimensions.width - 60}
                                showsHorizontalScrollIndicator={false}
                                data={product.product_imgs}
                                renderItem={ProductImageItem}
                            />
                        </View>

                        {/* <ColorPicker colors={['white', 'rgb(174,146,113)', 'rgb(224,204,176)']} /> */}

                        <View style={{ position: 'absolute', left: 37, top: 75, ...shadow }}>
                            <Icon name={'arrow-back-ios'} onPress={() => navigation.goBack()} iconStyle={{ padding: 10, paddingLeft: 15, paddingRight: 5 }} containerStyle={{ backgroundColor: 'white', borderRadius: 10, ...shadow }} />
                        </View>

                    </View >
                    <View style={{ flex: 1, padding: 21, paddingBottom: 0 }}>
                        <Text style={{ color: Colors.headingTextColor, fontSize: 22 }}>{product.product_name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, color: Colors.pinkColor }}>$ {product.price}</Text>
                            {/* <Text style={{ color: Colors.headingTextColor, fontSize: 15 }}>Product Active/Unactive</Text> */}
                            <CheckBox
                                title='Product Active/Unactive'
                                titleProps={{ style: { color: Colors.headingTextColor, fontWeight: '500', paddingLeft: 5 } }}
                                checked={product.is_active == 1 ? true : false}
                                checkedColor={Colors.pinkColor}
                                uncheckedColor={Colors.pinkColor}
                                onPress={() => { setActiveUnactive(cv => !cv); updateActiveUnactive(id, activeUnactive); getSellerProductDetails(id, setProduct) }}
                                containerStyle={{ backgroundColor: 'white', padding: 0, margin: 0, marginLeft: 0, borderWidth: 0 }}
                            />
                        </View>
                        <Text style={{ color: Colors.subHeadingTextColor, fontSize: 15 }}>{product.description}</Text>

                        <Text style={{ color: Colors.subHeadingTextColor, fontSize: 16, marginTop: 10, marginBottom: 5 }}>Size</Text>
                        <View style={{ backgroundColor: Colors.pinkColor, width: 90, height: 35, justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 5 }}>
                            <Text style={{ color: '#fff' }}>{product?.size?.size}</Text>
                        </View>
                        <Text style={{ color: Colors.subHeadingTextColor, fontSize: 16, marginTop: 10, marginBottom: 5 }}>Color</Text>
                        <View style={{ backgroundColor: Colors.pinkColor, width: 90, height: 35, justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 5 }}>
                            <Text style={{ color: '#fff' }}>{product?.color?.COL_2}</Text>
                        </View>
                        <Text style={{ color: Colors.subHeadingTextColor, fontSize: 16, marginTop: 10, marginBottom: 5 }}>Brand</Text>
                        <View style={{ backgroundColor: Colors.pinkColor, width: 90, height: 35, justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 5 }}>
                            <Text style={{ color: '#fff' }}>{product?.brand?.brand_name}</Text>
                        </View>
                        <Text style={{ color: Colors.subHeadingTextColor, fontSize: 16, marginTop: 10, marginBottom: 5 }}>Category</Text>
                        <View style={{ backgroundColor: Colors.pinkColor, width: 90, height: 35, justifyContent: 'center', alignItems: 'center', marginTop: 5, borderRadius: 5 }}>
                            <Text style={{ color: '#fff' }}>{product?.category?.category_name}</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>

                            <Icon
                            iconStyle={{width : 50,textAlign : 'center', paddingVertical : 10, textAlignVertical : 'center', }}
                                onPress={() => productIsInWishlist ? removeFromWishlist(wishlist.find(item => item.product_id == route.params.productId).id) : addToWishlist(route.params.productId)}
                                containerStyle={{ backgroundColor: '#eee', marginRight: 10, alignItems: 'center', alignSelf: 'stretch', width: 50, borderRadius: 10, justifyContent: 'center' }}
                                name={productIsInWishlist ? 'favorite' : 'favorite-border'}
                                color={productIsInWishlist ? 'red' : Colors.darkGrey} />

                            <CustomButton containerStyle={{flex : 1}} disabled={product?.bid_requests.length > 0} label='Make An Offer' onPress={() => {bidRequestSend(product.id,product.user_id ),
        getSellerProductDetails(id, setProduct)}
                            //  navigation.navigate('Chat')
                        } />

                        </View> */}

                        {/* <SellerDetails /> */}

                    </View>
                </ScrollView>
            )
    }
}
export default ProductDetails;

