import React ,{useEffect} from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../Assets/Colors";
import ImageIcon from "../../Components/ImageIcon";

export default Discover = () => {

  useEffect(() => {
   console.log('api');
  }, [])
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} >

      <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',marginTop:15}}>In Progress....!</Text>
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e5e5e5', marginVertical: 15 }} />}
        contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: insets.bottom + 20 }}
        renderItem={NotificationItem}
        data={[1, 2, 3, 4]} /> */}
    </View>
  )
}

const NotificationItem = () => {
  const Btn = ({ label, color, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: color, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8, flexDirection: 'row', alignItems: 'center', }} >
      <Text style={{ fontWeight: 'bold', color: Colors.white }} >{label}</Text>
    </TouchableOpacity>
  )
  return (
    <TouchableOpacity style={{ flexDirection: 'row' }} >
      <Image style={{ height: 75, width: 75, borderRadius: 6 }} source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80' }} />
      <View style={{ paddingHorizontal: 15, flex : 1 }} >
        <Text style={{ fontWeight: 'bold',  paddingBottom: 5, }} >Your order #94303829 has been shipped successfully.</Text>
        <Text style={{ fontSize: 12, color : Colors.darkGrey }} >Please help us confirm and rate to get 10% off from your next order.</Text>
      </View>
    </TouchableOpacity>
  )
}