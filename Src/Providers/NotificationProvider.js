import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { API } from ".";
import { AppContext } from "./AppProvider";
import { AuthContext } from "./AuthProvider";

export const NotificationContext = React.createContext()

export default NotificationProvider = ({ children }) => {

    const { userData } = useContext(AuthContext)
    const { setLoading } = useContext(AppContext)
    const [notificationlist, setNotificationslist] = useState([])

    useEffect(() => {
        if(!userData?.accessToken) getNotificationslists([])
        else getNotificationslists()
    }, [userData])

   

    const getNotificationslists = params => API.post('notificationList', {limit : 10, ...params})

    return (
        <NotificationContext.Provider value={{  getNotificationslists }} >
            {children}
        </NotificationContext.Provider>
    )
}