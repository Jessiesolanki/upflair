import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from 'react-query'
import Colors from "../../Assets/Colors";
import { BidItem } from "../../Components/BidItem";
import { BuyerBidItem } from "../../Components/BuyerBidItem";
import Error from "../../Components/Error";
import { OrderContext } from "../../Providers/OrderProvider";

const Tab = createMaterialTopTabNavigator()

export default MyOffers = () => {

    const { getSellerBidList, getBuyerBidList } = useContext(OrderContext)
    const insets = useSafeAreaInsets()

    const List = ({ type }) => {

        const func = useMemo(() => type == 'seller' ? getSellerBidList : getBuyerBidList, [type])

        const { status, data, refetch } = useQuery([type, 'bids'], func)


        return (
            <View style={{ flex: 1, backgroundColor : Colors.white }} >
                {status == 'loading' && <ActivityIndicator style={{padding : 30}} size={'large'} color={Colors.pinkColor} />}
                {status == 'error' && <Error message={'Some thing went wrong.'} retry={refetch} />}
                {status == 'success' && (
                    <FlatList
                        style={{ backgroundColor: Colors.white }}
                        contentContainerStyle={{ padding: 15, flexGrow: 1, paddingBottom : insets.bottom+15 }}
                        ItemSeparatorComponent={() => <View style={{ height: 1, marginVertical: 15, backgroundColor: Colors.black20 }} />}
                        ListEmptyComponent={() => <Error message={'No Bids Yet'} retry={refetch} />}
                        renderItem={({ item, index }) => <BuyerBidItem type={type} item={item} index={index} />}
                        // type == 'seller' ? <BidItem item={item} index={index} /> :
                        data={data?.data?.data?.rows} />
                )}

            </View>
        )
    }

    const SellerBids = () => <List type='seller' />

    const BuyerBids = () => <List type='buyer' />

    return (
        <Tab.Navigator
            style={{ flexGrow: 1 }}
            sceneContainerStyle={{ flex: 1, overflow: 'visible' }}
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: Colors.black20, height: '100%' },
                tabBarActiveTintColor: Colors.blackColor,
                tabBarInactiveTintColor: Colors.blackColor, tabBarLabelStyle: { fontSize: 15, fontWeight: '300', textTransform: 'none', marginTop: -6 },
                tabBarStyle: { height: 40, borderBottomWidth: .3, borderColor: Colors.black30 },
            }}>
            <Tab.Screen name="Buyer Bids" component={BuyerBids} />
            <Tab.Screen name="Seller Bids" component={SellerBids} />
        </Tab.Navigator>
    )
}
