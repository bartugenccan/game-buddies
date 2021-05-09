import React, {useEffect, useState} from 'react';
import {Text, View, Modal, FlatList} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import Spinner from '../../../components/Spinner/Spinner.component';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useNavigation} from '@react-navigation/native';

const MessageScreen = () => {
  const navigation = useNavigation();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const keyExtractor = (item, index) => index.toString();

  useEffect(() => {
    const tempDocId = '';

    const subscriber = firestore()
      .collection('messages')
      .where('members', 'array-contains', auth().currentUser.uid)
      .onSnapshot(resp => {
        const users = [];
        resp.forEach(doc => {
          let memberArray = doc.data().members;

          for (var i = 0; i < memberArray.length; i++) {
            if (memberArray[i] === auth().currentUser.uid) {
              memberArray.splice(i, 1);
            }
          }

          let otherMember = memberArray[0];

          users.push({
            name: doc.data()[otherMember][1],
            avatar_url: doc.data()[otherMember][0],
            uid: memberArray[0],
            recentMessage: doc.data().recentMessage,
            docId: doc.id,
          });
        });

        setList(users);
      });
    setLoading(false);

    () => subscriber();
  }, []);

  const renderItem = ({item}) => (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('Chat', {
          uid: item.uid,
          avatar_url: item.avatar_url,
          docid: item.docId,
          nickname: item.name,
        });
      }}>
      <Avatar source={{uri: item.avatar_url}} rounded size={50} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.recentMessage}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Modal animationType="fade" transparent={true} visible={loading}>
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
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
        extraData={list}
        ListEmptyComponent={
          <View style={{flex: 0.5, alignSelf: 'center', marginTop: 100}}>
            <Text style={{color: 'rgba(0,0,0,0.5)'}}>
              Maalesef hiç konuşma bulamadık!
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default MessageScreen;
