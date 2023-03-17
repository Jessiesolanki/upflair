import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from ".";
import useLoadingFn from "../Hooks/useLoadingFn";
import { AppContext } from "./AppProvider";
import { AuthContext } from "./AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OrderContext = React.createContext()

export default OrderProvider = ({ children }) => {

    const [TranactionList, setTransactionList] = useState([])

    const [SuccesOrderDetail, setSuccessOrderDetail] = useState({})

    const [OrderDetals, setOrderDetails] = useState(null)

    const [OrderDetailUpdate, setOrderDetailupdate] = useState({})

    const [RemoveOrder, setRemoveOrder] = useState(null)

    const [resChatList, setresChatList] = useState([])

    const [paymentList, setpaymentList] = useState('')

    const { userData } = useContext(AuthContext)

    const submitOffer = useLoadingFn((params) => API.post('sendBidRequest', params))

    const getSellerBidList = () => API.post('sellerBidList')

    const getBuyerBidList = () => API.post('bidlist', { limit: 10, page: 0 })

    const getOrderList = params => API.post('list-order', { ...params, limit: 15 })

    const getOrderListAsBuyer = params => API.post('listAllUserOrder', { ...params, limit: 15 })

    const updateOffer = params => API.post('bidStatusUpdate', params)

    const addOrder = useLoadingFn(async params => API.post('add-order', params).then((e) => {
        console.log(e, 'here is the data')
    }))
    // this is order info
    // http://54.201.160.69:3208/api/order-info
    const getOrderDetail = (params, setdetail) => API.post('order-info', params).then((e) => {
        setRemoveOrder(params)
        setdetail(e.data)
    })
    const UpdateOrderDetail = (params, setdetail) => API.post('update-order-status', params).then((e) => {
        setdetail(e.data)
        setOrderDetailupdate(e)
    })

    const getTransactionList = params => useQuery({
        queryKey: ['Transactionlist', params],
        queryFn: () => API.post('listTransaction', params)

    })
    const listTransactionUser = params => API.post('listTransaction', { limit: 10, ...params })
    const getShipmentCost = params => useQuery({
        queryKey: ['ShipmentCost', params],
        queryFn: () => API.post('createGoShippo', params)

    })
    const createGoShippo = (params, setdetail) => {

        // console.log(params, 'llkk')


        // var myHeaders = new Headers();
        // myHeaders.append("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc3LCJpYXQiOjE2NjU2NDA0MTAsImV4cCI6MTY2NjI0NTIxMH0.Uw8Td_Zl7L8ximzIVJgvqrVVHeyxIxIAUIAA81TLM6Y");
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "order_id": 106,
        //     "length": "5",
        //     "width": "5",
        //     "height": "5",
        //     "distance_unit": "in",
        //     "weight": "2",
        //     "mass_unit": "lb"
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        // fetch("http://54.201.160.69:3208/api/createGoShippo", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));

        API.post('createGoShippo', params).then((e) => {
            setdetail(e.data)
        }

        )
    }



    const createGoShippoTransaction = (params, setdetail) => API.post('createGoShippoTransaction', params).then((e) => {
        setdetail(e.data)
    })



    const getShipmentImage = (success) => API.get("getShipmentImage").then(e => success(e))

    const getCounterOfferChat = async (params) => {
        console.log('getCounterOfferChat')
        const res = await API.post("getCounterOfferChat", { "bid_id": params.queryKey[0] });
        setresChatList(res.data.data.rows)
        return res.data.data.rows;
    };

    const listOfPayMethodOfUser = async (params) => {
        const res = await API.get("listOfPayMethodOfUser", {});
        setpaymentList(res.data)
        return  res.data;
    };

    const attachPMToUser = async (params) => {
        console.log('yessss--->', params)

        const res = await API.post("attachPMToUser", params).catch(function (error) {
            console.log(error, 'error')
        })
        console.log(res, 'res')
        return { data: res.data, params };
    };



    const sendCounterOffer = async (params) => {
        console.log(params, 'sendCounterOffer--------->')
        const res = await API.post("sendCounterOffer", params);
        if (res.data.status) {
            alert(res.data.message)

        }
        return res;
    };
    // sendCounterOffer
    // getShipmentImage

    // 2) { { baseUrlLive } } createGoShippoTransaction
    // {
    //     "rate_object_id": "829ac2e8f94b43948a905adae1dc4ab3",
    //         "shipment_id": "f80e1d7c01ed45abb7a66b883df9ec92",
    //             "order_id": 103,
    //                 "amount": 7.25
    // }

    // method - post




    // const createGoShippo = useLoadingFn(async params => API.post('createGoShippo', params))
    // createGoShippo
    // http://localhost:3208/api/update-order-status

    return (
        <OrderContext.Provider value={{
            getOrderList,
            getSellerBidList,
            submitOffer,
            getBuyerBidList,
            updateOffer,
            addOrder,
            getOrderListAsBuyer,
            getTransactionList,
            TranactionList,
            listTransactionUser,
            getShipmentCost,
            getOrderDetail,
            UpdateOrderDetail,
            RemoveOrder,
            OrderDetals,
            setOrderDetails,
            createGoShippo,
            createGoShippoTransaction,
            SuccesOrderDetail,
            setSuccessOrderDetail,
            getShipmentImage,
            OrderDetailUpdate,
            getCounterOfferChat,
            sendCounterOffer,
            resChatList,
            paymentList,
            setpaymentList,
            setresChatList,
            listOfPayMethodOfUser,
            attachPMToUser
        }} >
            {children}
        </OrderContext.Provider>
    )
}