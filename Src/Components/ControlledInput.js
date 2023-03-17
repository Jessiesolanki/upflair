import React, { useMemo } from 'react';
import { TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Controller } from 'react-hook-form';
import { Text } from 'react-native';
import Colors from '../Assets/Colors';
import { shadow } from '../Assets/Styles';

export default ControlledInput = ({
    style,
    label,
    containerStyle,
    textInputProps,
    controllerProps,
    leftIconProps,
    rightIconProps,
    hideLabel,
    disabled
}) => {
    return (
        <View style={[{}, containerStyle]}>


            <View style={{ borderRadius: 10, opacity: textInputProps?.editable == false ? .5 : 1, backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#00000020', padding: 10, paddingBottom: 0, ...shadow, shadowOpacity: .1, }} >
                {(label && !hideLabel) && (<Text style={{ fontSize: 14, color: '#666', marginBottom: -7, fontWeight: 'bold', }}>{label}</Text>)}
                <Controller {...controllerProps}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View
                            style={[
                                {
                                    flexDirection: 'row',
                                    borderRadius: 12,
                                    alignItems: 'center',

                                },
                                style,
                            ]}>
                            {leftIconProps && <Icon containerStyle={{ marginRight: 10 }} {...leftIconProps} color={Colors.pinkColor} />}
                            <TextInput
                                editable={!disabled}
                                placeholderTextColor={Colors.darkGrey}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                {...textInputProps}

                                style={[
                                    {
                                        flex: 1,
                                        marginRight: 5,
                                        marginBottom: -4,
                                        fontSize: 16,
                                        color: 'black',
                                        height: 50,
                                        justifyContent: 'center',
                                    },
                                ]}
                            />
                            {rightIconProps && <Icon {...rightIconProps} color={'#bbb'} />}
                        </View>
                    )}
                />
            </View>

            <Error
                error={controllerProps.errors[controllerProps.name]}
                label={label ? label : textInputProps.placeholder}
            />
        </View>
    );
};

export const Error = ({ error, label }) => {
    if (!error) return null;
    const capitalizeFistLetter = string =>
        string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    const errorText = useMemo(() => {
        if (error.type == 'pattern')
            return `Please enter a valid ${label.toLowerCase()}`;
        if (error.type == 'max') return error.message;
        if (error.type == 'min') return error.message;
        if (error.type == 'maxLength') return `Invalid ${label.toLowerCase()}`;
        if (error.type == 'minLength') return `Invalid ${label.toLowerCase()}`;
        if (error.type == 'required')
            return `${capitalizeFistLetter(label)} is required`;
    }, [error]);
    return <Text style={{ color: 'red', paddingTop: 5 }}>{errorText}</Text>;
};
