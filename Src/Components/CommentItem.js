import React, { useContext, useMemo, useState } from "react";
import { TouchableOpacity, View, Text, DeviceEventEmitter, TextInput, FlatList } from "react-native";
import { Avatar } from "react-native-elements";
import { useMutation, useQueryClient } from "react-query";
import timeago from "time-ago";
import Colors from "../Assets/Colors";
import { shadow } from "../Assets/Styles";
import { IMAGE_BASE_URL } from "../Constant/BaseURL";
import useDeviceEventEmitter, { EVENTS } from "../Hooks/useDeviceEventEmitter";
import { ProductContext } from "../Providers/ProductProvider";
import { getInitials } from "../Utils/Utility";
import CustomButton from "./CustomButton";
import Divider from "./Divider";

export default CommentItem = ({ item }) => {

    const { replyToComment } = useContext(ProductContext)
    const [replying, setReplying] = useState(false)
    useDeviceEventEmitter({ event: EVENTS.REPLYING, callback: (comment) => setReplying(comment?.id == item.id) })

    const ReplyBox = useMemo(() => () => {
        const [value, setValue] = useState()
        const queryClient = useQueryClient()
        const mutation = useMutation(
            async () => await replyToComment({ comment_id: item.id, message: value }), {
            onSuccess: () => {
                setValue('')
                setReplying(false)
                queryClient.invalidateQueries(['product_comments', item.product_id])
            }
        })

        const onComment = () => {
            if (!value?.trim()) return
            mutation.mutate()
        }

        if (!replying) return null

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4, borderWidth: .5, borderRadius: 8, borderColor: Colors.lightGrey, marginTop: 10, marginHorizontal: -5 }} >
                <TextInput
                    style={{ padding: 10, flex: 1 }}
                    value={value}
                    onChangeText={setValue}
                    placeholder='Place your reply here...' />

                <CustomButton
                    loading={mutation.status == 'loading'}
                    disabled={mutation.status == 'loading'}
                    onPress={onComment}
                    icon='reply'
                    containerStyle={{ marginLeft: 10, borderRadius: 6, height: 40, width: 40, padding: 0, justifyContent: 'center' }} />
            </View>

        )
    }, [replying])

    const Replies = () => {

        const ReplyItem = ({ item, hideDivider }) => (
            <View style={{ paddingLeft: 40,}} >
                <View style={{ flexDirection: 'row', }} >
                    <View style={{ marginLeft: 10, flex: 1 }} >

                        <View style={{ paddingBottom: 5, flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ color: Colors.pinkColor, paddingRight: 5, maxWidth: '60%' }} numberOfLines={1} >@{item.replyUser.username}</Text>
                            <Text style={{ color: Colors.black50, }} >{timeago.ago(new Date(item.createdAt))}</Text>
                        </View>

                        <Text style={{ fontWeight: '300' }} numberOfLines={2} >{item.reply}</Text>
                    </View>
                </View>

               {!hideDivider && <Divider containerStyle={{marginVertical : 5}} />}
            </View>

        )

        if(!item.replies?.length) return null

        return (
            <View style={{marginTop : 10}} >
                {item.replies?.map((item, index, arr) => <ReplyItem hideDivider={arr.length == index+1} item={item} key={index} />)}
            </View>
        )
    }

    return (
        <View >
            <View style={{ flexDirection: 'row' }} >
                <Avatar
                    size={35}
                    rounded
                    title={getInitials(item.sender.username)}
                    containerStyle={{ backgroundColor: Colors.pinkColor, ...shadow }}
                    source={item.sender.profile_image ? { uri: IMAGE_BASE_URL + item.sender.profile_image } : null}
                />
                <View style={{ marginLeft: 10, flex: 1 }} >

                    <View style={{ paddingBottom: 5, flexDirection: 'row', alignItems: 'center' }} >
                        <Text style={{ fontWeight: '500', color: Colors.blackColor, paddingRight: 5, maxWidth: '60%' }} numberOfLines={1} >{item.sender?.first_name ? (item.sender.first_name+' '+item.sender.last_name) : item.sender.username}</Text>
                        <Text style={{ color: Colors.black50, }} >{timeago.ago(new Date(item.createdAt))}</Text>
                        <TouchableOpacity onPress={() => DeviceEventEmitter.emit(EVENTS.REPLYING, replying ? null : item)} style={{ marginLeft: 'auto' }} >
                            <Text style={{ color: replying ? Colors.black50 : Colors.pinkColor, textDecorationLine: 'underline' }} >{replying ? 'Cancel' : 'Reply'}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontWeight: '300' }} numberOfLines={2} >{item.message}</Text>
                </View>
            </View>


            <ReplyBox />

            <Replies />


        </View>
    )
}


const dummyComment = {
    "id": 99,
    "sender_id": 97,
    "chat_id": 1,
    "message": "jkjk",
    "createdAt": "2022-05-20T13:31:12.000Z",
    "updatedAt": "2022-05-20T13:31:12.000Z",
    "sender": {
        "id": 97,
        "title": null,
        "first_name": "yashgehlot",
        "last_name": "gehlot",
        "username": "Yash gehlot",
        "email": "yash@mailinator.com",
        "phone": null,
        "gender": null,
        "address": null,
        "pin_code": null,
        "description": null,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTcsImlhdCI6MTY1NTk3MjQ0NywiZXhwIjoxNjU2NTc3MjQ3fQ.GX8k9NYX6FhooHwAwIXbEDoGlhsTxXmrnQwFBBWS13k",
        "password": "$2a$08$tWvLjxRQmFj3u1mmabCXZeYHyv1qAyADgeuqD/tESDcarzItSatA2",
        "type": 1,
        "profile_image": "uploads/1652357738551--file.jpeg",
        "size": null,
        "color": null,
        "category": null,
        "brand": "[9,8]",
        "status": true,
        "verification_status": 1,
        "is_block": false,
        "is_kyc_approve": false,
        "permanent_block": false,
        "is_register": "1",
        "last_login": "2022-04-30T09:34:20.000Z",
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "complete_profile": 1,
        "createdAt": "2022-04-30T09:34:20.000Z",
        "updatedAt": "2022-06-23T08:20:47.000Z"
    }
}