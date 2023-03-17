
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text, View, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { IMAGE_BRAND_BASE_URL } from '../Constant/BaseURL';
import Colors from '../Assets/Colors';
import { Icon, Rating } from 'react-native-elements';
import { shadow } from '../Assets/Styles';
import ContextMenu from 'react-native-context-menu-view';
import FastImage from 'react-native-fast-image';
import { WishlistContext } from '../Providers/WishlistProvider';

export default ProductItem = ({ item, index, myProduct, withContextMenu, onDelete, wishListId }) => {

    const navigation = useNavigation()
    const onPress = () => navigation.push(myProduct ? 'My Product Details' : 'ProductDetails', { productId: item?.id })
    const { removeFromWishlist } = useContext(WishlistContext)
    const windowDimensions = useWindowDimensions()
    const onEdit = () => navigation.navigate('AddNewProduct', { product: item })
   
   
    const image  = IMAGE_BRAND_BASE_URL + item?.product_imgs[0]?.product_img
    console.log(image,'imageimageimageimageimageimage-1')
    return (
        <View style={{ width: (windowDimensions.width / 2), paddingRight: index % 2 == 0 ? 12 : 24, paddingLeft: index % 2 != 0 ? 12 : 24 }} >
            <View style={{ flex: 1, width: '100%', height: '100%', borderRadius: 10, ...shadow, backgroundColor: 'white' }} >
                <ContextMenu
                    previewBackgroundColor={'transparent'}
                    actions={withContextMenu ? [{ title: "Edit", systemIcon: 'pencil' }, { title: "Delete", systemIcon: 'trash', destructive: true }] : []}
                    onPress={(e) => [onEdit, onDelete][e.nativeEvent.index]()}>
                    <TouchableOpacity disabled={item?.sold!==0}  onLongPress={() => { }} onPress={onPress} style={{ borderRadius: 10, backgroundColor: 'white', padding: 5, }}>
                        <Image source={{ uri:image }} style={{ width: '100%', height: 150, borderRadius: 5, resizeMode: 'cover' }} />
                        <View style={{ alignItems: 'center', padding: 5 }} >
                            <Text style={{ color: Colors.blackColor, fontWeight: '500', fontSize: 17 }}>{item?.product_name}</Text>
                            <Text style={{ color: Colors.pinkColor, fontSize: 17, }}>${item?.price}</Text>
                        </View>
                        {wishListId && <Icon
                            onPress={() => removeFromWishlist(wishListId)}
                            color={Colors.pinkColor}
                            name='favorite'
                            size={18}
                            containerStyle={{ position: 'absolute', top: 10, right: 10, backgroundColor: Colors.white, padding: 4, ...shadow, borderRadius: 5 }} />}
                    </TouchableOpacity>
                    {!!item.sold && <View style={{ position: 'absolute', top: 10, right: 10, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Colors.red + 'aa', borderRadius: 5, ...shadow, borderWidth: 1, borderColor: Colors.white }} >
                        <Text style={{ color: Colors.white, fontWeight: '500', fontSize: 12 }} >SOLD</Text>
                    </View>}
                </ContextMenu>
            </View>
        </View>
    );
};