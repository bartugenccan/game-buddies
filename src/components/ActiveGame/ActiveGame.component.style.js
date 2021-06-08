import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  firstView: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    width: '85%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  textStyle: {
    color: '#ffffff',
    fontSize: 14,
    width: '85%',
    fontFamily: 'segoe-ui-light-2',
  },
  iconView: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
  },
  pcIconView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  mobileIconView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pcIcon: {
    backgroundColor: 'white',
    height: 60,
    width: 90,
    borderRadius: 15,
    shadowColor: 'black',
    borderColor: '#647dee',
    borderWidth: 2,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  mobileIcon: {
    backgroundColor: 'white',
    height: 60,
    width: 90,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#647dee',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  activeButton: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 40,
    width: 130,
    marginTop: 12,
    marginRight: 8,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});