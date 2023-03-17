
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Image, FlatList
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../Assets/Colors';

const MyBid = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#fff' }}>
      <SafeAreaView >
        <StatusBar barStyle={'dark-content'} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ marginTop: 14, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.openDrawer()}>
            <Image style={{ width: 20, height: 20, tintColor: Colors.pinkColor }} source={require('../../Assets/side.png')}>

            </Image>

          </TouchableOpacity>
          <Text style={{ color: Colors.blackColor, fontSize: 18, fontWeight: 'bold', marginVertical: 15 }}>My Offers </Text>
          <View style={{ width: 26, height: 26, borderRadius: 13, borderColor: '#CCC', borderWidth: 1, marginTop: 14, }}>
            <Image style={{ width: 23, height: 23, tintColor: Colors.pinkColor, }} source={require('../../Assets/side_bar_profile.png')} />
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
          <FlatList
            style={{ marginVertical: 10, marginTop: 10, height: '100%', width: '100%', }}
            // horizontal={true}
            numColumns={2}
            horizontal={false}
            data={dummyArray}
            renderItem={({item})=><ProductList item={item} />}
          // keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const ProductList = ({ item }) => {
  const navigation= useNavigation()
  return (
    // FlatList Item
    <View style={{ flex: 1, width: '100%', padding: 5, height: '100%', alignItems: 'center', backgroundColor: '#fff', }}>
      <View style={{
        borderRadius: 10, shadowColor: "#ccc", backgroundColor: '#fff', alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,

        elevation: 5, marginBottom: 10
      }}>

        <Image source={require('../../Assets/images/product1.png')} style={{ width: 152, height: 190, borderRadius: 7, margin: 5 }}>

        </Image>

        <Text
          style={{ color: Colors.blackColor, fontWeight: 'bold', fontSize: 13, marginTop: 5 }}
        >
          {item.value}
        </Text>

        <Image source={require('../../Assets/star_multi.png')} style={{ margin: 5, resizeMode: 'contain', width: 100, height: 25 }} />
        <Text
          style={{ color: Colors.pinkColor, fontWeight: 'bold', fontSize: 15, textAlign: 'left' }}
        >$12.00
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Bid Status')} style={{ backgroundColor: Colors.pinkColor, padding: 5, marginTop: 5, marginBottom: 20, borderRadius: 5, width: 90, height: 33, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}> View </Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};
const dummyArray = [
  { id: '1', value: 'Luxury executive chair', image: require('../../Assets/chair.png') },
  { id: '2', value: 'Black Simple Lamp', image: require('../../Assets/lamp.png') },
  { id: '3', value: 'Luxury executive chair', image: require('../../Assets/table.png') },
  { id: '4', value: 'Black Simple Lamp', image: require('../../Assets/chair.png') },
  { id: '5', value: 'Luxury executive chair', image: require('../../Assets/chair.png') },
  { id: '6', value: 'Black Simple Lamp', image: require('../../Assets/chair.png') },
]
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default MyBid;
