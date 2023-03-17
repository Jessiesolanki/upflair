import React, { useMemo } from 'react';
import { TextInput, View, StyleSheet ,Text} from 'react-native';
import { Icon } from 'react-native-elements';
// import Colors from '../../assets/Colors';


const CustomInput = (props) => {
    return (
        <View style={styles.mainBody}>

            <TextInput style={styles.inputStyle}
                {...props}
                editable
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                blurOnSubmit={false}
            />
            <Text style={{ textAlign: 'center' }}>DFGFG</Text>
        </View>
    );
}

export default CustomInput;

const styles = StyleSheet.create({
    mainBody: {
        justifyContent: 'space-between', flexDirection: 'row', height: 40, width: '90%',
        borderColor: 'red', borderWidth: 1, borderRadius: 10, alignItems: 'center', marginVertical: 5
    },

    inputStyle: {

        color: 'white',
        paddingLeft: 15, width: '75%',
        paddingRight: 15,

    },

});
