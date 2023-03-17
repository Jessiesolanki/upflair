
import {} from 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button, Dimensions, TouchableOpacity
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../../Assets/Colors';

const Intro = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false);
  const windowWidth = Dimensions.get('window').width;

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,

          // paddingBottom: 100,
        }}>

        <Image
          resizeMode='contain'
          style={styles.introImageStyle}
          source={item.image} />
        <View style={{ padding: 18 }}>
          <Text style={styles.introTitleStyle}>
            {item.title}
          </Text>
          <Text style={styles.introTextStyle}>
            {item.text}
          </Text>
        
        </View>
        <Image
          resizeMode='contain'
          style={styles.imageDotStyle}
          source={item.imageDot} />
      </View>
    );
  };

  const navigate = () => {
    navigation.replace('Auth')
  }
  const DoneButton = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.pinkColor, width: windowWidth / 1.5, height: 85, marginRight: -20, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 42.5
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.white }}>Next</Text>
          <Image
            resizeMode='contain'
            style={{ width: 50, height: 27, marginLeft: 5 }}
            source={require("../../Assets/right-arrows.png")} />
        </View>
      </View>
    )
  }
  const NextButton = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.pinkColor, width: windowWidth / 1.5, height: 85, marginRight: -20, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 42.5
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.white }}>Next</Text>
          <Image
            resizeMode='contain'
            style={{ width: 50, height: 27, marginLeft: 5 }}
            source={require("../../Assets/right-arrows.png")} />
        </View>
      </View>
    )
  }
  const SkipButton = () => {
    return (
      <View
        style={{
          width: windowWidth / 2.5, height: 85, marginLeft: -20, justifyContent: 'center', backgroundColor: 'transparent', marginRight: 60
        }}>
        <Text style={{ marginLeft: 30, fontSize: 18, fontWeight: '500', color: Colors.darkGrey }}>Skip</Text>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, }}>

      <AppIntroSlider
        style={{ marginTop: -40 }}
        data={slides}
        dotStyle={{ width: 0, height: 0 }}
        activeDotStyle={{ width: 0, height: 0 }}
        renderItem={RenderItem}
        onDone={navigate}
        renderNextButton={NextButton}
        renderDoneButton={DoneButton}
        showSkipButton={true}
        renderSkipButton={SkipButton}
      />
      {/* )} */}
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({

  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: '100%',
    height: '60%',
    resizeMode :'cover'
  },
  imageDotStyle: {
    width: '24%', height: 4, marginLeft: 18
  },
  introTextStyle: {
    fontSize: 18,
    color: 'black',
    // textAlign: 'center',
    paddingVertical: 10,
  },
  introTitleStyle: {
    fontSize: 36,
    color: 'black',
    // textAlign: 'center',
    marginBottom: 5, marginTop: 13,
    fontWeight: '700',
  },
});

const slides = [
  {
    key: 's1',
    title: 'Luxury Home\nDecoration',
    text: 'Loream ipsum dolor sit amet consetetur elitr, sedeirmod tempor invidunt ut',
    image: require("../../Assets/onboarding_one.jpg"),
    imageDot: require("../../Assets/onboarding_one_slide.png"),
    backgroundColor: Colors.white,
  },
  {
    key: 's2',
    title: 'Innovate \nYour Home',
    text: 'Loream ipsum dolor sit amet consetetur elitr, sedeirmod tempor invidunt ut',
    image: require("../../Assets/onboarding_two.jpg"),
    imageDot: require("../../Assets/onboarding_two_slide.png"),
    backgroundColor: Colors.white,
  },
  {
    key: 's3',
    title: 'Stylish Living \nStylish',
    text: 'Loream ipsum dolor sit amet consetetur elitr, sedeirmod tempor invidunt ut',
    image: require("../../Assets/onboarding_three.jpg"),
    imageDot: require("../../Assets/onboarding_three_slide.png"),
    backgroundColor: Colors.white,
  },

];