import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bigView: {
    height: '70%',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerTextView: {
    flex: 0.12,
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    marginLeft: 10,
  },
  userView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameTextStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    marginTop: 5,
  },
  inputView: {
    flex: 0.53,
  },
  firstView: {
    flex: 0.35,
  },
  firstViewTextStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginLeft: 10,
    paddingTop: 10,
  },
  secondView: {
    flex: 0.35,
  },
  thirdView: {
    flex: 0.3,
    flexDirection: 'row',
  },
  thirdTextView: {
    flex: 0.7,
    justifyContent: 'center',
  },
  thirdSwitchView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    flex: 0.15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '50%',
    height: 50,
    backgroundColor: '#00cc00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
