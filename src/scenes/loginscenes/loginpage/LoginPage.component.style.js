import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  logoImage: {
    height: 200,
    width: 200,
    marginBottom: 0,
  },
  inputText: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  entryText: {
    fontSize: 25,
    marginBottom: 20,
  },
  forgotPass: {
    fontSize: 15,
    marginTop: 15,
    color: 'gray',
  },
  loginBTN: {
    marginTop: 15,
    width: 200,
    height: 70,
    backgroundColor: '#892cdc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginBTNTXT: {
    fontSize: 25,
    color: 'white',
  },
  signUp: {
    marginTop: 15,
    fontSize: 15,
    marginBottom: 60,
  },
  inputBackground: {
    backgroundColor: '#892cdc',
    height: 120,
    borderRadius: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
    width: '85%',
  },
});
