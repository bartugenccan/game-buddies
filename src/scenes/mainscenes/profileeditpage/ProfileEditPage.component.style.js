import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  firstView: {
    height: 150,
    flexDirection: 'row',
  },
  logoView: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameView: {
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextStyle: {
    marginBottom: 10,
    color: 'gray',
  },
});
