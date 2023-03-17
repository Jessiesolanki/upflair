
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView, ImageBackground, Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Assets/Colors';
import RNPickerSelect from 'react-native-picker-select';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import axios from 'axios';
import { BASE_URL } from '../../Constant/BaseURL';
const UpdateProduct = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordShow, setPasswordShow] = useState(true);
    const [errortext, setErrortext] = useState('');
    const [filePath, setFilePath] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [erroremail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);

    const lastNameInputRef = createRef();
    const usernameInputRef = createRef();
    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }

                setFilePath(response);
            });
        }
    };

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            // console.log('Response =- ', response?.assets[0]?.uri);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            setFilePath(response?.assets[0]?.uri);
        });
    };

    const validation = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let pass = /^[0-9]{1,6}$/;

        setErrortext('');
        setErrorEmail('');
        setErrorFirstName('');
        setErrorLastName('');
        setErrorName('');
        setErrorPassword('');
        if (!firstName) {
            setErrorFirstName('Please enter first name');
            return;
        }
        if (!lastName) {
            setErrorLastName('Please enter last name');
            return;
        }
        if (reg.test(userEmail) === false) {
            setErrorEmail('Please enter valid email address');
            return;
        }
        if (!userName) {
            setErrorName('Please enter name');
            return;
        }
        // if (!userAddress) {
        //   setErrortext('Please enter Address');
        //   return;
        // }

        if (!userPassword) {
            setErrorPassword('Please enter Password');
            return;
        }
        if (pass.test(userPassword) === false) {
            setErrorPassword('Please enter minimum 6 digit password');
            return;
        }
        SignUpApi()
    }

    const SignUpApi = () => {
        // let params = {
        //       email: userEmail,
        //       first_name: firstName,
        //       last_name: lastName,
        //       username: userName,
        //       gender: userGender,
        //       type: "2",
        //       password: userPassword
        //     };
        var data = new FormData()
        if (filePath) {
            data.append('profile-file', { type: 'image/jpeg', uri: filePath, name: 'file.jpeg' });
        }

        data.append("email", userEmail);
        data.append("first_name", firstName);
        data.append("last_name", lastName);
        data.append("username", userName);
        // data.append( "gender",userGender);
        data.append("type", "2");
        data.append("password", userPassword);
        setLoading(true)
        return fetch(BASE_URL + 'api/signup', {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                'content-type': 'multipart/form-data'
            },
            // body: JSON.stringify(params)
            body: data
        })

            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false)
                console.log("responseJson onLoginPressHandle", responseJson)
                if (responseJson.response === true) {
                    AsyncStorage.setItem('accessToken', responseJson.data.accessToken);
                    AsyncStorage.setItem('user_info', JSON.stringify(responseJson))
                    navigation.navigate('SelectCategory')
                }
                else if (responseJson.response === false) {
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

            <SafeAreaView style={{ flex: 1 }}>
                <Modal
                    style={{ flex: 1, width: 200, height: 100 }}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 22
                    }}>
                        <View style={{
                            width: '70%', height: 150, backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5
                        }}>
                            <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: Colors.pinkColor }}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                // style={styles.buttonStyle}
                                onPress={() => { chooseFile('photo'), setModalVisible(false) }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Pick from Gallery</Text>
                            </TouchableOpacity>
                            <View style={{ width: 200, height: 1, backgroundColor: Colors.pinkColor, marginVertical: 5 }} />
                            <TouchableOpacity
                                activeOpacity={0.5}
                                // style={styles.buttonStyle}
                                onPress={() => { captureImage('photo'), setModalVisible(false) }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Take Picture
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
                {/* <Loader loading={loading} /> */}

                <ScrollView
                    style={{ flex: 1, padding: 21 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('MyProduct') }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: 30, height: 30, marginBottom: 0 }}
                                source={require('../../Assets/arrow_circle.png')} />
                        </TouchableOpacity>
                        <Text style={{ color: Colors.headingTextColor, fontSize: 16, fontWeight: 'bold', }}>Listing Details</Text>
                        <View style={{ width: 20 }} />
                    </View >
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: '500', marginTop: 25 }}>Upload Images {"&"} Video</Text>

                    {filePath ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: Colors.borderColor, borderWidth: 1, borderRadius: 5, width: 90, height: 90, }}>
                            <TouchableOpacity style={{}} onPress={() => setModalVisible(true)}>
                                <Image
                                    resizeMode='contain'
                                    source={{ uri: filePath }}
                                    style={{ width: 82, height: 82 }}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: Colors.borderColor, borderWidth: 1, borderRadius: 5, width: 90, height: 90, marginVertical: 15 }}>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => setModalVisible(true)}>
                                <Image
                                    source={require('../../Assets/add.png')}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        resizeMode: 'contain',

                                    }}
                                />
                                <Text style={{ color: Colors.borderColor, fontSize: 12, marginTop: 5 }}>Add photo</Text>
                            </TouchableOpacity>


                        </View>
                    }
                    {/* <TouchableOpacity style={{ borderColor: Colors.pinkColor, borderWidth: 1, width: '100%', height: 68, borderRadius: 7, marginBottom: 7, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.pinkColor }}>Add More Photos or Videos</Text>
                    </TouchableOpacity> */}
                    <KeyboardAvoidingView enabled>
                        <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, justifyContent: 'center', marginBottom: 10, backgroundColor: Colors.textInputBGColor }}>
                            <View style={{ marginLeft: 10 }}>

                                <Text style={{ color: Colors.subHeadingTextColor, fontSize: 12, marginLeft: Platform.OS === 'android' ? 5 : 0, marginTop: Platform.OS === 'android' ? 5 : 0, marginBottom: 5 }}>Product Name (required)</Text>
                                <TextInput
                                    // style={styles.inputStyle}
                                    onChangeText={(firstName) => setFirstName(firstName)}
                                    fontSize={16}
                                    placeholder="Dummy"
                                    placeholderTextColor={Colors.headingTextColor}
                                    autoCapitalize="sentences"
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        lastNameInputRef.current && lastNameInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>
                        {errorFirstName != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errorFirstName}
                            </Text>
                        ) : null}
                                               <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, justifyContent: 'center', marginBottom: 10, backgroundColor: Colors.textInputBGColor,paddingLeft:10 }}> 
                        <RNPickerSelect
                            style={{}}
                            placeholder={{
                                label: 'Select Category',
                                value: null,
                            }}
                            textInputProps={{
                                style: {
                                    width: 340,paddingLeft: 5,
                                    borderBottomWidth: 0,
                                    height: 40,
                                    color: Colors.headingTextColor,fontSize:16,
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
                            items={[{ label: 'hello', value: 'hello' }]}
                        />
                        </View>
                        <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, justifyContent: 'center', marginBottom: 10, backgroundColor: Colors.textInputBGColor,paddingLeft:10 }}> 
                        <RNPickerSelect
                            style={{}}
                            placeholder={{
                                label: 'Select Sub-Category',
                                value: null,
                            }}
                            textInputProps={{
                                style: {
                                    width: 340,paddingLeft: 5,
                                    borderBottomWidth: 0,
                                    height: 40,
                                    color: Colors.headingTextColor,fontSize:16,
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
                                style={{ width: 18, height: 18, marginHorizontal: 15,tintColor:Colors.headingTextColor }}
                                source={require('../../Assets/down_arrow.png')} /></View>}
                            onValueChange={(value) => setColorValue(value)}
                            items={[{ label: 'hello', value: 'hello' }]}
                        />
                        </View>
                        <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, justifyContent: 'center', marginBottom: 10, backgroundColor: Colors.textInputBGColor }}>


                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: Colors.subHeadingTextColor, fontSize: 12, marginLeft: Platform.OS === 'android' ? 5 : 0, marginTop: Platform.OS === 'android' ? 5 : 0, marginBottom: 5 }}>Brand Name(required)</Text>
                                <TextInput
                                    // style={styles.inputStyle}
                                    onChangeText={(UserName) => setLastName(UserName)}
                                    fontSize={16}
                                    placeholder="Enter Brand Name"
                                    placeholderTextColor={Colors.headingTextColor}
                                    autoCapitalize="sentences"
                                    returnKeyType="next"
                                    ref={lastNameInputRef}
                                    onSubmitEditing={() =>
                                        emailInputRef.current && emailInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>
                        {errorLastName != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errorLastName}
                            </Text>
                        ) : null}
                         <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, justifyContent: 'center', marginBottom: 10, backgroundColor: Colors.textInputBGColor,paddingLeft:10 }}> 
                        <RNPickerSelect
                            style={{}}
                            placeholder={{
                                label: 'Select Size',
                                value: null,
                            }}
                            textInputProps={{
                                style: {
                                    width: 340,paddingLeft: 5,
                                    borderBottomWidth: 0,
                                    height: 40,
                                    color: Colors.headingTextColor,fontSize:16,
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
                            // onValueChange={(value) => setColorValue(value)}
                            items={[{ label: 'hello', value: 'hello' }]}
                        />
                        </View>
                        <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, justifyContent: 'center', marginBottom: 10, backgroundColor: Colors.textInputBGColor,paddingLeft:10 }}> 
                        <RNPickerSelect
                            style={{}}
                            placeholder={{
                                label: 'Select Color',
                                value: null,
                            }}
                            textInputProps={{
                                style: {
                                    width: 340,paddingLeft: 5,
                                    borderBottomWidth: 0,
                                    height: 40,
                                    color: Colors.headingTextColor,fontSize:16,
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
                            items={[{ label: 'hello', value: 'hello' }]}
                        />
                        </View>
                        <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, justifyContent: 'center', marginBottom: 10, backgroundColor: Colors.textInputBGColor }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: Colors.subHeadingTextColor, fontSize: 12, marginLeft: Platform.OS === 'android' ? 5 : 0, marginTop: Platform.OS === 'android' ? 10 : 0 }}>Product Describtion (required)</Text>
                                <TextInput
                                    // style={styles.inputStyle}
                                    onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                    fontSize={16}
                                    placeholder="Dummy"
                                    placeholderTextColor={Colors.headingTextColor}
                                    keyboardType="email-address"
                                    ref={emailInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        usernameInputRef.current &&
                                        usernameInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            </View>

                        </View>
                        {erroremail != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {erroremail}
                            </Text>
                        ) : null}
                        <View style={{ width: '100%', height: 70, borderRadius: 7, borderWidth: 1, borderColor: Colors.borderColor, marginTop: 5, justifyContent: 'center', marginBottom: 10, backgroundColor: Colors.textInputBGColor,paddingLeft:10 }}>
                            <View style={{ }}>
                                <Text style={{ color: Colors.subHeadingTextColor, fontSize: 12, marginLeft: Platform.OS === 'android' ? 5 : 0, marginTop: Platform.OS === 'android' ? 10 : 0 }}>Product Price (incl. of tax; required)</Text>
                                <TextInput
                                    // style={styles.inputStyle}
                                    onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                    fontSize={16}
                                    placeholder="150$"
                                    placeholderTextColor={Colors.headingTextColor}
                                    keyboardType="email-address"
                                    ref={emailInputRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() =>
                                        usernameInputRef.current &&
                                        usernameInputRef.current.focus()
                                    }
                                    blurOnSubmit={false}
                                />
                            </View>

                        </View>
                        {erroremail != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {erroremail}
                            </Text>
                        ) : null}
                        {errorName != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errorName}
                            </Text>
                        ) : null}

                        {errorPassword != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errorPassword}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                validation()
                                // navigation.navigate('SelectCategory')
                            }}
                        >
                            <Text style={styles.buttonTextStyle}>Add New Product</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};
export default UpdateProduct;

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
        textAlign: 'left',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});