import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { hp, wp } from '../../../Components/Responsive'
import ImageIcon from '../../../Components/ImageIcon'
import Colors from '../../../Assets/Colors'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { OrderContext } from '../../../Providers/OrderProvider'
import FastImage from 'react-native-fast-image'
import { IMAGE_BASE_URL } from '../../../Constant/BaseURL'
import { useNavigation } from '@react-navigation/native'
import ShippingStatus from './ShippingStatus'
import styles from './Orderdetail.Styles'
// IMAGE_BASE_URL
import ShipingComponent, { PriceDescription, ConditionButton, RowButton } from './ShipingComponent'

export default function OrderDetails({ route, navigation }) {
   

    const { getOrderDetail, OrderDetals, SuccesOrderDetail, setSuccessOrderDetail, UpdateOrderDetail } = useContext(OrderContext)
    const Detail = OrderDetals
    // order
    // console.log(route.params.order,'ooooooooooop')
    const [Deliverydetail, setDeliverydetail] = useState({})

    useEffect(() => {
        getOrderDetail({ id: OrderDetals?.id }, setDeliverydetail)
    }, [SuccesOrderDetail, navigation])
   
    const AllDetails = Deliverydetail?.data?.product
   
    // const UpdateOrderStatus = () => {
    //     UpdateOrderDetail({ id: OrderDetals?.id, status: "3" }, (e) => {   
    //         navigation.goBack()
    //     })
    // }

    //!! console.log(OrderDetals?.product?.go_shippo,'OrderDetals======>')
    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.backgroundColorW }}>
            <View style={styles.Body}>
                <View style={{ width: "11%", height: "100%" }}>
                   
                    <ImageIcon onPress={() => { navigation.goBack() }} iconStyle={{ marginLeft: "100%" }} size={150} name={"backbox"} />
                    {/* <View style={styles.ColorContainer}>
                        <View style={styles.Color}></View>
                        <View style={styles.Color}></View>
                    </View> */}
                </View>
                <View style={styles.BottomImages}>
                    <Carousel
                        {...{
                            vertical: false,
                            width: wp(100) * 0.85,
                            height: hp(100) / 2,
                        }}
                        loop={false}
                        style={{ width: '100%' }}
                        autoPlay={false}
                        data={AllDetails?.product_imgs}
                        pagingEnabled={true}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <View
                                style={{
                                    height: hp(48),
                                    width: wp(100),
                                    backgroundColor: Colors.black10,
                                    zIndex: -1
                                }}
                            >
                                <FastImage
                                    source={{
                                        uri: IMAGE_BASE_URL + AllDetails?.product_imgs[index].product_img,
                                        priority: FastImage.priority.high,
                                    }}

                                    style={{
                                        height: hp(48),
                                        width: wp(100),
                                        backgroundColor: Colors.black10,
                                        zIndex: -1
                                    }}></FastImage>
                            </View>

                        )}
                    />
                </View>
            </View>
            <View style={styles.DetailBody}>
                <View style={{ flexDirection: "row" }}>
                    <Carousel
                        {...{
                            vertical: false,
                            width: 100 * 0.85,
                            height: 85,
                        }}
                        loop={false}
                        style={{ width: '100%' }}
                        autoPlay={false}
                        data={AllDetails?.product_imgs}
                        pagingEnabled={true}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <FastImage

                                source={{
                                    uri: IMAGE_BASE_URL + AllDetails?.product_imgs[index].product_img,
                                    priority: FastImage.priority.normal,
                                }}
                                style={{ marginTop: 15, height: 65, width: 65, backgroundColor: Colors.black10, borderRadius: 5 }} />


                        )}
                    />

                    
                </View>
                <Text style={styles.Title}>Title</Text>
                <Text style={styles.TitleDetail} >{AllDetails?.product_name}</Text>
                <Text style={styles.Description}>Description</Text>
                <Text style={styles.DescriptionDetail}>{AllDetails?.description}</Text>
                {/* <RowButton tittle="Select Category" style={styles.Category} /> */}
                {AllDetails?.decor && <RowButton tittle={decor} style={styles.Category} />}
                <RowButton tittle={AllDetails?.brand?.brand_name} style={styles.Category} />
                <RowButton tittle={AllDetails?.color?.COL_2 || "Red"} style={styles.Category} />
                <Text style={[styles.DescriptionDetail,{marginBottom:15}]}>Product Status</Text>
                <ShippingStatus orderid={ OrderDetals?.id} orderstatus={OrderDetals.status} />
               
                {/* <View style={styles.ShippingCost}>
                    <Text style={styles.PriceTitle} >Price</Text>
                    <Text style={styles.CostIncluded} >Shipping Cost Included*</Text>
                </View>
                <PriceDescription title="Original Price" Price={AllDetails?.price} />
                <PriceDescription title="Listing Price" Price={Deliverydetail?.data?.total_bill} />
                <PriceDescription title="Your Earnings" Price={Deliverydetail?.data?.goshippo_entry ? Deliverydetail?.data?.total_bill - Deliverydetail?.data?.commission - parseFloat(Deliverydetail?.data?.goshippo_entry?.amount) :Deliverydetail?.data?.total_bill - Deliverydetail?.data?.commission} />
             
                <TouchableOpacity

                    style={styles.SubmitButton}
                    activeOpacity={0.5}
                    onPress={UpdateOrderStatus}
                >
                    <Text style={styles.SubmitTitle}>Submit</Text>
                </TouchableOpacity> */}

            </View>

        </ScrollView>
    )
}



const ShippmentSelect = ({ OrderDetals, onPress, Deliverydetail }) => {

    const [Select, setSelect] = useState(false)

    const [ShippingActive, setShippingActive] = useState(false)

    const navigation = useNavigation();

    const { SuccesOrderDetail } = useContext(OrderContext)


    useEffect(() => {
        if (Object.keys(SuccesOrderDetail).length > 0) {
            setShippingActive(true)
        }
    }, [SuccesOrderDetail])



    return (
        <>
            {/* <RowRadio onPress={setSelect} value={Select} /> */}
            {ShippingActive && !Select ? <ShipingComponent image={Deliverydetail?.data?.goshippo_entry?.label_url} /> :
                <View style={{ marginTop: hp(3), marginBottom: hp(3.8), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.PriceTitle} >Add</Text>

                    <ImageIcon onPress={onPress} size={20} iconStyle={{ marginTop: 25 }} name={"add_icon"} />


                </View>
            }


        </>
    )
}

// backgroundColor: value ? Colors.pinkColor : "transparent" 

// const RowRadio = ({ value, onPress }) => {
//     // const [Active, setActive] = useState(false)
//     return (
//         <TouchableOpacity onPress={() => onPress(!value)} style={styles.PriceContainer}>
//             {/* <View style={styles.Radio}>
//                 {value && <View style={{ height: "70%", width: "70%", borderRadius: 10, backgroundColor: Colors.pinkColor }}>
//                 </View>}
//             </View> */}
//             {/* <Text style={styles.Shipping}>Self Shipping</Text> */}
//         </TouchableOpacity>
//     )
// }




// const styles = StyleSheet.create({
//     SubmitTitle: {
//         color: '#FFFFFF',
//         paddingVertical: 10,
//         fontSize: 18
//     },
//     SubmitButton: {
//         backgroundColor: Colors.pinkColor,
//         color: '#FFFFFF',
//         height: 65, width: '100%', borderRadius: 8, marginVertical: 15,
//         alignItems: 'center', justifyContent: 'center',
//         width: wp(85),
//         marginTop: hp(8),
//         marginBottom: 100
//     },
//     CostIncluded: { marginTop: hp(4) },
//     PriceTitle: { marginTop: hp(4) },
//     ShippingCost: { flexDirection: "row", justifyContent: "space-between", paddingRight: wp(10) },
//     Shipping: { fontSize: 15, marginLeft: 14 },
//     Radio: { justifyContent: "center", alignItems: "center", height: 22, width: 22, borderRadius: 11, borderWidth: 2, borderColor: Colors.pinkColor },
//     PriceContainer: { marginTop: hp(5), flexDirection: "row" },
//     Condition: { marginTop: hp(2), fontSize: 15 },
//     Category: { marginTop: hp(3) },
//     DescriptionDetail: { marginTop: 5, color: Colors.blackColor, fontSize: 15 },
//     Description: { marginTop: hp(5), color: Colors.black50 },
//     TitleDetail: { marginTop: 4, color: Colors.blackColor, fontSize: 15 },
//     Title: { marginTop: hp(3), color: Colors.black50 },
//     BottomButtonContainer: { height: 65, justifyContent: "center", alignItems: "center", width: 65, borderRadius: 5 },
//     DetailBody: { flex: 1, paddingHorizontal: wp(8), backgroundColor: Colors.backgroundColorW },
//     BottomRightIcon: { alignItems: "flex-end", marginTop: 15, height: 65, width: 85, backgroundColor: Colors.backgroundColorW, position: 'absolute', right: 0 },
//     BottomImages: { marginLeft: "-11%", flex: 1, zIndex: -1 },
//     Body: {
//         // borderBottomLeftRadius: 50,
//         height: hp(48),
//         width: wp(100),
//         // alignSelf: "flex-end",
//         overflow: 'hidden',
//         flexDirection: "row"
//     },
//     ColorContainer: {
//         height: "40%",
//         width: "100%",
//         backgroundColor: "white",
//         marginTop: "-15%",
//         borderTopRightRadius: 27,
//         borderBottomRightRadius: 27,
//         justifyContent: 'flex-end',
//         paddingBottom: "40%"
//     },
//     Color: { height: 25, width: 25, borderRadius: 12.5, backgroundColor: Colors.black70, marginTop: "35%" },
//     ConditionButton: { flex: 1, justifyContent: 'center', alignItems: "center", borderRadius: 8 }
// })