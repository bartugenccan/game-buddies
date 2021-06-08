import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Alert, Text, TouchableOpacity} from 'react-native';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import ItemOfApex from '../ItemOfApex/ItemOfApex.component';

// React Navigation Import
import {useNavigation} from '@react-navigation/native';

// Util Imports
import * as selector from '../../utils/LeagueImageSelectors';
import * as format from '../../utils/Formatters';

// Activity Indictor
import {MaterialIndicator} from 'react-native-indicators';

const ApexCards = () => {
  const [cards, setCards] = useState();
  const [currentUsername, setCurrentUsername] = useState();
  const [currentUserIcon, setCurrentUserIcon] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          setCurrentUserIcon(doc.data().iconUrl);
          setCurrentUsername(doc.data().UserName);
        });
      });

    const bigItemSubs = firestore()
      .collection('apexposts')
      .where('uid', '!=', auth().currentUser.uid)
      .limit(20)
      .onSnapshot(resp => {
        let realArr = [];
        resp.forEach(doc => {
          var today = new Date();
          realArr.push({
            uid: doc.data().uid,
            username: doc.data().UserName,
            avatar_url: doc.data().icon,
            league: selector.apexImageSelector(doc.data().rank),
            ago: format.timeDifference(today, doc.data().createdAt),
            token: doc.data().tokenS,
            favChamp: doc.data().favoriteChamp,
          });
        });
        setCards(realArr);
      });

    () => bigItemSubs();
  }, []);

  const renderItem = ({item}) => {
    return (
      <ItemOfApex
        uid={item.uid}
        avatar_url={item.avatar_url}
        username={item.username}
        subtitle={item.subtitle}
        league={item.league}
        ago={item.ago}
        voice_chat={item.voice_chat}
        navigation={navigation}
        token={item.token}
        favChamp={item.favChamp}
        currentUserIcon={currentUserIcon}
        currentUsername={currentUsername}
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

export default ApexCards;
