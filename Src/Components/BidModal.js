import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { shadow } from "../Assets/Styles";

export default BidModal = ({ visible, dismiss }) => {
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [finalAmount, setFinalAmount] = useState()

    const Btn = ({ label, color, onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: color, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8, flexDirection: 'row', alignItems: 'center', }} >
            <Text style={{ fontWeight: 'bold', color: Colors.white }} >{label}</Text>
        </TouchableOpacity>
    )

    return (
        <Modal animationType='fade' transparent statusBarTranslucent visible={visible} onRequestClose={dismiss} >
            <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#00000020', flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }} >
                <TouchableOpacity activeOpacity={1} style={{ backgroundColor: Colors.white, borderRadius: 10, padding: 10, ...shadow, alignSelf: 'stretch' }} >

                    <Icon onPress={dismiss} containerStyle={{ alignSelf: 'flex-end', marginBottom: 5 }} type='ionicon' name='close-circle-outline' />

                    <View style={{ padding: 10 }} >
                        <View style={{ borderRadius: 10, backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#00000020', padding: 10, paddingBottom: 0, ...shadow, shadowOpacity: .1, }} >
                            <Text>Final Price</Text>
                            <TextInput placeholder="Ex:- $ 150"
                                onChangeText={setFinalAmount}
                                value={finalAmount}
                                keyboardType="number" style={{
                                    marginRight: 5,
                                    marginBottom: -4,
                                    fontSize: 16,
                                    color: 'black',
                                    height: 50,
                                    justifyContent: 'center',
                                }}/>
                        </View>

                        <Btn onPress={() => { setBidModalVisibility(false), accept_CancelRequest(id, 1) }} label={'Submit'} color={Colors.pinkColor} />

                    </View>

                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}