import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 85,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  avatarView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsView: {
    flex: 0.7,
  },
});
