import React, { useEffect, useMemo, useState } from 'react'
import { DeviceEventEmitter, Linking, Platform, Text, StatusBar, View, FlatList, TouchableOpacity, PermissionsAndroid, ActivityIndicator } from 'react-native'
import { Avatar, Icon, SearchBar } from 'react-native-elements'
import Contacts from 'react-native-contacts';

import { useNavigation } from '@react-navigation/core'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Error from '../../Components/Error'
import { getInitials } from '../../Utils/Utility';
import Colors from '../../Assets/Colors';
import { LOADING } from '../../Providers';
import ImageIcon from '../../Components/ImageIcon';

export default ContactsScreen = ({ route }) => {
    const [contacts, setContacts] = useState(LOADING)
    const [filteredContacts, setFilteredContacts] = useState([])
    const [invited, setInvited] = useState(route.params?.invited || [])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() =>{
         getContacts()
    }, [])

    useEffect(() => {
        if (contacts == 'denied' || contacts == 'ask_again' || contacts == LOADING) return
        setFilteredContacts(contacts?.filter(contact => (contact?.displayName || contact?.givenName + ' ' + contact?.familyName)?.toLowerCase()?.includes(searchTerm.toLowerCase())) || [])
    }, [contacts, searchTerm])

    const requestPermission = async () => {
        if (Platform.OS == 'ios') return await Contacts.requestPermission()
        else if (Platform.OS == "android") {
            let result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
            if (result == 'never_ask_again') return 'denied'
            if (result == 'denied') return 'ask_again'
            if (result == 'granted') return 'authorized'
        }
    }

    useEffect(() => console.log('CHANGE', invited), [invited])

    const getContacts = async () => {
        let permissionRequestResult = await requestPermission()
        if (permissionRequestResult == "denied" || permissionRequestResult == "ask_again") return setContacts(permissionRequestResult)
        if (permissionRequestResult == "authorized") {
            setContacts(LOADING)
            let sortedContacts = (await Contacts.getAll()).filter((contact) => contact.phoneNumbers[0])
            console.log(sortedContacts)
            sortedContacts.sort((a, b) => {
                if ((a.displayName || a.givenName) < (b.displayName || b.givenName)) return -1
                if ((a.displayName || a.givenName) > (b.displayName || b.givenName)) return 1
                return 0
            })
            setContacts(sortedContacts)
        }
    }

    const formatNumber = number => {
        let formattedNumber = number.replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '')
        // if (!formattedNumber.startsWith('+')) formattedNumber = '+' + formattedNumber
        return formattedNumber
    }

    const onInvite = (contact, invited) => {
        let mappedContact = { profilePic: contact.hasThumbnail ? contact.thumbnailPath : null, mobile: formatNumber(contact.phoneNumbers[0].number), displayName: contact.displayName || contact.givenName + ' ' + contact.familyName }
        DeviceEventEmitter.emit('event.invite', mappedContact)
        if (invited) {
            setInvited(cv => cv.filter(c => c.mobile != formatNumber(contact.phoneNumbers[0].number)))
        } else {
            setInvited(cv => [...cv, mappedContact])
        }
    }

    const compareNumbers = (phone1, phone2) => {
        phone1 = formatNumber(phone1)
        phone1 = phone1.slice(phone1.length - 6);
        phone2 = formatNumber(phone2)
        phone2 = phone2.slice(phone2.length - 6);
        return phone1 === phone2;
    };

    const Body = useMemo(() => () => {
        switch (contacts) {
            case "denied":
                return <Error style={{ paddingTop: 80 }} message="Permission to read contacts has been denied." retryLabel="Give access" retryIcon="settings" retry={() => Linking.openSettings('app-settings')} />
            case "ask_again":
                return <Error style={{ paddingTop: 80 }} message="Permission to read contacts has been denied." retryLabel="Ask again" retryIcon="refresh" retry={() => getContacts()} />
            case LOADING:
                return <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 15 }} />
            default:
                return (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        contentContainerStyle={{ padding: 20 }}
                        ListEmptyComponent={() => <Error style={{ paddingTop: 80 }} icon={searchTerm?.length > 0 ? "search-off" : "list"} message={searchTerm?.length > 0 ? "No contact with that name was found" : "No contacts saved on your phone."} />}
                        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
                        renderItem={({ item, index }) => <ContactItem item={item} onInvite={onInvite} invited={invited.filter(c => compareNumbers(c.mobile, item.phoneNumbers[0].number)).length > 0} />}
                        data={searchTerm.length > 0 ? filteredContacts : contacts}
                    />
                )
        }
    }, [filteredContacts, searchTerm, contacts, invited])

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar animated backgroundColor='white' barStyle='dark-content' />
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Body />
        </View >
    )
}

const ContactItem = ({ item, onInvite, invited }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar
                title={getInitials(item.displayName || item.givenName + ' ' + item.familyName)}
                titleStyle={{ color: Colors.pinkColor, fontWeight: 'bold' }}
                source={
                    item.thumbnailPath ? { uri: item.thumbnailPath, cache: 'reload' } : null
                }
                rounded
                icon={{ name: 'person' }}
                size={40}
                containerStyle={{ backgroundColor: Colors.black30, marginRight: 24 }} />
            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16, flex: 1, paddingRight: 20 }}>{item.displayName || item.givenName + ' ' + item.familyName}</Text>
            <TouchableOpacity onPress={() => onInvite(item, invited)} style={{ backgroundColor: invited ? Colors.pinkColor : 'white', height: 24, borderRadius: 4, borderWidth: 1, borderColor: Colors.pinkColor, marginLeft: 'auto', paddingHorizontal: 16, justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: invited ? 'white' : Colors.pinkColor, includeFontPadding: false }}>{invited ? '- Remove' : '+ Invite'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const Header = ({ searchTerm, setSearchTerm }) => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    return (
        <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: 'white', paddingTop: insets.top + 10,borderBottomWidth : .5, borderColor : Colors.black30 }}>
            <ImageIcon containerStyle={{ marginRight: 15 }} onPress={() => navigation.goBack()} name={'back'} />
            <SearchBar

                containerStyle={{ flex: 1, backgroundColor: 'transparent', padding: 0, borderTopWidth: 0, borderBottomWidth: 0 }}
                inputContainerStyle={{ backgroundColor: Colors.black10, borderRadius: 10, }}
                placeholder="Search contacts here..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
        </View>
    )
}