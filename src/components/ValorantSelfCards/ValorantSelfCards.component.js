import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Alert, Text, TouchableOpacity} from 'react-native';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import SelfItemValorant from '../SelfItemValorant/SelfItemValorant.component';

// Util Imports
import * as selector from '../../utils/LeagueImageSelectors';
import * as formatter from '../../utils/Formatters';

// Little Function For String
const methodTier = str => {
  let arr = str.split(' ');
  return arr.pop();
};

const ValorantSelfCards = () => {
  const [selfCard, setSelfCard] = useState([]);

  // RenderItem function for self posts
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
        <SelfItemValorant
          avatar_url={item.avatar_url}
          username={item.username}
          league={item.league}
          tier={item.tier}
          ago={item.ago}
          voice_chat={item.voice_chat}
        />
      </TouchableOpacity>
    );
  };

  const deletePost = async () => {
    await firestore()
      .collection('valorantposts')
      .where('uid', '==', auth().currentUser.uid)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          doc.ref.set({});
          doc.ref.delete();
        });
      });
  };

  useEffect(() => {
    const selfSub = firestore()
      .collection('valorantposts')
      .where('uid', '==', auth().currentUser.uid)
      .limit(20)
      .onSnapshot(resp => {
        if (resp.size == 0) {
          setSelfCard([]);
        } else if (resp.size == 1) {
          const selfArr = [];

          resp.forEach(doc => {
            var today = new Date();
            selfArr.push({
              username: doc.data().UserName,
              avatar_url: doc.data().icon,
              league: selector.valorantImageSelector(doc.data().rank),
              tier: methodTier(doc.data().rank),
              ago: formatter.timeDifference(today, doc.data().createdAt),
              voice_chat: doc.data().voice_chat,
            });
          });
          setSelfCard(selfArr);
        }
      });

    () => selfSub();
  }, []);

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

export default ValorantSelfCards;
