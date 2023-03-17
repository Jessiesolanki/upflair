import { useEffect } from "react"
import { DeviceEventEmitter } from "react-native"

export default useDeviceEventEmitter = ({ event, callback }) => {

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener(event, callback)
        return ()=>{
            if(DeviceEventEmitter.listenerCount(event) > 0) subscription.remove()
        }
    }, [])
}

export const EVENTS = {
    REPLYING : 'replying',
    USER_DATA_UPDATED : 'user data updated'
}