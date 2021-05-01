import React, {useEffect, useState, useCallback} from 'react';
import {Text, ScrollView, View} from 'react-native';
import {Icon} from 'react-native-elements';

import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import style from './ChatScreen.component.style';

const ChatScreen = ({navigation, route}) => {
  const [avatar_url, setAvatarUrl] = useState(route.params.avatar_url);
  const [docID, setDocID] = useState(route.params.docid);
  const [messages, setMessages] = useState([]);

  const db = firestore().collection('messages');

  useEffect(() => {
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
  };

  function renderInputToolbar(props) {
    return <InputToolbar {...props} containerStyle={style.input} />;
  }

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

export default ChatScreen;
