import React, { useContext } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../Assets/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Error from '../../Components/Error';
import { OrderContext } from '../../Providers/OrderProvider';
import { useQuery } from 'react-query';
import OrderItem from '../../Components/OrderItem';

const Tab = createMaterialTopTabNavigator()
const MyOrder = () => {

  const { getOrderListAsBuyer } = useContext(OrderContext)

  const List = ({ type }) => {

    const { status, data, refetch, remove } = useQuery(['buyer-order-list', type], () => getOrderListAsBuyer({ type, page: 0 }))

    const insets = useSafeAreaInsets()

    return (
      <FlatList
        ListFooterComponent={() => data ? null : <ActivityIndicator size={'large'} color={Colors.pinkColor} style={{ alignSelf: 'center', padding: 50 }} />}
        style={{ backgroundColor: Colors.white }}
        ListEmptyComponent={() => <Error visible={status == 'success' || status == 'error'} style={{ paddingTop: 80 }} message="No products yet." retry={() => refetch(remove)} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 1, marginVertical: 10, backgroundColor: Colors.black30 }} />}
        contentContainerStyle={{ flexGrow: 1, padding: 15, paddingBottom: insets.bottom + 15 }}
        renderItem={({ item }) => <OrderItem item={item} />}
        data={data?.data?.data?.rows} />
    )
  }

  const InProgress = () => <List type={'1'} />
  const Shipped = () => <List type={'2'} />
  const Completed = () => <List type={'3'} />

  return (
    <Tab.Navigator
      style={{ flexGrow: 1 }}
      offscreenPageLimit={7}
      sceneContainerStyle={{ flex: 1, overflow: 'visible' }}
      screenOptions={{
        // tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: Colors.black20, height: '100%' },
        tabBarActiveTintColor: Colors.blackColor,
        tabBarInactiveTintColor: Colors.blackColor, tabBarLabelStyle: { fontSize: 15, fontWeight: '300', textTransform: 'none', marginTop: -6 },
        tabBarStyle: { height: 40, borderBottomWidth: .3, borderColor: Colors.black30 },
      }}>
      <Tab.Screen name="In Progress" component={InProgress} />
      <Tab.Screen name="Shipped" component={Shipped} />
      <Tab.Screen name="Completed" component={Completed} />
    </Tab.Navigator>
  );
};

export default MyOrder;
