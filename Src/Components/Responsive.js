import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Colors } from './Config';
import { ScaledSheet } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen")

export const hp = (value) => height / 100 * value

export const wp = (value) => width / 100 * value