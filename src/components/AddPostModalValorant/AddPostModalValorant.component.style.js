import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bigView: {
    height: '40%',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerView: {
    flex: 0.18,
    width: '100%',
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontSize: 19,
    marginLeft: 10,
    fontFamily: 'Roboto-Bold',
  },
  userIconView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsView: {
    flex: 0.13,
    flexDirection: 'row',
  },
});
