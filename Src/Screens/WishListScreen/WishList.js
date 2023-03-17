
import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View, Image, FlatList
} from 'react-native';
import Colors from '../../Assets/Colors';
import { IMAGE_BASE_URL } from '../../Constant/BaseURL';
import { shadow } from '../../Assets/Styles';
import { Icon } from 'react-native-elements';
import CustomButton from '../../Components/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WishlistContext } from '../../Providers/WishlistProvider';
import Error from '../../Components/Error';
import { OrderContext } from '../../Providers/OrderProvider';
import FastImage from 'react-native-fast-image';
import ProductItem from '../../Components/ProductItem';
const WishList = ({ navigation }) => {

  const { wishlist } = useContext(WishlistContext)

  return (
    <FlatList
      ListEmptyComponent={() => <Error message={'Wishlist is empty'} />}
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ flexGrow: 1, paddingTop : 24 }}
      ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={wishlist}
      renderItem={({ item, index }) =>  <ProductItem wishListId={item.id} index={index} item={item.product} />}
    />
  );
};

export default WishList;
