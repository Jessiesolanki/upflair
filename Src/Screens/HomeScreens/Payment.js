import { useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../../Assets/Colors";
import useStripePaymentSheet from "../../Hooks/useStripePaymentSheet";

const methods = [
    { label: 'Stripe Payment', icon: 'card-outline', color: '#5433FF' }
]

export default Payment = () => {

    const {openPaymentSheet} = useStripePaymentSheet()

    const PaymentMethod = ({ item }) => {
        return (
            <TouchableOpacity onPress={openPaymentSheet} style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Icon name={item.icon} color={item.color} type='ionicon' />
                <Text style={{ paddingLeft: 10, fontWeight: '500', fontSize: 16 }} >{item.label}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }} >
            <FlatList
                contentContainerStyle={{ padding: 15 }}
                renderItem={PaymentMethod}
                data={methods} />
        </View>
    )
}


const response = {
    "paymentIntent": {
        "id": "pi_3LJFpFAq5oX68JYz1G5blpC8",
        "object": "payment_intent",
        "allowed_source_types": [
            "card"
        ],
        "amount": 110,
        "amount_capturable": 0,
        "amount_details": {
            "tip": {}
        },
        "amount_received": 0,
        "application": null,
        "application_fee_amount": null,
        "automatic_payment_methods": {
            "enabled": true
        },
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "charges": {
            "object": "list",
            "data": [],
            "has_more": false,
            "total_count": 0,
            "url": "/v1/charges?payment_intent=pi_3LJFpFAq5oX68JYz1G5blpC8"
        },
        "client_secret": "pi_3LJFpFAq5oX68JYz1G5blpC8_secret_eBRgSSux8AwoRSvfvcHDtlkRF",
        "confirmation_method": "automatic",
        "created": 1657281505,
        "currency": "usd",
        "customer": "cus_M1IPPXWO5EMaDz",
        "description": null,
        "invoice": null,
        "last_payment_error": null,
        "livemode": false,
        "metadata": {
            "product_id": "4518"
        },
        "next_action": null,
        "next_source_action": null,
        "on_behalf_of": null,
        "payment_method": null,
        "payment_method_options": {
            "card": {
                "installments": null,
                "mandate_options": null,
                "network": null,
                "request_three_d_secure": "automatic"
            }
        },
        "payment_method_types": [
            "card"
        ],
        "processing": null,
        "receipt_email": null,
        "review": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "statement_descriptor": null,
        "statement_descriptor_suffix": null,
        "status": "requires_source",
        "transfer_data": null,
        "transfer_group": null
    },
    "ephemeralKey": "ek_test_YWNjdF8xQnRGdkdBcTVvWDY4Sll6LDZKR2Y2UkhCcGxzdEVXcXNjSVQwSXJSOHVsNUhsemk_00RfxEngeP",
    "customer": "cus_M1IPPXWO5EMaDz",
    "publishableKey": "pk_test_NcqscqefIM1i0NzWdXdJGk8C"
}