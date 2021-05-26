// React Imports
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  AppState,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Style Imports
import style from './HomePage.component.style';
import {Icon} from 'react-native-elements';
import GameView from '../../../components/HomeScreenGameView/GameView.component';
import Spinner from '../../../components/Spinner/Spinner.component';

// Firebase Imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// React Redux Imports
import {connect, useDispatch} from 'react-redux';

// Actions Import
import {set_loading_home, games_set} from '../../../actions';

// Messaging Import
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Toast Import
import Toast from 'react-native-simple-toast';

// Websocket Import
import socket from '../../../utils/services/Websocket';

function HomePage(props) {
  const navigation = useNavigation();

  // Dispatch
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(set_loading_home(true));

    AppState.addEventListener('change', _handleAppStateChange);

    const unsubscribe = messaging().onMessage(async response => {
      console.log(response);
      if (Platform.OS !== 'ios') {
        showNotification(response.notification);
        return true;
      }
    });

    async function showNotification(notification) {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        android: {
          channelId,
        },
      });
    }

    const unss = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('xd  ' + remoteMessage.category);
      },
    );

    AsyncStorage.getItem('firstLogin').then(async value => {
      const token = await messaging().getToken();

      if (value == null) {
        AsyncStorage.setItem('firstLogin', 'true');
        AsyncStorage.setItem('useruid', auth().currentUser.uid);

        firestore()
          .collection('users')
          .where('UserEmail', '==', auth().currentUser.email)
          .get()
          .then(resp => {
            let batch = firestore().batch();
            resp.docs.forEach(doc => {
              const docRef = firestore().collection('users').doc(doc.id);
              batch.update(docRef, {uid: auth().currentUser.uid});
              docRef.update({tokenS: token});
            });
            batch.commit().then(() => {
              console.log(auth().currentUser.uid);
            });
          });
      }
    });

    // Set games while entering the homescreen
    firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          dispatch(games_set(doc.data().Games));
        });
      })
      .then(() => dispatch(set_loading_home(false)));

    firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          doc.ref.update({IsOnline: true});
        });
      });

    () => {
      unsubscribe();
      unss();
    };
  }, [dispatch]);

  // When app is close set IsOnline to false.
  useLayoutEffect(() => {
    return async () => {
      const uid = await AsyncStorage.getItem('useruid');
      firestore()
        .collection('users')
        .where('uid', '==', uid)
        .get()
        .then(resp => {
          resp.forEach(doc => {
            doc.ref.update({IsOnline: false});
          });
        });
    };
  }, []);

  // Function for render game view depends on game id.
  const renderGameView = ({item}) => {
    if (item.id == '0') {
      return (
        <TouchableOpacity
          style={{
            width: '100%',
            height: 200,
            marginTop: 20,
            overflow: 'hidden',
          }}
          onPress={() => {
            const ref = firestore().collection('users');

            ref.where('uid', '==', auth().currentUser.uid).onSnapshot(resp =>
              resp.forEach(doc => {
                if (doc.data().LolAccount['SoloQueueRanked'] == '') {
                  Toast.showWithGravity(
                    'İlan sayfasına girmek ve ilan oluşturmak için öncelikle profil sayfasına gidip oynacağın oyundaki ligini seçmen gerek.',
                    Toast.LONG,
                    Toast.BOTTOM,
                  );
                } else if (doc.data().LolAccount['SoloQueueRanked'] != '') {
                  navigation.navigate('LolDuoFinder');
                }
              }),
            );
          }}
          activeOpacity={0.7}>
          <GameView
            gameName={item.gameName}
            gameImage={
              'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltcfa4652c8d383f56/5e21837f63d1b6503160d39b/Home-page.jpg'
            }
          />
        </TouchableOpacity>
      );
    } else if (item.id == '1') {
      return (
        <TouchableOpacity
          style={{
            width: '100%',
            height: 200,
            marginTop: 10,
            overflow: 'hidden',
          }}
          onPress={() => {
            const ref = firestore().collection('users');

            ref.where('uid', '==', auth().currentUser.uid).onSnapshot(resp =>
              resp.forEach(doc => {
                if (doc.data().ValorantAccount['League'] == '') {
                  Toast.showWithGravity(
                    'İlan sayfasına girmek ve ilan oluşturmak için öncelikle profil sayfasına gidip oynacağın oyundaki ligini seçmen gerek.',
                    Toast.LONG,
                    Toast.BOTTOM,
                  );
                } else if (doc.data().ValorantAccount['League'] != '') {
                  navigation.navigate('ValorantDuoFinder');
                }
              }),
            );
          }}
          activeOpacity={0.7}>
          <GameView
            gameName={item.gameName}
            gameImage={
              'https://www.tvovermind.com/wp-content/uploads/2021/03/valorant-update.png'
            }
          />
        </TouchableOpacity>
      );
    } else if (item.id == '2') {
      return (
        <TouchableOpacity
          style={{
            width: '100%',
            height: 200,
            marginTop: 10,
            overflow: 'hidden',
          }}
          onPress={() => {
            const ref = firestore().collection('users');

            ref.where('uid', '==', auth().currentUser.uid).onSnapshot(resp =>
              resp.forEach(doc => {
                if (doc.data().ApexAccount['League'] == '') {
                  Toast.showWithGravity(
                    'İlan sayfasına girmek ve ilan oluşturmak için öncelikle profil sayfasına gidip oynacağın oyundaki ligini seçmen gerek.',
                    Toast.LONG,
                    Toast.BOTTOM,
                  );
                } else if (doc.data().ApexAccount['League'] != '') {
                  navigation.navigate('ApexDuoFinder');
                }
              }),
            );
          }}
          activeOpacity={0.7}>
          <GameView
            gameName={item.gameName}
            gameImage={
              'https://images2.alphacoders.com/995/thumb-1920-995140.jpg'
            }
          />
        </TouchableOpacity>
      );
    } else if (item.id == '3') {
      return (
        <TouchableOpacity
          style={{
            width: '100%',
            height: 200,
            marginTop: 10,
            overflow: 'hidden',
          }}
          onPress={() => {
            const ref = firestore().collection('users');

            ref.where('uid', '==', auth().currentUser.uid).onSnapshot(resp =>
              resp.forEach(doc => {
                if (doc.data().PUBGMobileAccount['League'] == '') {
                  Toast.showWithGravity(
                    'İlan sayfasına girmek ve ilan oluşturmak için öncelikle profil sayfasına gidip oynacağın oyundaki ligini seçmen gerek.',
                    Toast.LONG,
                    Toast.BOTTOM,
                  );
                } else if (doc.data().PUBGMobileAccount['League'] != '') {
                  navigation.navigate('PUBGMobileDuoFinder');
                }
              }),
            );
          }}
          activeOpacity={0.7}>
          <GameView
            gameName={item.gameName}
            gameImage={
              'https://playerbros.com/wp-content/uploads/2020/12/12.jpg'
            }
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Modal animationType="fade" transparent={true} visible={props.loading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: 100,
              width: 200,
              backgroundColor: '#892cdc',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Spinner color={'yellow'} size={100}></Spinner>
          </View>
        </View>
      </Modal>
      <View style={style.firstView}>
        <View style={style.bigTextView}>
          <Text style={style.textStyle} onPress={() => auth().signOut()}>
            Merhabalar! GameBuddies'e hoş geldin. Hemen aşağıdaki platformlardan
            oyunlarını bağlamaya başla! Senin için en uygun takım arkadaşını
            bulacağız!
          </Text>
        </View>
      </View>
      <View style={style.iconView}>
        <View style={style.pcIconView}>
          <TouchableOpacity
            style={style.pcIcon}
            onPress={() =>
              props.navigation.navigate('Modal', {screen: 'PCModal'})
            }>
            <Icon name="laptop" type="font-awesome" size={40} />
          </TouchableOpacity>
        </View>
        <View style={style.mobileIconView}>
          <TouchableOpacity
            style={style.mobileIcon}
            onPress={() =>
              props.navigation.navigate('Modal', {screen: 'MobileModal'})
            }>
            <Icon name="mobile" type="font-awesome" size={40} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={props.games_arr}
        renderItem={renderGameView}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 0, marginBottom: 0}}
      />
    </View>
  );
}

const mapStateToProps = ({HomeScreenResponse}) => {
  const {games_arr, loading} = HomeScreenResponse;

  return {
    games_arr,
    loading,
  };
};

export default connect(mapStateToProps, {set_loading_home, games_set})(
  HomePage,
);
