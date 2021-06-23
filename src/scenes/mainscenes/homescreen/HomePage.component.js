// React Imports
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
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
import {set_loading_home, games_set, ws_init, ws_match} from '../../../actions';

// Messaging Import
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Toast Import
import Toast from 'react-native-simple-toast';

// Active Game Import
import ActiveGame from '../../../components/ActiveGame/ActiveGame.component';
import {Button} from 'react-native';

// Basic function to get length of a obhect
Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function HomePage(props) {
  const navigation = useNavigation();

  // Dispatch
  const dispatch = useDispatch();
  const [isInActiveGame, setIsInActiveGame] = useState(false);

  // Modal Visibility State
  const [visible, setVisible] = useState(false);

  // Modal Content States
  const [requestUsername, setRequestUsername] = useState();
  const [requestGame, setRequestGame] = useState();
  const [requestUid, setRequestUid] = useState();
  const [requestAvatar, setRequestAvatar] = useState();

  const [currentAvatar, setCurrentAvatar] = useState();
  const [currentUsername, setCurrentUsername] = useState();

  const openRequestModalWithParameters = (n, g, t, a) => {
    setRequestAvatar(a);
    setRequestUsername(n);
    setRequestGame(g);
    setRequestUid(t);
    setVisible(true);
  };

  useEffect(async () => {
    // useEffect dispatchs
    dispatch(set_loading_home(true));

    // Connect to websocket server
    dispatch(ws_init());

    // Sets avatar , username and current status from firestore with subscription
    const activeGameSub = firestore()
      .collection('users')
      .where('uid', '==', auth().currentUser.uid)
      .onSnapshot(resp => {
        resp.forEach(doc => {
          setIsInActiveGame(doc.data().activeGames);
          setCurrentAvatar(doc.data().iconUrl);
          setCurrentUsername(doc.data().UserName);
        });
      });

    const unsubscribe = messaging().onMessage(async response => {
      let size = Object.size(response.data);

      // Notification
      if (Platform.OS !== 'ios' && size == 0) {
        showNotification(response.notification);
        return true;
      } else if (Platform.OS !== 'ios' && size == 5) {
        openRequestModalWithParameters(
          response.data.userName,
          response.data.game,
          response.data.uid,
          response.data.avatar_url,
        );
        return true;
      }
    });

    // Function for show notification when notification shows up
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

    // Handler for background message
    const unss = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log(remoteMessage.category);
      },
    );

    // When first login need to set userid to AsyncStorage
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
          doc.ref.update({IsOnline: true});
        });
      })
      .then(() => dispatch(set_loading_home(false)));

    () => {
      unsubscribe();
      unss();
      activeGameSub();
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
                } else if (doc.data().activeGames != false) {
                  Toast.showWithGravity(
                    'İlan sayfasına girmek ve ilan oluşturmak için şu anki oturumunuzu bitirip takım arkadaşınızı oylamanız gerekmektedir.',
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
                } else if (doc.data().activeGames != false) {
                  Toast.showWithGravity(
                    'İlan sayfasına girmek ve ilan oluşturmak için şu anki oturumunuzu bitirip takım arkadaşınızı oylamanız gerekmektedir.',
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
                } else if (doc.data().activeGames != false) {
                  Toast.showWithGravity(
                    'İlan sayfasına girmek ve ilan oluşturmak için şu anki oturumunuzu bitirip takım arkadaşınızı oylamanız gerekmektedir.',
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
                } else if (doc.data().activeGames != false) {
                  Toast.showWithGravity(
                    'İlan sayfasına girmek ve ilan oluşturmak için şu anki oturumunuzu bitirip takım arkadaşınızı oylamanız gerekmektedir.',
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
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{requestUsername}</Text>
            <Button
              title="Olur"
              onPress={() => {
                dispatch(set_loading_home(true));
                dispatch(
                  ws_match(
                    auth().currentUser.uid,
                    requestUid,
                    requestGame,
                    currentAvatar,
                    requestAvatar,
                    currentUsername,
                    requestUsername,
                  ),
                );
                dispatch(set_loading_home(false));
              }}
            />
          </View>
        </View>
      </Modal>
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
      {isInActiveGame == false ? (
        <View style={style.firstView}>
          <View style={style.bigTextView}>
            <Text style={style.textStyle} onPress={() => auth().signOut()}>
              Merhabalar! GameBuddies'e hoş geldin. Hemen aşağıdaki
              platformlardan oyunlarını bağlamaya başla! Senin için en uygun
              takım arkadaşını bulacağız!
            </Text>
          </View>
        </View>
      ) : (
        <View style={style.firstView}>
          <ActiveGame game={isInActiveGame} />
        </View>
      )}

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

export default connect(mapStateToProps, {
  ws_match,
  set_loading_home,
  games_set,
  ws_init,
})(HomePage);
