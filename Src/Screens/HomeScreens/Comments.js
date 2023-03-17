import React, { useContext } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import Colors from "../../Assets/Colors";
import CommentItem from "../../Components/CommentItem";
import Error from "../../Components/Error";
import { ProductContext } from "../../Providers/ProductProvider";

export default Comments = ({ route }) => {
    const product_id = route.params?.product_id
    const {getProductComments} = useContext(ProductContext)
    const { status, data, refetch } = useQuery(['product_comments', product_id], async () => await getProductComments(product_id))

    switch (status) {
        case 'error':
            return <Error style={{ marginTop: 100 }} message="Error loading product" retry={refetch} />
        case 'loading':
            return <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 100 }} />
        default: return (
            <View style={{ flex: 1, backgroundColor: Colors.white }} >
                <FlatList
                    contentContainerStyle={{ flexGrow: 1, padding: 15 }}
                    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.black30, marginVertical: 10 }} />}
                    renderItem={({ item, index }) => <CommentItem item={item} />}
                    data={data.data?.data?.rows?.filter(r=>r.sender)} />
            </View>
        )
    }

}


const dummyComments = [
    { username: 'Larry Kon', comment: 'Can you ship it out ASAP? Need it for an event.' },
    { username: 'Brad Pit', comment: 'Yes, will ship it out tomorrow.' },
    { username: 'John Doe', comment: 'Thanks you can we maybe lower the price if i buy in bulk.' },
    { username: 'The Weeknd', comment: 'Please let me know when ever there is more color options.' },
    { username: 'Larry Kon', comment: 'Can you ship it out ASAP? Need it for an event.' },
    { username: 'Brad Pit', comment: 'Yes, will ship it out tomorrow.' },
    { username: 'John Doe', comment: 'Thanks you can we maybe lower the price if i buy in bulk.' },
    { username: 'The Weeknd', comment: 'Please let me know when ever there is more color options.' },
    { username: 'Larry Kon', comment: 'Can you ship it out ASAP? Need it for an event.' },
    { username: 'Brad Pit', comment: 'Yes, will ship it out tomorrow.' },
    { username: 'John Doe', comment: 'Thanks you can we maybe lower the price if i buy in bulk.' },
    { username: 'The Weeknd', comment: 'Please let me know when ever there is more color options.' }
]