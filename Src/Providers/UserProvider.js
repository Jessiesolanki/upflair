import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { API, ERROR, LOADING } from ".";

export const UserContext = React.createContext()

export default UserProvider = ({ children }) => {

    const getUsers =  (params, setState) => { 
        setState(LOADING)
        API.post('wishlistusers', params)
            .then((res) => setState(res.data.data))
            .catch(err => {
                console.log('content error', err, err?.response)
                Alert.alert('Content', err?.response?.data?.message || 'Something went wrong, Please try again.')
                setState(ERROR)
            })
    }

    return (
        <UserContext.Provider value={{
            getUsers
        }} >
            {children}
        </UserContext.Provider>
    )
}