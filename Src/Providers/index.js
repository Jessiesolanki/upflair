
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import AppProvider from "./AppProvider";
import AuthProvider from "./AuthProvider";
import OrderProvider from "./OrderProvider";
import ProductProvider from "./ProductProvider";
import WishlistProvider from "./WishlistProvider";
import MyOfferProvider from "./MyOfferProvider";
import UserProvider from "./UserProvider";
import NotificationProvider from "./NotificationProvider";
export const LOADING = 'loading'
export const ERROR = 'error'

export default Providers = ({ children }) => {

   
    return (
        <AppProvider>
            <AuthProvider>
                <UserProvider>
                    <ProductProvider>
                        <OrderProvider>
                            <WishlistProvider>
                                    <MyOfferProvider>
                                      <NotificationProvider>
                                        {children}
                                        </NotificationProvider>
                                    </MyOfferProvider>
                            </WishlistProvider>
                        </OrderProvider>
                    </ProductProvider>
                </UserProvider>
            </AuthProvider>
        </AppProvider>
    )
}


const Tokenget =async()=>{
 let  token = await AsyncStorage.getItem('accessToken')
 console.log(token,'token--->')
}

Tokenget()

export const api_base_url = 'http://54.201.160.69:3208/api/'

export const BASE_URL = 'http://54.201.160.69:3208/'

export const API = instance = axios.create({
    baseURL: api_base_url
});

API.interceptors.request.use(async config => ({ ...config, headers: { ...config.headers, 'x-access-token': await AsyncStorage.getItem('accessToken') } }))
