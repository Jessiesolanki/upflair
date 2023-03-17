
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../Assets/Colors';
import { shadow } from '../../Assets/Styles';
import Error from '../../Components/Error';
import { ERROR, LOADING } from '../../Providers';
import { AppContext } from '../../Providers/AppProvider';
import RenderHtml from 'react-native-render-html';

const Content = () => {
    const route = useRoute()
    const { getContent } = useContext(AppContext)
    const [content, setContent] = useState()

    useEffect(() => {
        getContent({ type: route.params?.type }, setContent)
    }, [])

    switch (content) {
        case ERROR:
            return <Error style={{ paddingTop: 80 }} message="Error loading products" retry={() => getContent({ type: route.params?.type }, setContent)} />
        case LOADING:
            return <ActivityIndicator color={Colors.pinkColor} size="large" style={{ justifyContent: 'flex-start', padding: 15 }} />
        default:
            return (
                <FlatList
                    ListEmptyComponent={() => <Error style={{ paddingTop: 80 }} message="There is no content." retry={() => getContent({ type: route.params?.type }, setContent)} />}
                    contentContainerStyle={{ flexGrow: 1, padding: 24 }}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    data={content}
                    renderItem={ContentItem}
                />
            )
    }
};

export default Content;

const source = {
    html: `<p>this is terms description of terms and conditions and changes this is terms&nbsp;</p><p>this is terms description of terms and conditions and changes this is terms&nbsp;</p><p>this is terms description of terms and conditions and changes this is terms&nbsp;</p><p>this is terms description of terms and conditions and changes this is terms&nbsp;</p><p>this is terms description of terms and conditions and changes this is terms&nbsp;</p>`
};

const ContentItem = ({ item }) => {
    return (
        <View style={{ backgroundColor: Colors.white, borderWidth: 0, borderColor: '#00000020', justifyContent: 'space-between', borderRadius: 10, }} >

            <Text style={{ fontWeight: 'bold', fontSize: 20 }} >{item.title}</Text>
            <RenderHtml
                contentWidth={Dimensions.get('window').width}
                source={{ html: item.description }}
            />
        </View>
    )
}