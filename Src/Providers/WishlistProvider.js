import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { API } from ".";
import { AppContext } from "./AppProvider";
import { AuthContext } from "./AuthProvider";

export const WishlistContext = React.createContext()

export default WishlistProvider = ({ children }) => {

    const { userData } = useContext(AuthContext)
    const { setLoading } = useContext(AppContext)
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        if(!userData?.accessToken) setWishlist([])
        else getWishlist()
    }, [userData])

    const addToWishlist = async (product_id) => {
        const params = { product_id, type: 'wishlist' }
        try {
            setWishlist(cv=>[...cv, {product_id}])
            const res = await API.post('add_to_wishlist_or_favourite', params)
            console.log(res.data)
        
        } catch (error) {
            console.log('addToWishlist error', error, error.response)
            Alert.alert('Alert', 'Something went wrong. Please try again.')
        } finally {
            getWishlist()
        }
    }

    const removeFromWishlist = async (id) => {
        try {
            setWishlist(cv=>cv.filter(item=>item.id!=id))
            const res = await API.post('remove-wishlist', {id})  
            console.log(res.data)  
        } catch (error) {
            console.log('removeFromWishlist error', error, error.response)
            Alert.alert('Alert', 'Something went wrong. Please try again.')
        } finally {
            getWishlist()
        }
    }

    const getWishlist = async () => {
        try {
            let res = await API.get('list-wishlist')
            setWishlist(res.data.data)
        } catch (error) {
            console.log('getWishlist error', error, error.response)
        }
    }

    return (
        <WishlistContext.Provider value={{ addToWishlist, wishlist, removeFromWishlist }} >
            {children}
        </WishlistContext.Provider>
    )
}