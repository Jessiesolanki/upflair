import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../Assets/Colors";
import ImageIcon from "../../Components/ImageIcon";

export default BidStatus = ({route}) => {
    const insets = useSafeAreaInsets()
    useEffect(() => {
        getBuyerbidlist();
      }, []);
      const getBuyerbidlist = async () => {

        var bodyParam = {
          // id:savedUserData.data.id
        }
        const AuthToken = await AsyncStorage.getItem('accessToken');
        setLoading(true)
        return fetch(BASE_URL + 'api/bidHistory', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': AuthToken
          },
          body: JSON.stringify(bodyParam)
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false)
            if (responseJson.response === true) {
              setBuyerBidList(responseJson.data.rows)
            }
            else if (responseJson.response === false) {
              alert(responseJson.message)
            }
          })
          .catch((error) => {
            console.error('error= ', error);
          });
      };
    const StatusItem = () => {
        const Btn = ({ label, color, onPress }) => (
            <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: color, borderRadius: 6,marginRight:5, alignSelf: 'flex-start', marginTop: 8, flexDirection: 'row', alignItems: 'center', }} >
                <Text style={{ fontWeight: 'bold', color: Colors.white }} >{label}</Text>
            </TouchableOpacity>
        )
        return (
            <View style={{flexDirection : 'row'}} >
                <Image style={{height : 110, width : 110, borderRadius : 3}} source={{uri :route.params.BidDetail. user.profile_image}} />
                <View style={{paddingLeft  :15}} >
                    <Text style={{fontSize : 16, fontWeight : 'bold', color : Colors.darkGrey, paddingBottom  :5}} >{route.params.BidDetail?. user.username}</Text>
                    <Text style={{fontSize : 16, fontWeight: 'bold', color : Colors.pinkColor}} >$50.00</Text>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Btn label={'Accept'} color ={Colors.green} />
                    <Btn label={'Cancel'} color ={Colors.darkGrey} />
                    </View>
                </View>
    
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
                 <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',marginTop:15}}>In Progress....!</Text>
     
            <FlatList
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor : '#e5e5e5', marginVertical : 15 }} />}
                contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: insets.bottom + 20 }}
                renderItem={StatusItem}
                data={[1, 2, 3, 4, 5]} />
        </View>
    )
}

