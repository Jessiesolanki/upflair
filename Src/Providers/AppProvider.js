import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { API, ERROR, LOADING } from ".";

export const AppContext = React.createContext()

export default AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState({ visible: false })

    const getContent =  (params, setState) => { 
        setState(LOADING)
        API.post('listContentManagemnetAtUser', params)
            .then((res) => setState(res.data.data.rows))
            .catch(err => {
                console.log('content error', err, err?.response)
                Alert.alert('Content', err?.response?.data?.message || 'Something went wrong, Please try again.')
                setState(ERROR)
            })
    }

    return (
        <AppContext.Provider value={{
            loading,
            setLoading,
            getContent,
            modal,
            setModal
        }} >
            {children}
        </AppContext.Provider>
    )
}