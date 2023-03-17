import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet, Text,
  Image,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Easing
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Splash = ({ navigation }) => {
  //State for ActivityIndicator animation
  const backgroundImageSlide = useRef(new Animated.Value(-400)).current 
  const logoVerticalSlide = useRef(new Animated.Value(0)).current  
  const windowDimensions = useWindowDimensions()

  useEffect(() => {
    Animated.timing(
      backgroundImageSlide,
      {
        toValue: -700,
        duration: 1000,
        easing :Easing.inOut(Easing.ease),
        useNativeDriver: true
      }
    ).start();

  }, [backgroundImageSlide])

  useEffect(() => {
    Animated.timing(
      logoVerticalSlide,
      {
        toValue: -200,
        duration: 1000,
        easing :Easing.inOut(Easing.ease),
        useNativeDriver: true
      }
    ).start();

  }, [logoVerticalSlide])



  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('accessToken').then((value) =>
        navigation.replace(
          value === null ? 'Intro' : 'MyDrawer'
        ),
      ); 

    }, 2000);
  }, []);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FadeInView style={styles.container}>
        <Animated.Image style={{ height: windowDimensions.height="100%", resizeMode: 'contain', width: windowDimensions.width * 3.5, transform: [{ translateX: backgroundImageSlide }] }} source={require('../../../Src/Assets/splash.jpg')} />

        <Animated.View style={{ position: 'absolute', top: 300, left: 0, right: 0, alignItems: 'center',transform : [{translateY : logoVerticalSlide}] }}>
          <Image style={{ height: 200, resizeMode: 'contain', width: 250  }} source={require('../../../Src/Assets/logo.png')} />

        </Animated.View>
      </FadeInView>
    </View>

  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow : 'hidden',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay :500
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

