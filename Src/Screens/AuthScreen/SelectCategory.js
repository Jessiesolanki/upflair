
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView, ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Assets/Colors';
// import Loader from './Components/Loader';
import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select';
import { BASE_URL } from '../../Constant/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader';

const SelectCategory = ({ navigation }) => {
  const [token,setToken] =useState('');
  useEffect(() => {
   
    getColorList();
    getCategoryList();
    getMeasureList();

  },[]);
 
  const [color, setColor] = useState(false);
  const [colorvalue, setColorValue] = useState(null);
  const [colorArray, setColorArray] = useState([])
 
  const [category, setCategory] = useState(false);
  const [categoryvalue, setCategoryValue] = useState(null);
  const [categoryArray, setCategoryArray] = useState([])
 
  const [measures, setMeasuresOpen] = useState(false);
  const [measuresvalue, setMeasuresValue] = useState(null);
  const [measuresArray, setMeasuresArray] = useState([])
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const validation = () => {
   
    setErrortext('');
    if (!colorvalue && !categoryvalue && !measuresvalue ) {
      setErrortext('Please select all field');
      return;
    }
    if (!colorvalue) {
      setErrortext('Please select color');
      return;
    }
    if (!categoryvalue) {
      setErrortext('Please select category');
      return;
    }
    if (!measuresvalue) {
      setErrortext('Please select measures');
      return;
    }
    CompleteProfile()
  }
  const getColorList = async () => {
  
    const AuthToken = await AsyncStorage.getItem('accessToken');
    console.log('token print',AuthToken)
    setLoading(true)
    return fetch(BASE_URL + 'api/getColor', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': AuthToken
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false)
        if (responseJson.status === true) {
          //    alert('helooo')
          let colorArray = responseJson.data.map((element) => {

            return { 'label': element.COL_1, "value": element.id }

          })
          setColorArray(colorArray)

        }
        else if (responseJson.response === false) {
          alert(responseJson.message)
        }
      })
      .catch((error) => {
        //   this.setState({ isLoading: false })
        console.error('error= ', error);
      });

  };

  const getCategoryList = async () => {
   const AuthToken = await AsyncStorage.getItem('accessToken');
   setLoading(true)
    return fetch(BASE_URL + 'api/getCategory', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': AuthToken },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false)
        console.log("responseJson onLoginPressHandle", responseJson.data,AuthToken)
        if (responseJson.status === true) {
 let newArray = responseJson.data.map((element) => {
 return { 'label': element.category_name, "value": element.id }
 })
          console.log('new array ', newArray)
         setCategoryArray(newArray)
        }
        else if (responseJson.status === false) {
          alert(responseJson.message)
        }
      })
      .catch((error) => {
        console.error('error= ', error);
      });
  };

  const getMeasureList = async () => {

    const AuthToken = await AsyncStorage.getItem('accessToken');
    return fetch(BASE_URL + 'api/getSize', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': AuthToken },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === true) {
 let newArray = responseJson.data.map((element) => {
  return { 'label': element.size, "value": element.id }

          })
          setMeasuresArray(newArray)
          console.log('---',newArray);
        }
        else if (responseJson.status === false) {
          alert(responseJson.message)
        }
      })
      .catch((error) => {
        //   this.setState({ isLoading: false })
        console.error('error= ', error);
      });
  };
  const CompleteProfile = async () => {

    const AuthToken = await AsyncStorage.getItem('accessToken');
    let params = {
      id:14,
        color:colorvalue,
       category: categoryvalue,
       size: measuresvalue
        };
        setLoading(true)
        return fetch(BASE_URL + 'api/completeProfile', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': AuthToken },
          body: JSON.stringify(params)
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false)
            console.log("responseJson onLoginPressHandle", responseJson)
            if (responseJson.status === true) {
              navigation.replace('SelectBrand')
            }
            else if (responseJson.status === false) {
              alert(responseJson.message)
            }
          })
          .catch((error) => {
            // this.setState({ isLoading: false })
            console.error(error);
          });
    
      };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <Loader loading={loading} />
      <ImageBackground resizeMode='contain'
        style={{ width: '100%', height: '100%', flex: 1 }}
        source={require('../../Assets/Login.png')}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <Loader loading={loading} /> */}
          <ScrollView
            style={{ flex: 1, padding: 21 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                <Image
                  resizeMode='contain'
                  style={{ width: 30, height: 30, marginBottom: 5 }}
                  source={require('../../Assets/arrow_circle.png')} />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: Colors.darkGrey }}></Text>
            </View>
            <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginTop: 20, marginBottom: 5 }}>Complete your Profile</Text>
            <Text style={{ color: Colors.darkGrey, fontSize: 14, }}>Complete your profile. The more you tell us, the faster we'll learn your style.</Text>
            <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Image
                    resizeMode='contain'
                    style={{ width: 18, height: 18, marginHorizontal: 15 }}
                    source={require('../../Assets/color.png')} />
                </View>
                <View style={{ width: '77%' }}>
                  <RNPickerSelect
                    style={{}}
                    placeholder={{
                      label: 'Color',
                      value: null,
                    }}
                    textInputProps={{
                      style: {
                        width: 340,
                        // borderWidth: 1,
                        // backgroundColor: Colors.gry_color, fontSize: perfectSize(18), fontFamily: Fonts.Font_BoldItalic,
                        paddingLeft: 5,
                        borderBottomWidth: 0,
                        height: 40,
                        color: Colors.darkGrey,
                      },
                      allowFontScaling: false
                    }}
                    style={{
                      inputAndroid: {
                        // color: Colors.dark_gray,
                      },
                      iconContainer: {
                        top: 10,
                        right: 35,
                      },
                      // placeholder: { color: Colors.dark_gray },
                    }}
                    Icon={() => <View style={{ width: 20, height: 20, }} ><Image
                      resizeMode='contain'
                      style={{ width: 18, height: 18, marginHorizontal: 15 }}
                      source={require('../../Assets/down_arrow.png')} /></View>}
                    onValueChange={(value) => setColorValue(value)}
                    items={colorArray}
                  />

                </View>
              </View>
            </View>

            <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Image
                    resizeMode='contain'
                    style={{ width: 18, height: 18, marginHorizontal: 15,tintColor:Colors.pinkColor, }}
                    source={require('../../Assets/category1.png')} />
                </View>
                <View style={{ width: '77%' }}>
                  <RNPickerSelect
                    style={{}}
                    placeholder={{
                      label: 'Category',
                      value: null,
                    }}
                    textInputProps={{
                      style: {
                        width: 340,
                        // borderWidth: 1,
                        // backgroundColor: Colors.gry_color, fontSize: perfectSize(18), fontFamily: Fonts.Font_BoldItalic,
                        paddingLeft: 5,
                        borderBottomWidth: 0,
                        height: 40,
                        color: Colors.darkGrey,
                      },
                      allowFontScaling: false
                    }}
                    style={{
                      inputAndroid: {
                        // color: Colors.dark_gray,
                      },
                      iconContainer: {
                        top: 10,
                        right: 35,
                      },
                      // placeholder: { color: Colors.dark_gray },
                    }}
                    Icon={() => <View style={{ width: 20, height: 20, }} ><Image
                      resizeMode='contain'
                      style={{ width: 18, height: 18, marginHorizontal: 15 }}
                      source={require('../../Assets/down_arrow.png')} /></View>}
                    onValueChange={(value) => setCategoryValue(value)}
                    items={categoryArray}
                  />

                </View>
              </View>
            </View>

            <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Image
                    resizeMode='contain'
                    style={{ width: 18, height: 18, marginHorizontal: 15 }}
                    source={require('../../Assets/mezor.png')} />
                </View>
                <View style={{ width: '77%' }}>
                  <RNPickerSelect
                    style={{}}
                    placeholder={{
                      label: 'Measures',
                      value: null,
                    }}
                    textInputProps={{
                      style: {
                        width: 340,
                        // borderWidth: 1,
                        // backgroundColor: Colors.gry_color, fontSize: perfectSize(18), fontFamily: Fonts.Font_BoldItalic,
                        paddingLeft: 5,
                        borderBottomWidth: 0,
                        height: 40,
                        color: Colors.darkGrey,
                      },
                      allowFontScaling: false
                    }}
                    style={{
                      inputAndroid: {
                        // color: Colors.dark_gray,
                      },
                      iconContainer: {
                        top: 10,
                        right: 35,
                      },
                      // placeholder: { color: Colors.dark_gray },
                    }}
                    Icon={() => <View style={{ width: 20, height: 20, }} ><Image
                      resizeMode='contain'
                      style={{ width: 18, height: 18, marginHorizontal: 15 }}
                      source={require('../../Assets/down_arrow.png')} /></View>}
                    onValueChange={(value) => setMeasuresValue(value)}
                    items={measuresArray}
                  />

                </View>
              </View>
            </View>

            {errortext != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {errortext}
                  </Text>
                ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                validation()
                // navigation.replace('SelectBrand')
               }}
            >
              <Text style={styles.buttonTextStyle}>Next</Text>
            </TouchableOpacity>

          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
export default SelectCategory;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: Colors.pinkColor,
    color: '#FFFFFF',
    height: 65, width: '100%', borderRadius: 8, marginTop: 10, marginBottom: 25,
    alignItems: 'center', justifyContent: 'center'

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10, fontWeight: 'bold',
    fontSize: 18,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});