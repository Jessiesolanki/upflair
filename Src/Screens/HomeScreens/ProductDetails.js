
import React, { useState, useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, useWindowDimensions, ActivityIndicator, TextInput, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../Assets/Colors';
import { IMAGE_BASE_URL } from '../../Constant/BaseURL';
import { Avatar, Icon } from "react-native-elements";
import { shadow } from '../../Assets/Styles';
import { WishlistContext } from '../../Providers/WishlistProvider';
import Error from '../../Components/Error';
import { ProductContext } from '../../Providers/ProductProvider';
import CustomButton from '../../Components/CustomButton';
import Divider from '../../Components/Divider';
import CommentItem from '../../Components/CommentItem';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FastImage from 'react-native-fast-image';
import { getInitials } from '../../Utils/Utility';
import useStripePaymentSheet from '../../Hooks/useStripePaymentSheet';
import { AuthContext } from '../../Providers/AuthProvider';
const ProductDetails = ({ navigation, route }) => {

    const { userData } = useContext(AuthContext)
    const { addToWishlist, wishlist, removeFromWishlist } = useContext(WishlistContext)
    const { getProductDetails, getProductComments, commentOnProduct } = useContext(ProductContext)
    const insets = useSafeAreaInsets()
    const windowDimensions = useWindowDimensions()
    const id = route.params?.productId
    const { status, data, refetch } = useQuery(['product', id], async () => await getProductDetails(id))
    const { status: commentsStatus, data: comments, refetch: refetchComments } = useQuery(['product_comments', id], async () => await getProductComments(id))
    const product = useMemo(() => data?.data?.data, [data])
    const productIsInWishlist = useMemo(() => wishlist.map(item => item.product_id).includes(id), [wishlist, product])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const { openPaymentSheet } = useStripePaymentSheet({ product_id: product?.id, price: product?.price })
    const isMyProduct = useMemo(() => product?.sellerInfo?.id == userData.id, [userData, product])

    const ProductImageItem = ({ item }) => (
        <View style={{ width: windowDimensions.width }}>
            <FastImage source={{ uri: IMAGE_BASE_URL + item.product_img }} style={{ height: 450, width: '100%' }} />
        </View>
    )

    console.log(JSON.stringify(product, null, 2))

    const SellerDetails = () => {
        if (isMyProduct) return null
        const Detail = ({ label, value }) => (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }} >
                <Text style={{ fontWeight: 'bold' }}>{value}</Text>
                <Text style={{ color: Colors.lightGrey }} >{label}</Text>
            </View>
        )
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Seller Products', { sellerInfo: product.sellerInfo })}
                style={{ backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: Colors.black30, padding: 15 }} >
                <Text style={{ color: Colors.lightGrey, fontSize: 20 }} >About the seller</Text>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }} >
                    <Avatar
                        rounded
                        size={50}
                        containerStyle={{ backgroundColor: Colors.pinkColor, ...shadow }}
                        title={getInitials(product.sellerInfo?.first_name + ' ' + product.sellerInfo?.last_name)}
                        source={product.sellerInfo?.profile_image ? { uri: IMAGE_BASE_URL + product.sellerInfo?.profile_image, } : null} />

                    <View style={{ paddingHorizontal: 10 }} >
                        <Text>{product.sellerInfo?.first_name + ' ' + product.sellerInfo?.last_name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', opacity: .5, paddingTop: 5 }} >
                            <Icon size={14} name='place' />
                            <Text style={{ fontSize: 12 }} >Seller location</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }} >
                    <Detail label={'Total Products'} value={product.sellerInfo.total_product_to_sell} />
                    <Detail label={'Total Orders'} value={product.sellerInfo.total_order} />
                    <Detail label={'Love Notes'} value={product.sellerInfo.love_notes} />
                </View>
            </TouchableOpacity>
        )
    }

    const CommentBox = () => {
        const [value, setValue] = useState()
        const queryClient = useQueryClient()
        const mutation = useMutation(
            async () => await commentOnProduct({ product_id: id, message: value }), {
            onSuccess: () => {
                setValue('')
                queryClient.invalidateQueries(['product_comments', id])
            }
        })

        const onComment = () => {
            if (!value?.trim()) return
            mutation.mutate()
        }

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4, borderWidth: .5, borderRadius: 8, borderColor: Colors.lightGrey, }} >
                <TextInput
                    style={{ padding: 10, flex: 1 }}
                    value={value}
                    onChangeText={setValue}
                    placeholder='Place your comment here...' />

                <CustomButton
                    loading={mutation.status == 'loading'}
                    disabled={mutation.status == 'loading'}
                    onPress={onComment}
                    icon='chat'
                    containerStyle={{ marginLeft: 10, borderRadius: 6, height: 40, width: 40, padding: 0, justifyContent: 'center' }} />
            </View>

        )
    }

    console.log('this si the lenth thjdskfjh',product?.bid_request===1)

    switch (status) {
        case 'error':
            return <Error style={{ marginTop: 100 }} message="Error loading product" retry={refetch} />
        case 'loading':
            return <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 100 }} />
        default:
            return (
                <KeyboardAvoidingView style={{ flex: 1 }} >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ backgroundColor: 'white' }}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} >

                        <FlatList
                            contentContainerStyle={{ flexGrow: 1, }}
                            style={{ backgroundColor: '#eee', height: 450, }}
                            horizontal={true}
                            snapToAlignment='start'
                            decelerationRate={"fast"}
                            snapToInterval={windowDimensions.width}
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={e => setCurrentImageIndex(e.nativeEvent.contentOffset.x / windowDimensions.width)}
                            data={product.product_imgs}
                            renderItem={ProductImageItem}
                        />

                        {product.product_imgs?.length > 1 && <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: -10, paddingLeft: 5, flexDirection: 'row' }} >
                            {product?.product_imgs?.map((img, index) => <View key={index} style={{ height: 7, width: 7, borderRadius: 5, backgroundColor: currentImageIndex == index ? Colors.pinkColor : Colors.black30, marginRight: 5 }} />)}
                        </View>}

                        <View style={{ flex: 1, padding: 15, paddingBottom: 0 }}>
                            <Text style={{ color: Colors.headingTextColor, fontSize: 30 }}>{product.product_name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, color: Colors.pinkColor }}>$ {product.price}</Text>
                            </View>
                            <Text style={{ color: Colors.subHeadingTextColor, fontSize: 13 }}>{product.description}</Text>


                            <View style={{ display: isMyProduct ? 'none' : 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>

                                <Icon
                                    iconStyle={{ width: 50, textAlign: 'center', paddingVertical: 10, textAlignVertical: 'center', }}
                                    onPress={() => productIsInWishlist ? removeFromWishlist(wishlist.find(item => item.product_id == route.params.productId).id) : addToWishlist(route.params.productId)}
                                    containerStyle={{ backgroundColor: '#eee', marginRight: 10, alignItems: 'center', alignSelf: 'stretch', width: 50, borderRadius: 10, justifyContent: 'center' }}
                                    name={productIsInWishlist ? 'favorite' : 'favorite-border'}
                                    color={productIsInWishlist ? 'red' : Colors.darkGrey} />

                                <CustomButton secondary containerStyle={{ flex: 1.8, marginRight: 10 }} disabled={product?.bid_request!==1} label='Make An Offer' onPress={() => navigation.navigate('MakeOffer', { product })} />

                                <CustomButton containerStyle={{ flex: 1 }} label='Buy Now' onPress={openPaymentSheet} />

                            </View>

                            <SellerDetails />

                            <View>
                                <Divider containerStyle={{ marginHorizontal: -15 }} text={'Comments'} />
                                <CommentBox />
                                <Divider containerStyle={{ marginHorizontal: -15 }} />

                                {commentsStatus == 'error' && <Error style={{ marginTop: 100 }} message="Error loading comments" retry={refetchComments} />}

                                {commentsStatus == 'loading' && <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 100 }} />}

                                {comments?.data?.data?.rows?.length == 0 && <Error message="Be the first to comment" />}

                                {comments?.data?.data?.rows?.length > 0 && comments.data.data.rows.filter(r => r.sender).slice(0, 3).map((item, index, arr) => (
                                    <View key={index} >
                                        <CommentItem item={item} />
                                        {arr.length - 1 != index && <Divider containerStyle={{ marginVertical: 8 }} />}
                                    </View>
                                ))}

                                {comments?.data?.data?.rows?.length > 3 && <TouchableOpacity onPress={() => navigation.navigate('Comments', { product_id: id })} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.black10, marginTop: 10, borderRadius: 5, padding: 10 }} >
                                    <Text style={{ textDecorationLine: 'underline', color: Colors.darkGrey }} >See All Comments</Text>
                                </TouchableOpacity>}
                            </View>

                        </View>
                    </ScrollView>

                
                    <View style={{ position: 'absolute', left: 30, top: insets.top + 15, ...shadow }}>
                        <Icon name={'arrow-back-ios'} onPress={() => navigation.goBack()} iconStyle={{ padding: 10, paddingLeft: 15, paddingRight: 5 }} containerStyle={{ backgroundColor: 'white', borderRadius: 10, ...shadow }} />
                    </View>

                </KeyboardAvoidingView>

            )
    }
}
export default ProductDetails;

