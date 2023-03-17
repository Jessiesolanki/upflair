// import React, { useState, createRef } from 'react';
// import {
//   StyleSheet,
//   TextInput,
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Keyboard,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   StatusBar,ImageBackground
// } from 'react-native';
// import { useForm } from 'react-hook-form';
// import CustomInput from '../../Components/CustomInput';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Colors from '../../Assets/Colors';

// // import Loader from './Components/Loader';

// const ForgotEmail = ({ navigation }) => {
//   const [value, onChangeText] = React.useState('');

//   const [userEmail, setUserEmail] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errortext, setErrortext] = useState('');

//   const [passwordShow, setPasswordShow] = useState(false);
//   const passwordInputRef = createRef();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = data => {
//     console.log(data
//     );

//   };
//   return (

//     <View style={styles.mainBody}>
//          <ImageBackground  resizeMode='contain'
//                     style={{ width:'100%', height:'100%',flex:1  }}
//                     source={require('../../Assets/Login.png')}> 
//       <SafeAreaView style={{ flex: 1 }} >
//        <View style={{padding:21}}> 
// <View> 
//   <TouchableOpacity onPress={()=>{navigation.navigate('ForgotPassword')}}> 
//           <Image
//             resizeMode='contain'
//             style={{ width: 30, height: 30, marginBottom: 15 }}
//             source={require('../../Assets/arrow_circle.png')} />
// </TouchableOpacity>
// <Image
//             resizeMode='contain'
//             style={{ width: '100%', height: '35%', marginBottom: 15 }}
//             source={require('../../Assets/check_you_email.png')} />
//           <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 10,textAlign:'center' }}>Check your Email</Text>
//           <View style={{alignItems:'center',justifyContent:'center'}}>
//           <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15,textAlign:'center',width:'90%' }}>We have sent you a reset password link on your registered email address.</Text>
//           </View>
//           <TouchableOpacity
//             style={styles.buttonStyle}
//             activeOpacity={0.5}
//             onPress={() => navigation.navigate('SignUp')}
//           >
//             <Text style={styles.buttonTextStyle}>Go to Email</Text>
//           </TouchableOpacity>
          
//           </View>
//           </View>
//       </SafeAreaView>
//       </ImageBackground>
//     </View>
//   );
// };
// export default ForgotEmail;

// const styles = StyleSheet.create({
//   mainBody: {
//     flex: 1,

//     backgroundColor: Colors.white,

//   },
//   SectionStyle: {
//     justifyContent: 'center', alignItems: 'center',
//     flex: 1, backgroundColor: 'red'

//   },
//   buttonStyle: {
//     backgroundColor:Colors.pinkColor,
//     color: '#FFFFFF',
//     height: 65, width:'100%',borderRadius:8,marginVertical:15,
//     alignItems: 'center', justifyContent:'center'

//   },
//   buttonTextStyle: {
//     color: '#FFFFFF',
//     paddingVertical: 10,fontWeight:'bold',
//     fontSize: 18,
//   },
//   inputStyle: {
//     flex: 1,
//     color: 'white',
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderWidth: 1,
//     borderRadius: 30,
//     borderColor: '#dadae8',
//   },
//   registerTextStyle: {
//     color: Colors.darkGrey,
//     textAlign: 'center',
//     // fontWeight: 'bold',
//     fontSize: 14,
//     alignSelf: 'center',
   
//   },
//   errorTextStyle: {
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 14,
//   },
// });

import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,Alert,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../Components/CustomInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Assets/Colors';
import { BASE_URL } from '../../Constant/BaseURL';
import Loader from '../../Components/Loader';
// import Loader from './Components/Loader';

const ResendPassword = ({ navigation ,route}) => {
  const [value, onChangeText] = React.useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [passwordShow, setPasswordShow] = useState(true);
  const passwordInputRef = createRef();

  const validation = () => {
    // console.log('otp print -',route.params.user_id)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setErrortext('');
    if (newPassword.length >= 6&& confirmPassword.length >= 6) {
      resetPassword()
      // console.log('print',newPassword)
      // setErrortext('Please Enter New Password');
      // setErrortext('Please Enter otp');
      return;
    }
    else{
      setErrortext('Please Enter Correct Password');
    }
    // resetPassword()
  }
  const resetPassword = () => {
    let params = {
      accessToken:route.params.token,
      newpwd:newPassword,
      confirmpwd:confirmPassword
       };
       setLoading(true)
       return fetch(BASE_URL+'api/resetPassword', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(params)
       })
         .then((response) => response.json())
         .then((responseJson) => {
           setLoading(false)
           console.log("responseJson onLoginPressHandle", responseJson)
           if (responseJson.status === true) {
            Alert.alert( 'Success',responseJson.message,)
        navigation.navigate('Login')
           }
           else if (responseJson.status === false) {
             alert(responseJson.message)
           }
         })
         .catch((error) => {
        
           console.error(error);
         });
   
     };
  return (

    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <SafeAreaView style={{ flex: 1 }} >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            // justifyContent: 'space-around',
            alignContent: 'center', padding: 21
          }}>
<View> 
  {/* <TouchableOpacity onPress={()=>{navigation.navigate('UserType')}}> 
          <Image
            resizeMode='contain'
            style={{ width: 30, height: 30, marginBottom: 15 }}
            source={require('../../Assets/arrow_circle.png')} />
</TouchableOpacity> */}
          <Text style={{ color: 'black', fontSize: 27, fontWeight: '300', marginVertical: 20 }}>Reset Password</Text>
          {/* <Text style={{ color: Colors.darkGrey, fontSize: 16, marginVertical: 15 }}>Welcome back! {"\n"}Please login to continue</Text> */}
          <KeyboardAvoidingView enabled>

          <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Image
                    resizeMode='contain'
                    style={{ width: 18, height: 18, marginHorizontal: 15 }}
                    source={require('../../Assets/lock.png')} />
                </View>
                <View style={{ width: '66%', }}>
                  <Text style={{  color:'#000' ,marginLeft:Platform.OS === 'android'?5:0 ,marginTop:Platform.OS === 'android'?10:0 }}>New Password</Text>
                  <TextInput
                  style={{}}
                    // style={styles.inputStyle}
                    onChangeText={(UserPassword) =>
                      setNewPassword(UserPassword)
                    }

                    placeholder="Enter new password"
                    placeholderTextColor={Colors.darkGrey}
                   
                    secureTextEntry={passwordShow}
                    blurOnSubmit={false}
                  />
                </View>
                {passwordShow==true?
                      <TouchableOpacity style={{marginTop:Platform.OS === 'android'?20:0}} onPress={() => { passwordShow === true ? setPasswordShow(false) : setPasswordShow(true) }} >
                   
                        <Image
                          resizeMode='contain'
                          style={{ width: 18, height: 18, marginRight: 19, tintColor:Colors.pinkColor }}
                          source={require('../../Assets/hide.png')} />
                      </TouchableOpacity>:
                       <TouchableOpacity style={{marginTop:Platform.OS === 'android'?20:0}} onPress={() => { passwordShow === true ? setPasswordShow(false) : setPasswordShow(true) }} >
                   
                       <Image
                         resizeMode='contain'
                         style={{ width: 18, height: 18, marginRight: 19,  }}
                         source={require('../../Assets/eye.png')} />
                     </TouchableOpacity>
                     
}
              </View>
            </View>
            
            <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Image
                    resizeMode='contain'
                    style={{ width: 18, height: 18, marginHorizontal: 15 }}
                    source={require('../../Assets/lock.png')} />
                </View>
                <View style={{ width: '66%', }}>
                  <Text style={{  color:'#000' ,marginLeft:Platform.OS === 'android'?5:0 ,marginTop:Platform.OS === 'android'?10:0 }}>Confirm Password</Text>
                  <TextInput
                  style={{}}
                    // style={styles.inputStyle}
                    onChangeText={(UserPassword) =>
                      setConfirmPassword(UserPassword)
                    }

                    placeholder="Enter confirm password"
                    placeholderTextColor={Colors.darkGrey}
                   
                    secureTextEntry={passwordShow}
                    blurOnSubmit={false}
                  />
                </View>
                {passwordShow==true?
                      <TouchableOpacity style={{marginTop:Platform.OS === 'android'?20:0}} onPress={() => { passwordShow === true ? setPasswordShow(false) : setPasswordShow(true) }} >
                   
                        <Image
                          resizeMode='contain'
                          style={{ width: 18, height: 18, marginRight: 19, tintColor:Colors.pinkColor }}
                          source={require('../../Assets/hide.png')} />
                      </TouchableOpacity>:
                       <TouchableOpacity style={{marginTop:Platform.OS === 'android'?20:0}} onPress={() => { passwordShow === true ? setPasswordShow(false) : setPasswordShow(true) }} >
                   
                       <Image
                         resizeMode='contain'
                         style={{ width: 18, height: 18, marginRight: 19,  }}
                         source={require('../../Assets/eye.png')} />
                     </TouchableOpacity>
                     
}
              </View>
            </View>

          </KeyboardAvoidingView>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}



          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => 
              validation()
              // navigation.navigate('SignUp')
            }
          >
            <Text style={styles.buttonTextStyle}>Save</Text>
          </TouchableOpacity>
        
          </View>
        
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default ResendPassword;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,

    backgroundColor: Colors.white,

  },
  SectionStyle: {
    justifyContent: 'center', alignItems: 'center',
    flex: 1, backgroundColor: 'red'

  },
  buttonStyle: {
    backgroundColor:Colors.pinkColor,
    color: '#FFFFFF',
    height: 65, width:'100%',borderRadius:8,marginVertical:15,
    alignItems: 'center', justifyContent:'center'

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,fontWeight:'bold',
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
  registerTextStyle: {
    color: Colors.darkGrey,
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
   
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});