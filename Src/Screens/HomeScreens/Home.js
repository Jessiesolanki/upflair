
import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { Text, TouchableOpacity, TextInput, View, Image, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';

import { IMAGE_BRAND_BASE_URL } from '../../Constant/BaseURL';
import Colors from '../../Assets/Colors';
import { ProductContext } from '../../Providers/ProductProvider';
import { shadow } from '../../Assets/Styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ERROR, LOADING } from '../../Providers';
import Error from '../../Components/Error';
import ImageIcon from '../../Components/ImageIcon'
import ProductItem from '../../Components/ProductItem';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { AppContext } from '../../Providers/AppProvider';
import { Icon } from 'react-native-elements';
import { useInfiniteQuery } from 'react-query';

const Home = ({ navigation }) => {

  const { categories, getProducts, pastSearches } = useContext(ProductContext)
  const { setModal } = useContext(AppContext)
  const [pastSearchesVisible, setPastSearchesVisibility] = useState(false)
  const windowDimensions = useWindowDimensions()
  const [products, setProducts] = useState([]);
  const [sortData, setSortData] = useState({ nameSort: 'asc', priceSort: 'asc' })
  // const [priceSort, setPriceSort] = useState(data?.priceSort)
  const insets = useSafeAreaInsets()

  const [sortModalVisibility, setSortModalVisibility] = useState(false);
  const [selectCategory, setSelectCategory] = useState('');
  const [aTOz, setAtoZ] = useState('desc');
  const [priceSort, setPriceSort] = useState('')
  const [searchText, setSearchText] = useState('')

  const getParams = () => ({
    priceSort: priceSort,
    nameSort: aTOz,
    page: 0,
    category_id: selectCategory,
    search_key: searchText
  })

  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useInfiniteQuery(['products', getParams()], ({ pageParam = getParams() }) => getProducts(pageParam),
    {
      getNextPageParam: lastPage => {
        if (!lastPage) return undefined
        if ((lastPage?.data?.currentPage + 1) >= lastPage?.data?.totalPages) return undefined
        return { ...getParams(), page: lastPage?.data?.currentPage + 1 }
      }
    }
  )


  useEffect(() => {
    refetch({})
  }, [selectCategory]);

  const CategoryList = (
    <FlatList
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 24 }}
      horizontal={true}
      ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      data={categories}
      renderItem={({ item }) => <CategoryItem item={item} selected={item.id == selectCategory} onSelect={setSelectCategory} />}
    />
  )

  useEffect(() => {
    searchText.length > 0 && setPastSearchesVisibility(true)
  }, [searchText])

  const List = useMemo(() => () => {
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
            ListFooterComponent={hasNextPage ? <ActivityIndicator color={Colors.pinkColor} size={'large'} style={{ alignItems: 'center', padding: 20 }} /> : null}
            ListEmptyComponent={<Error style={{ paddingTop: 80 }} message="No Products Found" retry={refetch} />}
            contentContainerStyle={{ flexGrow: 1 }}
            ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={data?.pages?.map(page => page?.data?.data?.rows).reduce((t, c) => [...t, ...c], [])}
            renderItem={({ item, index }) => <ProductItem item={item} index={index} />}
          />
        )
    }
  }, [status, data])


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>


      <View style={{ paddingHorizontal: 24, borderBottomWidth: 1, borderColor: '#eee', paddingBottom: 20, paddingTop: 6 + insets.top }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>

          <ImageIcon onPress={() => navigation.openDrawer()} color={Colors.pinkColor} name={'menu'} />

          <Icon onPress={() => navigation.navigate('Wishlist')} containerStyle={{ marginLeft: 'auto', marginRight: 10 }} name='favorite-border' color={Colors.pinkColor} />

          <Icon onPress={() => navigation.navigate('FindPeople')} name='group' color={Colors.pinkColor} />

        </View>

        <Text style={{ color: Colors.blackColor, fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Make Home Beautiful </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={{ flexDirection: 'row', width: '82%', height: 40, backgroundColor: '#F7F7F8', borderRadius: 5 }}>

            <ImageIcon name='search' size={24} containerStyle={{ marginLeft: 10 }} />

            <Menu
              visible={pastSearchesVisible && pastSearches.length > 0}
              style={{ marginTop: 40, borderWidth: 1, overflow: 'hidden', borderColor: '#bbb', flex: 1, marginLeft: -20, }}
              anchor={(
                <TextInput
                  returnKeyType='search'
                  onSubmitEditing={e => setSearchText(e.nativeEvent.text)}
                  style={{ marginHorizontal: 5, height: '100%' }}
                  placeholder='What are you looking for?'
                />
              )}
              onRequestClose={() => setPastSearchesVisibility(false)}
            >
              {pastSearches.map((item, index, arr) => {
                return (
                  <View key={index} style={{ width: windowDimensions.width - 80, padding: 10, borderBottomWidth: index == arr.length - 1 ? 0 : 1, borderColor: '#ccc' }} >
                    <Text>{item.product_name}</Text>
                  </View>
                )
              })}
            </Menu>
          </View>

          <ImageIcon
            containerStyle={{ width: 50, height: 40, backgroundColor: '#F7F7F8', justifyContent: 'center', borderRadius: 5 }}
            onPress={() => setModal({ children: <SortModal visible={sortModalVisibility} setVisibility={setSortModalVisibility} data={sortData} /> })}
            color={Colors.darkGrey}
            size={20}
            name={'filter'} />
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={CategoryList}
        ListFooterComponent={<List />}
      />

    </View>
  );
};

export default Home;


const CategoryItem = ({ item, selected, onSelect }) => {
  return (
    <TouchableOpacity activeOpacity={.9} onPress={() => onSelect(selected ? '' : item.id)} style={{ alignItems: 'center', width: 64, }}>
      <View style={{ backgroundColor: '#f9f9f9', ...shadow, borderRadius: 12, }} >
        <Image style={{ width: 60, height: 60, borderRadius: 10, borderWidth: selected ? 2 : 0, borderColor: Colors.pinkColor + 'ee' }} source={{ uri: IMAGE_BRAND_BASE_URL + item.category_image }} />
      </View>
      <Text numberOfLines={2} style={{ textAlign: 'center', color: selected ? Colors.pinkColor : '#A6ABAE', fontSize: 12, paddingTop: 7, }}>{item.category_name}</Text>
    </TouchableOpacity>
  );
};

const SortModal = ({ data }) => {

  const nameSortOptions = [{ label: 'A to Z', value: 'asc' }, { label: 'Z to A', value: 'desc' }]
  const priceSortOptions = [{ label: 'Ascending', value: 'asc' }, { label: 'Descending', value: 'desc' }]

  const [nameSort, setNameSort] = useState(data?.nameSort)
  const [priceSort, setPriceSort] = useState(data?.priceSort)

  const Header = ({ label }) => (
    <View style={{ padding: 15, backgroundColor: '#eee', borderRadius: 10, }} >
      <Text style={{ fontWeight: 'bold', fontSize: 18 }} >{label}</Text>
    </View>
  )


  const Choices = ({ options, onSelect, value, label }) => {
    return (
      <View>
        <Text style={{ fontSize: 16, padding: 10 }} >{label}</Text>
        <View style={{ height: 1, backgroundColor: '#eee' }} />
        <View style={{ flexDirection: 'row' }} >
          {options.map((option, index) => (
            <TouchableOpacity key={index} onPress={() => onSelect(option)} style={{ padding: 15, flex: 1, backgroundColor: value == option.value ? Colors.pinkColor + '30' : 'white' }} >
              <Text style={{ fontSize: 16, textAlign: 'center' }}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    )
  }

  return (
    <View style={{ paddingHorizontal: 20, paddingBottom: 40, }} >

      <Header label={'Sort'} />

      <View style={{ borderRadius: 10, borderWidth: 2, borderColor: '#eee', marginTop: 15, overflow: 'hidden', backgroundColor: 'white' }}>

        <Choices
          label={'Name'}
          options={nameSortOptions}
          value={nameSortOptions.find(option => option.value == nameSort).value}
          onSelect={option => setNameSort(option.value)} />

        <View style={{ height: 1, backgroundColor: '#eee' }} />

        <Choices
          label={'Price'}
          options={priceSortOptions}
          value={priceSortOptions.find(option => option.value == priceSort).value}
          onSelect={option => setPriceSort(option.value)} />

      </View>

    </View>
  );
};

