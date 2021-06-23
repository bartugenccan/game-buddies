import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {Icon} from 'react-native-elements';

import {GiftedChat} from 'react-native-gifted-chat';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Toolbar Import
import * as toolbar from '../../../components/InputToolbar/InputToolbar';

// React Redux Import
import {connect, useDispatch} from 'react-redux';

// Action Imports
import {ws_close, send_notification, send_request} from '../../../actions/';

const ChatScreen = ({navigation, route}) => {
  // Dispatch
  const dispatch = useDispatch();

  // Route parametes
  const uid = route.params.uid;
  const avatar_url = route.params.avatar_url;
  const docID = route.params.docid;
  const nickname = route.params.nickname;
  const tokenS = route.params.token;

  // Initial States
  const [currentUserName, setCurrentUserName] = useState();
  const [currentAvatar, setCurrentAvatar] = useState();
  const [messages, setMessages] = useState([]);
  const [activeCtrl, setActiveCtrl] = useState(true);

  // Firestore databases
  const db = firestore().collection('messages');

  // Set headerRight for invite to game
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          type="font-awesome-5"
          name="khanda"
          iconStyle={{marginRight: 15}}
          onPress={() =>
            Alert.alert(
              'Kullanıcıya oyun daveti göndermek istiyor musunuz?',
              '',
              [
                {
                  text: 'Gönder!',
                  onPress: () => {
                    if (activeCtrl == false) {
                      dispatch(
                        send_request(
                          tokenS,
                          currentUserName,
                          'League Of Legends',
                          currentAvatar,
                          auth().currentUser.uid,
                        ),
                      );
                    } else if (activeCtrl == true) {
                      console.log('Olmaz');
                    }
                  },
                },
                {
                  text: 'Vazgeç',
                  onPress: () => null,
                },
              ],
            )
          }
        />
      ),
    });
  });

  useEffect(() => {
    // Start to listen exact doc in firestore
    const messageListener = db
      .doc(docID)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          return data;
        });
        setMessages(messages);
      });

    db.doc(docID).onSnapshot(resp => {
      setCurrentUserName(resp.data()[auth().currentUser.uid][1]);
    });

    firestore()
      .collection('users')
      .where('uid', '==', auth().currentUser.uid)
      .get()
      .then(resp =>
        resp.forEach(doc => {
          setActiveCtrl(doc.data().activeGames);
          setCurrentAvatar(doc.data().iconUrl);
        }),
      );
    return () => {
      messageListener();
    };
  }, [dispatch]);

  // On Send Function
  const onSend = async messages => {
    const text = messages[0].text;

    db.doc(docID)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: auth().currentUser.uid,
          avatar: avatar_url,
        },
      });

    db.doc(docID).update({
      recentMessage: text,
    });

    dispatch(send_notification('q', currentUserName, text));
  };

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: auth().currentUser.uid,
          avatar: avatar_url,
        }}
        renderSend={toolbar.renderSend}
        renderBubble={toolbar.renderBubble}
        renderInputToolbar={props => toolbar.renderInputToolbar(props)}
        renderComposer={toolbar.renderComposer}
        renderUsernameOnMessage
        alwaysShowSend
        placeholder="Bir mesaj yazınız..."
      />
    </View>
  );
};

const mapStateToProps = ({WebsocketResponse}) => {
  const {status} = WebsocketResponse;

  return {
    status,
  };
};

export default connect(mapStateToProps, {
  ws_close,
  send_notification,
  send_request,
})(ChatScreen);
