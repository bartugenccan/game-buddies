import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  img: {
    aspectRatio: 2,
    width: (Dimensions.get('screen').width * 7.5) / 10,
    marginVertical: 10,
    alignSelf: 'center',
    borderColor: '#892cdc',
  },
});
