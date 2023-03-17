import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { API, BASE_URL, ERROR, LOADING } from ".";
import useDeviceEventEmitter, { EVENTS } from "../Hooks/useDeviceEventEmitter";
import useLoadingFn from "../Hooks/useLoadingFn";
import { AppContext } from "./AppProvider";
export const AuthContext = React.createContext()

export default AuthProvider = ({ children }) => {

    const { setLoading } = useContext(AppContext)
    const [userData, setUserData] = useState()
    const [states, setStates] = useState([])
    const [shippingAddresses, setShippingAddresses] = useState([])

    useDeviceEventEmitter({ event: EVENTS.USER_DATA_UPDATED, callback : ()=>getUserDetails()})

    useEffect(() => {
        AsyncStorage.getItem('user_info',).then((user_info) => {
            if (!user_info) return
            console.log('user info >', JSON.stringify(JSON.parse(user_info), null, 2))
            setUserData(JSON.parse(user_info).data)
            getUserDetails()
        })
    }, [])

    useEffect(() => {
        if (!userData?.accessToken) return
        getStates()
    }, [userData])


    const getStates = () => API.get('getState').then(res => setStates(res.data.data))

    const getCities = (params, setState) => params?.state_id ? API.post('getCity', params).then(res => setState(res.data.data)) : null

    const getUserDetails = () => API.get('getAllShippingAddress').then(res => {
        AsyncStorage.setItem('user_info', JSON.stringify(res.data))
        AsyncStorage.setItem('accessToken', res.data.data.accessToken)
        setUserData(res.data.data)
    })

    const login = (params, onSuccess) => {
        setLoading(true)
        API.post('login', params)
            .then((res) => {
                setUserData(res.data.data)
                AsyncStorage.setItem('accessToken', res.data.data.accessToken)

                AsyncStorage.setItem('user_info', JSON.stringify(res.data))
                if (params.rememberMe) {
                    console.log('print sucess login', params)
                    AsyncStorage.setItem('user_Login', JSON.stringify(params))
                    // let data = JSON.parse(await AsyncStorage.getItem('user_Login'));
                    // console.log('under api rember data',data) 
                }
                getUserDetails()
                onSuccess()
            }).catch(err => {
                console.log('login error', err, err?.response)
                Alert.alert('Login', err?.response?.data?.message || 'Something went wrong, Please try again.')
            }).finally(() => setLoading(false))
    }

    const signUp = async (data, onSuccess) => {
        setLoading(true)
        var myHeaders = new Headers();

        var formData = new FormData()

        Object.entries(data).forEach(([key, value]) => key == 'profile-file' ? formData.append(key, { ...value, name: value.fileName }) : formData.append(key, value))

        console.log(JSON.stringify(formData, null, 2))

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        };

        fetch(BASE_URL + "api/signup", requestOptions)
            .then(response => response.json())
            .then((json) => {
                if (json?.response) {
                    setUserData(json?.data)
                    onSuccess()
                    AsyncStorage.setItem('user_info', JSON.stringify(json))
                    AsyncStorage.setItem('accessToken', json?.data.accessToken)

                } else {
                    console.log('signup error', json,)
                    Alert.alert('SignUp', json?.message || 'Something went wrong, Please try again.')
                }

            }).catch(error => console.log('error', error))
            .finally(() => setLoading(false))
    }

    const updateProfile = async (data) => {
        setLoading(true)

        var formData = new FormData()

        formData.append("email", userData.email);
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("username", data.username);
        formData.append("gender", userData.gender);
        if (data['profile-file']) formData.append('profile-file', { type: 'image/jpeg', uri: data['profile-file'].uri, name: 'file.jpeg' });


        console.log(JSON.stringify(formData, null, 2))

        var requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': userData?.accessToken
            },
            body: formData,
        };

        fetch(BASE_URL + 'api/updateProfile', requestOptions)
            .then(response => response.json())
            .then((json) => {
                if (json?.response) {
                    getUserDetails()
                } else {
                    console.log('updateProfile error', json,)
                    Alert.alert('Update Profile', json?.message || 'Something went wrong, Please try again.')
                }

            }).catch(error => console.log('error', error))
            .finally(() => setLoading(false))
    }

    const addShippingAddress = (params, onSuccess) => {
        setLoading(true)
        API.post('addShippingAddress', { ...params, username: userData.username, country: 233 })
            .then(onSuccess)
            .catch(err => {
                console.log('addShippingAddress error', err, err?.response)
                Alert.alert('Shipping Address', err?.response?.data?.message || 'Something went wrong, Please try again.')
            }).finally(() => setLoading(false))
    }

    const switchAccount = () => {
        API.get('switchAccount')
    }

    const changePassword = useLoadingFn(async (params) => {
        await API.post('changePassword', params)
    })

    const selectAddress = useLoadingFn((params) => API.post('selectShippingAddress', params))

    const deleteAddress = useLoadingFn((params) => API.post('deleteShippingAddress', params))

    const updateAddress = useLoadingFn((params) => API.post('updateShippingAddress', {...params, username: userData.username, country: 233 }))

    const updateKycData = useLoadingFn((params) => API.post('kyc', {...params, country_id : 233}))

    return (
        <AuthContext.Provider value={{
            userData,
            login,
            switchAccount,
            signUp,
            states,
            getCities,
            addShippingAddress,
            updateProfile,
            changePassword,
            selectAddress,
            deleteAddress,
            updateAddress,
            updateKycData
        }} >
            {children}
        </AuthContext.Provider>
    )
}