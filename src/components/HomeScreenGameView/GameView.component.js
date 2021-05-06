import React from 'react';
import {ImageBackground, View} from 'react-native';
import style from './GameView.component.style';
import {useNavigation} from '@react-navigation/native';

const GameView = ({gameName, gameImage}) => {
  return (
    <View style={style.container} activeOpacity={0.7}>
      <ImageBackground
        resizeMode="cover"
        source={{uri: gameImage}}
        style={{
          width: '100%',
          height: 200,
          overflow: 'hidden',
          borderRadius: 50,
        }}
      />
    </View>
  );
};

export default GameView;
