import React, {useEffect, useState, useCallback} from 'react';
import {Text, ScrollView, View} from 'react-native';
import {Icon, registerCustomIconType} from 'react-native-elements';

import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import style from './ChatScreenInDuoFinder.component.style';

const ChatScreenInDuoFinder = ({route}) => {
  // Receiver route.params
  const avatar_url = route.params.avatar_url;
  const useruid = route.params.uid;
  const nickname = route.params.nickname;

  // Sender route.params
  const currentUsername = route.params.currentUsername;
  const currentUserIcon = route.params.currentUserIcon;

  const [messages, setMessages] = useState([]);
  const [isExist, setIsExist] = useState(null);

  const db = firestore().collection('messages');

  const docID =
    route.params.uid > auth().currentUser.uid
      ? route.params.uid + auth().currentUser.uid
      : auth().currentUser.uid + route.params.uid;

  useEffect(() => {
    const chatRef = firestore().collection('messages').doc(docID);
    const doc = chatRef.get();

    if (doc.exists == true) {
      setIsExist(true);
    } else if (doc.exists == false) {
      setIsExist(false);
    }

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

    return () => messageListener();
  }, []);

  function renderInputToolbar(props) {
    return <InputToolbar {...props} containerStyle={style.input} />;
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'rgb(123,134,170)',
          },
          left: {
            borderRadius: 20,
          },
        }}
        textStyle={{
          right: {
            fontFamily: 'segoe-ui-light-2',
            color: '#fff',
          },
        }}
        containerToPreviousStyle={{
          right: {borderTopRightRadius: 15},
          left: {borderTopLeftRadius: 15},
        }}
        containerToNextStyle={{
          right: {borderTopRightRadius: 15},
          left: {borderTopLeftRadius: 15},
        }}
        containerStyle={{
          right: {borderTopRightRadius: 15},
          left: {borderTopLeftRadius: 15},
        }}
      />
    );
  }

  const onSend = async messages => {
    const text = messages[0].text;

    if (isExist == false) {
      db.doc(docID).set({
        members: [auth().currentUser.uid, useruid],
        recentMessage: '',
        [useruid]: [avatar_url, nickname],
        [auth().currentUser.uid]: [currentUserIcon, currentUsername],
      });
    }

    db.doc(docID)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: auth().currentUser.uid,
          avatar: avatar_url,
        },
      })
      .then(db.doc(docID).update({recentMessage: text}));
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={style.sendingContainer}>
          <Icon
            name="paper-plane"
            type={'font-awesome'}
            size={25}
            containerStyle={{marginRight: 20}}
            iconStyle={{color: '#892cdc'}}
          />
        </View>
      </Send>
    );
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
        renderSend={renderSend}
        renderBubble={renderBubble}
        alwaysShowSend
        renderInputToolbar={props => renderInputToolbar(props)}
        renderUsernameOnMessage
      />
    </View>
  );
};

export default ChatScreenInDuoFinder;
