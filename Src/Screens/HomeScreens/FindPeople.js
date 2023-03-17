import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from '../../Assets/Colors'
import { shadow } from '../../Assets/Styles'
import Divider from '../../Components/Divider'
import Error from '../../Components/Error'
import ImageIcon from '../../Components/ImageIcon'
import { ERROR, LOADING, BASE_URL } from '../../Providers'
import { UserContext } from '../../Providers/UserProvider'
import { getInitials } from '../../Utils/Utility'

export default FindPeople = ({ navigation }) => {

    const insets = useSafeAreaInsets()
    const [searchText, setSearchText] = useState('')
    const [users, setUsers] = useState(LOADING)
    const { getUsers } = useContext(UserContext)

    useEffect(() => {
        getUsers({}, setUsers)
    }, [])

    const ListHeader = () => {

        const items = [
            {
                label: 'Contacts',
                sub_label: 'Find friends from your contacts',
                icon: 'list-outline',
                iconColor: Colors.pinkColor,
                onPress : ()=>navigation.navigate('Contacts')
            },
            {
                label: 'Contacts',
                sub_label: 'Find friends from your contacts',
                icon: 'logo-facebook',
                iconColor: Colors.facebook_blue
            }
        ]

        const ListItem = ({ item }) => (
            <TouchableOpacity onPress={item.onPress} style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Icon type='ionicon' color={item.iconColor} containerStyle={{ backgroundColor: Colors.black10, padding: 8, borderRadius: 10, ...shadow, overflow: 'visible', borderWidth: 2, borderColor: Colors.white }} name={item.icon} />
                <View style={{ paddingLeft: 10 }} >
                    <Text style={{ fontWeight: '500', fontSize: 16 }} >{item.label}</Text>
                    <Text style={{ color: Colors.black50 }} >{item.sub_label}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.black30, marginVertical: 10 }} />}
                    renderItem={ListItem}
                    data={items} />
                    <Divider containerStyle={{marginHorizontal : -20}} text={'Find People on Upflair'} />
            </View>

        )
    }



    return (
        <View style={{ flex: 1, backgroundColor: Colors.white, }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', padding: 15, paddingTop: insets.top + 15, borderBottomWidth: 1, borderColor: Colors.black30 }} >
                <ImageIcon containerStyle={{ marginRight: 15, }} onPress={() => navigation.goBack()} name={'back'} />
                <TextInput
                    returnKeyType='search'
                    style={{ backgroundColor: Colors.black10, padding: 15, flex: 1, borderRadius: 6, borderWidth: 1, borderColor: Colors.black30, }}
                    placeholder='Find People'
                    onChangeText={setSearchText}
                    value={searchText}
                />
            </View>

            {users == LOADING && <ActivityIndicator size={'large'} style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }} color={Colors.pinkColor} />}

            {users == ERROR && <Error retry={() => getUsers({}, setUsers)} message={'Something went wrong. Please try again.'} />}

            {users != ERROR && users != LOADING && (
                <FlatList
                    ListHeaderComponent={ListHeader}
                    contentContainerStyle={{ flexGrow: 1, padding: 15 }}
                    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.black30, marginVertical: 10 }} />}
                    renderItem={UserItem}
                    data={users} />
            )}
        </View>
    )
}

const UserItem = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <Avatar
                size={50}
                rounded
                ImageComponent={FastImage}
                title={getInitials(item?.first_name + ' ' + item?.last_name)}
                containerStyle={{ backgroundColor: Colors.pinkColor, ...shadow }}
                source={item?.profile_image ? { uri: BASE_URL + item.profile_image } : null}
            />
            <View style={{ marginLeft: 10 }} >
                <Text style={{ fontSize: 18, fontWeight: '500', paddingBottom: 5 }} >{item.first_name} {item.last_name}</Text>
                <Text style={{ color: Colors.black50 }} >@{item.username}</Text>
            </View>

            <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Colors.pinkColor, borderRadius: 5, marginLeft: 'auto' }} >
                <Text style={{ color: Colors.white, fontWeight: 'bold' }} >Follow</Text>
            </TouchableOpacity>

        </View>
    )
}

