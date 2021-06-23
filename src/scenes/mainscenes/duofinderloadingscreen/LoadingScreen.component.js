import React from 'react';
import {Text, View} from 'react-native';
import style from './LoadingScreen.component.style';
import LottieView from 'lottie-react-native';

// Style Import
import Shimmer from 'react-native-shimmer';

// Basic loading screen with lottie animations
const LoadingScreen = () => {
  return (
    <View style={style.container}>
      <LottieView
        source={require('../../../assets/animations/loading_animation.json')}
        autoPlay
        autoSize
        speed={1}
        loop
        style={style.animationView}
      />
      <Shimmer>
        <Text style={style.textStyle}>GameBuddies</Text>
      </Shimmer>
    </View>
  );
};

export default LoadingScreen;
