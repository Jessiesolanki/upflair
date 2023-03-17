
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../Assets/Colors';
import { shadow } from '../../Assets/Styles';

const Help = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24 }} >
      <StatusBar barStyle={'dark-content'} />
      <Btn label={'FAQ'} />
      <Btn label={'About Us'} />
      <Btn onPress={() => navigation.navigate('Content', { type: 'disclaimer' })}  label={'Disclaimer'} />
      <Btn onPress={() => navigation.navigate('Content', { type: 'contact' })} label={'Contact Us'} />
      <Btn onPress={() => navigation.navigate('Content', { type: 'terms' })} label={'Terms & Conditions'} />
      <Btn onPress={() => navigation.navigate('Content', { type: 'privacy' })} label={'Privacy Policy'} />
    </View>
  );
};

export default Help;

const Btn = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: Colors.veryLightGrey, borderWidth: 1, borderColor: '#00000020', marginBottom: 20, alignItems: 'center', justifyContent: 'space-between', padding: 13, flexDirection: 'row', ...shadow, borderRadius: 10, shadowOpacity: .1 }} >

      <Text style={{ fontSize: 18, fontWeight: '500' }} >{label}</Text>
      <Icon name='arrow-forward-ios' />

    </TouchableOpacity>
  )
}