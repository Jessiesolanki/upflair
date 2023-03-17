import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Colors from '../../Assets/Colors'
import { OrderContext } from '../../Providers/OrderProvider'
import { useMutation } from 'react-query'

const InputComponent = ({ onChangeText, style, placeholder }) => {
    const [focused, setFocused] = useState(false)

    return (
        <TextInput
            keyboardType='numeric'
            onChangeText={onChangeText}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus={true}
            focusable={true}
            style={{ borderBottomWidth: focused ? 2 : 1, marginTop: 5, borderBottomColor: focused ? Colors.pinkColor : Colors.darkGrey, ...style }} />
    )
}

export default function CounterOffer({ navigation ,route}) {
    const { sendCounterOffer,getCounterOfferChat } = useContext(OrderContext)
    const [offer, setOffer] = useState('')


    const counterMutation = useMutation(
        async (params) => await sendCounterOffer(params), {
        onSuccess: async(data) => {
            console.log(data,'this is the data of counter offer')
          await  getCounterOfferChat({queryKey:[route.params.BID_ID]})
            navigation.goBack()
        },
        onError: () => console.log('er')
    })
   


    const onSubmit = () => {
        counterMutation.mutate({
            "bid_id": route.params.BID_ID,
            "offer_amount": offer
        })
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableOpacity onPress={onSubmit}>
                <Text style={{ fontWeight: 'bold' }} >SUBMIT</Text>
            </TouchableOpacity>,
            title: 'Updated!'
        })
    }, [offer])


    return (
        <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: 'white' }}>
            <InputComponent onChangeText={setOffer} placeholder='Counter Offer' />
            <Text style={{ marginTop: 20, color: Colors.darkGrey }} >Your Earnings (if accepted)</Text>
            <InputComponent placeholder='$0.00' autoFocus={true} focusable={true} style={{ height: 40, textAlignVertical: "bottom" }} />
            <Text style={{ marginTop: 20, color: Colors.darkGrey }} >All offers are binding and expire in 24 hours if the buyer accepts, payment will be processed </Text>
        </View>
    )
}

const styles = StyleSheet.create({})