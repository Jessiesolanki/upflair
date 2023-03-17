import React, { useContext } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useInfiniteQuery } from "react-query";
import Colors from "../../Assets/Colors";
import { shadow } from "../../Assets/Styles";
import Error from "../../Components/Error";
import ProductItem from "../../Components/ProductItem";
import { BASE_URL } from "../../Providers";
import { ProductContext } from "../../Providers/ProductProvider";
import { getInitials } from "../../Utils/Utility";

export default SellerProducts = ({ route }) => {

    const { getProductsBySellerId } = useContext(ProductContext)

    const sellerInfo = route.params?.sellerInfo

    const getParams = () => ({
        // priceSort: priceSort,
        // nameSort: aTOz,
        page: 0,
        seller_id : sellerInfo.id
        // category_id: selectCategory,
        // search_key: searchText
    })

    const {
        status,
        data,
        fetchNextPage,
        hasNextPage,
        refetch
    } = useInfiniteQuery(['seller-products', getParams()], ({ pageParam = getParams() }) => getProductsBySellerId(pageParam),
        {
            getNextPageParam: lastPage => {
                if (!lastPage) return undefined
                if ((lastPage?.data?.currentPage + 1) >= lastPage?.data?.totalPages) return undefined
                return { ...getParams(), page: lastPage?.data?.currentPage + 1 }
            }
        }
    )

    const Detail = ({ label, value }) => (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }} >
            <Text style={{ fontWeight: 'bold', color: Colors.white }}>{value}</Text>
            <Text style={{ color: Colors.white + 90 }} >{label}</Text>
        </View>
    )

    const SellerDetails = () => {
        return (
            <View style={{ backgroundColor: Colors.blackColor, padding: 10, paddingTop: 20,marginBottom : 24 }}>

                <FastImage
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: .6, backgroundColor: Colors.pinkColor }}
                    source={{ uri: BASE_URL + sellerInfo.profile_image }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                    <Avatar
                        size={50}
                        rounded
                        ImageComponent={FastImage}
                        title={getInitials(sellerInfo?.first_name + ' ' + sellerInfo?.last_name)}
                        containerStyle={{ backgroundColor: Colors.pinkColor, ...shadow }}
                        source={sellerInfo?.profile_image ? { uri: BASE_URL + sellerInfo.profile_image } : null}
                    />
                    <View style={{ marginLeft: 10, marginRight: 10, }} >
                        <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 18 }} >{sellerInfo?.first_name + ' ' + sellerInfo?.last_name}</Text>
                        <Text style={{ opacity: .8, color: Colors.white, }} >@{sellerInfo.username}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }} >
                    <Detail label={'Total Products'} value={sellerInfo.total_product_to_sell} />
                    <Detail label={'Total Orders'} value={sellerInfo.total_order} />
                    <Detail label={'Love Notes'} value={sellerInfo.love_notes} />
                </View>

            </View>
        )
    }

    switch (status) {
        case 'error':
          return <Error style={{ paddingTop: 80 }} message="Error loading products" retry={refetch} />
        case 'loading':
          return <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 15 }} />
        default:
          return (
            <FlatList
              onEndReachedThreshold={.1}
              onEndReached={hasNextPage ? fetchNextPage : null}
              ListHeaderComponent={SellerDetails}
              ListFooterComponent={hasNextPage ? <ActivityIndicator color={Colors.pinkColor} size={'large'} style={{ alignItems: 'center', padding: 20 }} /> : null}
              ListEmptyComponent={<Error style={{ paddingTop: 80 }} message="No Products Found" retry={refetch} />}
              contentContainerStyle={{ flexGrow: 1, paddingBottom : 24 }}
              ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              style={{backgroundColor : Colors.white}}
              data={data?.pages?.map(page => page?.data?.data?.rows).reduce((t, c) => [...t, ...c], [])}
              renderItem={({ item, index }) => <ProductItem item={item} index={index} />}
            />
          )
      }
}