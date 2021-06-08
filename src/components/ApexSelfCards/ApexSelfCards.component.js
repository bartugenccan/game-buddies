import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Alert, Text, TouchableOpacity} from 'react-native';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SelfItemApex from '../SelfItemApex/SelfItemApex.component';

// Util Imports
import * as selector from '../../utils/LeagueImageSelectors';
import * as format from '../../utils/Formatters';

const ApexSelfCards = () => {
  const [selfCard, setSelfCard] = useState([]);

  const deletePost = async () => {
    await firestore()
      .collection('apexposts')
      .where('uid', '==', auth().currentUser.uid)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          doc.ref.delete();
        });
      });
  };

  useEffect(() => {
    const selfSub = firestore()
      .collection('apexposts')
      .where('uid', '==', auth().currentUser.uid)
      .limit(20)
      .onSnapshot(resp => {
        console.log(resp.size);
        if (resp.size == 0) {
          setSelfCard([]);
        } else if (resp.size == 1) {
          let selfArr = [];

          resp.forEach(doc => {
            var today = new Date();
            var date = new Date(doc.data().createdAt);
            selfArr.push({
              uid: doc.data().uid,
              username: doc.data().UserName,
              avatar_url: doc.data().icon,
              league: selector.apexImageSelector(doc.data().rank),
              ago: format.timeDifference(today, date),
              favChamp: doc.data().favoriteChamp,
            });
          });
          setSelfCard(selfArr);
        }
      });

    return () => selfSub();
  }, []);

  const renderSelfItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          overflow: 'hidden',
          alignSelf: 'center',
        }}
        activeOpacity={1}
        onLongPress={() => {
          Alert.alert(
            'İlanınızı kaldırmak istiyor musunuz ?',
            'İlanınızı kaldırarak daha sonra yeni bir ilan oluşturabilirsiniz.',
            [
              {
                text: 'Vazgeç',
                onPress: () => null,
              },
              {
                text: 'Kaldır',
                onPress: () => {
                  setSelfCard([]);
                  deletePost();
                },
              },
            ],
          );
        }}>
        <SelfItemApex
          username={item.username}
          avatar_url={item.avatar_url}
          league={item.league}
          ago={item.ago}
          voice_chat={item.voice_chat}
          favChamp={item.favChamp}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={selfCard}
      renderItem={renderSelfItem}
      ListHeaderComponent={
        <View style={{marginLeft: 25}}>
          <Text style={{color: 'black', fontFamily: 'Roboto-Bold'}}>
            Benim İlanım
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View
          style={{
            width: '100%',
            height: 75,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              color: 'gray',
              fontSize: 12,
              width: '60%',
              textAlign: 'center',
            }}>
            İlan oluşturduktan sonra burdan ilanını inceleyebilirsin.
          </Text>
        </View>
      }
    />
  );
};

export default ApexSelfCards;
