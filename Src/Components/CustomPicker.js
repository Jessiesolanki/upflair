import React, { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { Alert, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../Assets/Colors";
import { shadow } from "../Assets/Styles";
import { Error } from "./ControlledInput";

export default CustomPicker = ({ label, options, containerStyle, controllerProps, leftIconProps, emptyMessage }) => {
    const [listModalVisible, setListModalVisibility] = useState(false)
    const onPress = () => {
        if (emptyMessage && options.length==0) Alert.alert(label, emptyMessage)
        if(options?.length != 0 ) setListModalVisibility(true)
    }
    return (
        <View style={containerStyle} >
            <Controller  {...controllerProps}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[{ padding: 10, paddingBottom: 10, borderRadius: 10, borderWidth: 1, borderColor: '#00000020', ...shadow, shadowOpacity: .1, backgroundColor: '#f9f9f9', justifyContent: 'space-between', },]}>
                        {label && (<Text style={{ fontSize: 14, color: '#666', fontWeight: 'bold', marginBottom: 2 }}>{label}</Text>)}
                        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -5 }} >
                            {leftIconProps && <Icon containerStyle={{ marginRight: 10, }} {...leftIconProps} color={Colors.pinkColor} />}
                            <Text style={{ fontSize: 16, color: value ? 'black' : Colors.darkGrey }}  >{value ? options?.find(option => option.value == value)?.label : 'Choose'}</Text>
                            <Icon name='expand-more' containerStyle={{ marginLeft: 'auto' }} size={30} color={Colors.lightGrey} />
                        </TouchableOpacity>

                        <ListModal
                            onSelect={onChange}
                            value={value}
                            options={options}
                            dismiss={() => setListModalVisibility(false)}
                            label={label}
                            visible={listModalVisible} />

                    </View>
                )}
            />
            <Error
                error={controllerProps.errors[controllerProps.name]}
                label={label ? label : textInputProps.placeholder}
            />
        </View>
    )
}

const ListModal = ({ visible, dismiss, label, onSelect, value, options }) => {
    const insets = useSafeAreaInsets()
    const onListItemPress = value => {
        onSelect(value)
        dismiss()
    }
    return (
        <Modal visible={visible} transparent statusBarTranslucent presentationStyle='overFullScreen' animationType="slide" >
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-end' }} >
                <TouchableOpacity activeOpacity={1} onPressIn={dismiss} style={{ flex: 1 }} />
                <View activeOpacity={1} style={{ maxHeight: 400, backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15, ...shadow,shadowOpacity : .6, shadowRadius: 40 }} >

                    <View style={{ padding: 15, backgroundColor: Colors.pinkColor, borderTopLeftRadius: 15, borderTopRightRadius: 15, }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.white }} >{label}</Text>
                    </View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ overflow: 'hidden', borderRadius: 40, borderTopLeftRadius: 0, borderTopRightRadius: 0, }}
                        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e5e5e5' }} />}
                        contentContainerStyle={{ paddingBottom: 10 + insets.bottom, flexGrow: 1, }}
                        renderItem={({ item }) => <ListItem selected={value == item.value} item={item} onPress={() => onListItemPress(item.value)} />}
                        data={options}
                    />
                </View>
            </View>
        </Modal >
    )
}

const ListItem = ({ item, onPress, selected }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 15, backgroundColor: selected ? '#eee' : 'white' }} >
            <Text>{item.label}</Text>
        </TouchableOpacity>
    )
}

