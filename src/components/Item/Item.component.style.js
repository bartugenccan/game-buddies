import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  avatarView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsView: {
    flex: 0.7,
  },
  usernameView: {
    flex: 0.4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  usernameTextStyle: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'segoe-ui-light-2',
  },
  smallStatsView: {
    flex: 0.6,
  },
  smallestStatsView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
