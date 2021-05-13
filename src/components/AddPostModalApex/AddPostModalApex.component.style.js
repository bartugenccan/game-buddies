import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  item: {
    marginHorizontal: 8,
    borderRadius: 15,
  },
  buttonContainer: {
    width: '50%',
    height: 50,
    backgroundColor: '#00cc00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 30,
    alignSelf: 'center',
  },
});
