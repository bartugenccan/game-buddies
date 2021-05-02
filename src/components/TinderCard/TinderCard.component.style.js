import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  card: {
    height: (Dimensions.get('screen').height * 80) / 100,
    width: (Dimensions.get('screen').width * 4) / 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    overflow: 'hidden',
  },
  headerView: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameStyle: {
    marginTop: 5,
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: 'white',
  },
  gamesLine: {
    width: '100%',
    height: 50,
    backgroundColor: '#892cdc',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  gameTextStyle: {
    color: 'white',
    fontSize: 15,
    marginLeft: 15,
  },
  reviewLine: {
    width: '100%',
    height: 50,
    backgroundColor: '#892cdc',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  reviewContainer: {
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 5,
  },
});
