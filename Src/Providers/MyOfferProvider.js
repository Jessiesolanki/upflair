import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { API, ERROR, LOADING } from ".";
import { AppContext } from "./AppProvider";
import { AuthContext } from "./AuthProvider";
export const MyOfferContext = React.createContext()

export default MyOfferProvider = ({ children }) => {

    const { setLoading } = useContext(AppContext)

    const { userData } = useContext(AuthContext)
    const [categories, setCategories] = useState([])


    const getBuyerOfferList = (setState) => {
        const params = {  user_id: userData?.id }
        API.post('bidlist',params)
            .then(res =>{ setState(res.data.data.rows)
  alert('dg')
            console.log('=-=-=',res)
        })
            .catch(err => { console.log(err, err.response); setState(ERROR) })
    }

    return (
        <MyOfferContext.Provider value={{
            // addProduct,
            // categories,
            // getSubCategories,
            // colors,
            // sizes,
            getBuyerOfferList,
            // getOrderDetail
         
        }} >
            {children}
        </MyOfferContext.Provider>
    )
}

// const convertToFormData = params => {
//     let formData = new FormData()
//     Object.entries(params).forEach(([key, value]) => {
//         if (typeof value === 'object' && value?.length > 0) value.forEach(item => formData.append(key, ({ ...item, name: item.fileName })))
//         else formData.append(key, value)
//     })
//     return formData
// }