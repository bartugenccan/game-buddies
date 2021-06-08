import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Alert, Text, TouchableOpacity} from 'react-native';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// React Navigation Import
import {useNavigation} from '@react-navigation/native';

// Util Imports
import * as selector from '../../utils/LeagueImageSelectors';
import * as formatter from '../../utils/Formatters';

// Activity Indictor
import {MaterialIndicator} from 'react-native-indicators';

import ItemOfValorant from '../ItemOfValorant/ItemOfValorant.component';

const ValorantCards = () => {
  const [cards, setCards] = useState();
  const [currentUsername, setCurrentUsername] = useState();
  const [currentUserIcon, setCurrentUserIcon] = useState();

  const navigation = useNavigation();

  // Little Function For String
  const methodTier = str => {
    let arr = str.split(' ');
    return arr.pop();
  };

  useEffect(async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          setCurrentUserIcon(doc.data().iconUrl);
          setCurrentUsername(doc.data().UserName);
          console.log(doc.data().iconUrl);
        });
      });

    const bigSubs = firestore()
      .collection('valorantposts')
      .where('uid', '!=', auth().currentUser.uid)
      .limit(20)
      .onSnapshot(resp => {
        const arr = [];
        resp.forEach(doc => {
          var today = new Date();
          arr.push({
            uid: doc.data().uid,
            username: doc.data().UserName,
            avatar_url: doc.data().icon,
            league: selector.valorantImageSelector(doc.data().rank),
            tier: methodTier(doc.data().rank),
            ago: formatter.timeDifference(today, doc.data().createdAt),
            voice_chat: doc.data().voice_chat,
            token: doc.data().tokenS,
          });
        });
        setCards(arr);
      });

    () => bigSubs();
  }, []);

  // RenderItem function for all posts
  const renderItem = ({item}) => {
    return (
      <ItemOfValorant
        uid={item.uid}
        avatar_url={item.avatar_url}
        username={item.username}
        league={item.league}
        tier={item.tier}
        ago={item.ago}
        currentUserIcon={currentUserIcon}
        currentUsername={currentUsername}
        navigation={navigation}
        voice_chat={item.voice_chat}
        token={item.token}
      />
    );
  };

  return (
    <View>
      {cards ? (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={cards}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={{marginLeft: 25}}>
              <Text style={{color: 'black', fontFamily: 'Roboto-Bold'}}>
                Tüm İlanlar
              </Text>
            </View>
          }
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIndicator color="#892cdc" />
        </View>
      )}
    </View>
  );
};

export default ValorantCards;
