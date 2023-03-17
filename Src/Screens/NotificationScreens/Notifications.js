import React ,{useEffect,useContext} from "react";
import { FlatList, Image, Text, TouchableOpacity, View ,ActivityIndicator} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../Assets/Colors";
import ImageIcon from "../../Components/ImageIcon";
import { IMAGE_BRAND_BASE_URL } from '../../Constant/BaseURL';
import { useInfiniteQuery } from "react-query";
import Error from "../../Components/Error";
import { NotificationContext } from '../../Providers/NotificationProvider';
import timeago from "time-ago";
export default Notifications = () => {

  const { getNotificationslists } = useContext(NotificationContext)

  
  const getParams = () => ({search_key:'', sorting:'desc',page: 0})

const {status,data,fetchNextPage,hasNextPage,refetch} = useInfiniteQuery(['notificationList', getParams()], ({ pageParam = getParams() }) => getNotificationslists(pageParam),
    {
        getNextPageParam: lastPage => {
            if (!lastPage) return undefined
            if ((lastPage?.data?.currentPage + 1) >= lastPage?.data?.totalPages) return undefined
            return { ...getParams(), page: lastPage?.data?.currentPage + 1 }
        }
    }
)

 
  const insets = useSafeAreaInsets()
  switch (status) {
    case 'error':
      return <Error style={{ paddingTop: 80 }} message="Error loading notification" retry={refetch} />
    case 'loading':
      return <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 15 }} />
    default:
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
 <FlatList
              onEndReachedThreshold={.1}
              onEndReached={hasNextPage ? fetchNextPage : null}
            
              ListFooterComponent={hasNextPage ? <ActivityIndicator color={Colors.pinkColor} size={'large'} style={{ alignItems: 'center', padding: 20 }} /> : null}
              ListEmptyComponent={<Error style={{ paddingTop: 80 }} message="No Notification Found" retry={refetch} />}
              contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: insets.bottom + 20 }}
              ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e5e5e5', marginVertical: 15 }} />}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              style={{backgroundColor : Colors.white}}
              data={data?.pages?.map(page => page?.data?.data?.rows).reduce((t, c) => [...t, ...c], [])}
              renderItem={({ item, index }) => <NotificationItem item={item} index={index} />}
            /> 

    </View>
  )
      }
}

const NotificationItem = (item,index) => {
  
  const Btn = ({ label, color, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: color, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8, flexDirection: 'row', alignItems: 'center', }} >
      <Text style={{ fontWeight: 'bold', color: Colors.white }} >{label}</Text>
    </TouchableOpacity>
  )
  return (
    <TouchableOpacity style={{ flexDirection: 'row' }} >
      <Image style={{ height: 75, width: 75, borderRadius: 6 }} source={{ uri: IMAGE_BRAND_BASE_URL +item?.item?.user?.profile_image }} />
      <View style={{ paddingHorizontal: 15, flex : 1 }} >
        <Text style={{ fontWeight: 'bold',  paddingBottom: 5, }} >{item?.item?.title}</Text>
        <Text style={{ fontSize: 12, color : Colors.darkGrey }} >{item?.item?.message}</Text>
        <Text sstyle={{ color: Colors.black50, }} >{timeago.ago(new Date(item?.item?.createdAt))}</Text>
      </View>
    </TouchableOpacity>
  )
}