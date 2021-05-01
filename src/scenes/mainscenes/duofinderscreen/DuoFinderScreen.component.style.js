import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  profileHeader: {
    backgroundColor: 'black',
    flex: 0.3,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  genderArea: {
    backgroundColor: '#892cdc',
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 0.4,
    flexDirection: 'row',
  },
  reviews: {
    flex: 0.2,
  },
  nickname: {
    fontSize: 25,
    marginLeft: 25,
    color: 'white',
    fontWeight: 'bold',
    position: 'relative',
  },
  gendertxt: {
    marginLeft: 25,
    color: 'white',
  },
  infologo: {
    backgroundColor: '#892cdc',
    height: 50,
    width: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: 'row',
  },
  infotxt: {
    marginLeft: 15,
  },
  reviewtxt: {
    fontSize: 15,
    marginBottom: 5,
    color: 'black',
  },
});
