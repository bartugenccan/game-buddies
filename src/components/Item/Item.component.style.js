import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 100,
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
  usernameView: {
    flex: 0.4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  usernameTextStyle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'segoe-ui-light-2',
  },
  smallStatsView: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  smallestStatsView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  roleText: {
    fontSize: 15,
  },
  wantsLane: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playingLane: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
