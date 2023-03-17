
import React, { useContext, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../Assets/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Error from '../../Components/Error';
import { OrderContext } from '../../Providers/OrderProvider';
import { useQuery } from 'react-query';
import OrderItem from '../../Components/OrderItem';
const Tab = createMaterialTopTabNavigator()
const MySales = ({navigation}) => {

  const { getOrderList, RemoveOrder,OrderDetailUpdate } = useContext(OrderContext)

  const List = ({ type }) => {

    const { status, data, refetch, remove } = useQuery(['order-list', type], () => getOrderList({ type, page: 0 }))

    const insets = useSafeAreaInsets()

    useEffect(()=>{},[OrderDetailUpdate,navigation])

    return (
      <FlatList
        ListFooterComponent={() => data ? null : <ActivityIndicator size={'large'} color={Colors.pinkColor} style={{ alignSelf: 'center', padding: 50 }} />}
        style={{ backgroundColor: Colors.white }}
        ListEmptyComponent={() => <Error visible={status == 'success' || status == 'error'} style={{ paddingTop: 80 }} message="No products yet." retry={() => refetch(remove)} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 1, marginVertical: 10, backgroundColor: Colors.black30 }} />}
        contentContainerStyle={{ flexGrow: 1, padding: 15, paddingBottom: insets.bottom + 15 }}
        renderItem={({ item }) => <OrderItem type={type} item={item} />}
        data={data?.data?.data?.rows} />
    )
  }



  useEffect(() => {

  }, [RemoveOrder])

  const Processing = () => <List type={'1'} />
  const Delivered = () => <List type={'2'} />
  const Canceled = () => <List type={'3'} />

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
      <Tab.Screen name="Processing" component={Processing} />
      <Tab.Screen name="Delivered" component={Delivered} />
      <Tab.Screen name="Canceled" component={Canceled} />
    </Tab.Navigator>
  );
};

export default MySales;
