import React, { useContext, useMemo, useState } from 'react';
import { Text, ImageBackground, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import Colors from '../../Assets/Colors';
import CustomButton from '../../Components/CustomButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { shadow } from '../../Assets/Styles';
import { ProductContext } from '../../Providers/ProductProvider';
import { BASE_URL } from '../../Providers';

export default SelectBrands = ({ navigation }) => {
  const [selectedBrands, setSelectedBrands] = useState([])
  const insets = useSafeAreaInsets()

  const { brands,selectBrands } = useContext(ProductContext)

  const onDone = () => {
    selectBrands({brand : selectedBrands}, ()=> navigation.reset({index : 0, routes  :[{name : 'MyDrawer'}]}))
  }

  const onBrandPress = (id) => {
    if (selectedBrands.includes(id)) setSelectedBrands(cv => cv.filter(selectedId => selectedId != id))
    else setSelectedBrands(cv => [...cv, id])
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} style={{ flex: 1 }} >

      <ImageBackground resizeMode='cover'
        style={{ flex: 1, backgroundColor: 'white', }}
        source={require('../../Assets/Login.png')}>

        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 12, paddingTop: 12 + insets.top, paddingBottom: 12 + insets.bottom }} showsVerticalScrollIndicator={false} >

          <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 10 }}>Follow Brands</Text>
          <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15 }}>Follow at least one brand you love to shop.</Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
            {brands.map((item, index) => <BrandItem
              selected={selectedBrands.includes(item.id)}
              onPress={() => onBrandPress(item.id)}
              item={item}
              key={index} />)}
          </View>

          <CustomButton disabled={selectedBrands.length == 0} onPress={onDone} label={'DONE'} containerStyle={{ padding: 20, marginTop: 'auto' }} />

        </ScrollView>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const BrandItem = ({ item, selected, onPress }) => {
  const windowDimensions = useWindowDimensions()
  const size = useMemo(() => (windowDimensions.width - 24) / 3, [windowDimensions])
  return (
    <TouchableOpacity onPress={onPress} style={{ width: size, height: size, padding: 7, ...shadow }} >
      <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 9, borderWidth: 2, borderColor: selected ? Colors.pinkColor : Colors.white, }} >
        <Image source={{ uri: BASE_URL + item.brand_image }} style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 7 }} />
      </View>
    </TouchableOpacity>
  )
}