import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  logoImage: {
    height: 150,
    width: 150,
  },
  inputText: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 10,
  },
  inputBackground: {
    backgroundColor: '#892cdc',
    borderRadius: 10,
    height: 80,
    width: '85%',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
  },
  forgotPassTxt: {
    marginBottom: 10,
    fontSize: 25,
  },
  enterEmailTxt: {
    marginBottom: 10,
    fontSize: 15,
  },
  newPass: {
    marginTop: 50,
    backgroundColor: '#892cdc',
    borderRadius: 10,
    height: 50,
    width: 200,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
    marginBottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPassTxt: {
    fontSize: 25,
    color: 'white',
  },
  iconBg: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
