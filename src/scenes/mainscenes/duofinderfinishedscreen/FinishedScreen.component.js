import React from 'react';
import {Text, View} from 'react-native';
import style from './FinishedScreen.component.style';
import LottieView from 'lottie-react-native';
import {Button} from 'react-native-elements';

// Style Import
import Shimmer from 'react-native-shimmer';

// Navigation Import
import {useNavigation} from '@react-navigation/native';

// Firease Import
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const _onPress = async gamename => {
  if (gamename == 'League Of Legends') {
    console.log('LOL');
    firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          doc.ref.update({IsOnlineForLol: false});
        });
      });
  } else if (gamename == 'Apex Legends') {
    firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          doc.ref.update({IsOnlineForApex: false});
        });
      });
  } else if (gamename == 'PUBG Mobile ') {
    firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          doc.ref.update({IsOnlineForPUBGMobile: false});
        });
      });
  } else if (gamename == 'Valorant') {
    firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          doc.ref.update({IsOnlineForValorant: false});
        });
      });
  }
};
const FinishedScreen = props => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <LottieView
        source={require('../../../assets/animations/finished_animation.json')}
        autoPlay
        autoSize
        speed={1}
        loop
        style={style.animationView}
      />
      <Shimmer>
        <Text style={style.textStyle}>
          Tüm oyunculara baktın nasıl kimseyi beğenemedin ?
        </Text>
      </Shimmer>
      <Button
        title={'Anasayfaya dön'}
        containerStyle={{
          marginTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        buttonStyle={{
          backgroundColor: 'red',
          width: '100%',
          justifyContent: 'space-between',
        }}
        titleStyle={{textAlign: 'center'}}
        onPress={() =>
          _onPress(props.type).then(() => navigation.navigate('HomePage'))
        }
      />
    </View>
  );
};

export default FinishedScreen;
