import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

import {GiftedChat, Actions} from 'react-native-gifted-chat';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Toolbar Import
import * as toolbar from '../../../components/InputToolbar/InputToolbar';

const ChatScreen = ({navigation, route}) => {
  const avatar_url = route.params.avatar_url;
  const docID = route.params.docid;
  const nickname = route.params.nickname;

  const tokenS = route.params.token;
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

    return () => {
      messageListener();
    };
  }, []);

  const renderActions = props => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        <Icon
          name="paper-plane"
          type={'font-awesome'}
          size={23}
          iconStyle={{color: '#892cdc', marginRight: 5}}
        />
      )}
      options={{
        'Oyun isteği gönder': () => {
          let inviteMessage = 'Oyun oynamak ister misin ?';

          db.doc(docID)
            .collection('MESSAGES')
            .add({
              text: inviteMessage,
              createdAt: new Date().getTime(),
              user: {
                _id: 1,
                avatar: avatar_url,
              },
              quickReplies: {
                type: 'radiobox',
                keepIt: false,
                values: [
                  {
                    title: '👍 Olur',
                    value: 'yes',
                  },
                  {
                    title: '👎 Şimdi olmaz',
                    value: 'no',
                  },
                ],
              },
            });
        },
        Cancel: () => {
          console.log('');
        },
      }}
      optionTintColor="#222B45"
    />
  );

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
        renderActions={renderActions}
        renderComposer={toolbar.renderComposer}
        renderUsernameOnMessage
        alwaysShowSend
        placeholder="Bir mesaj yazınız..."
      />
    </View>
  );
};

export default ChatScreen;
