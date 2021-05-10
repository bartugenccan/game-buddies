import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import style from './ValorantDuoFinderScreen.component.style';

// React Navigation Import
import {useNavigation} from '@react-navigation/native';

// Firebase Import
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

// Utils
import * as selector from '../../../utils/LeagueImageSelectors';
import ItemOfValorant from '../../../components/ItemOfValorant/ItemOfValorant.component';
import * as formatter from '../../../utils/Formatters';

// Little Function For String
const methodTier = str => {
  let arr = str.split(' ');
  return arr.pop();
};

const ValorantDuoFinderScreen = () => {
  // Initial States
  const [cards, setCards] = useState();
  const [currentUsername, setCurrentUsername] = useState();
  const [currentUserIcon, setCurrentUserIcon] = useState();

  // Navigation
  const navigation = useNavigation();

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
      />
    );
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
        });
      });

    let arr = [];

    await firestore()
      .collection('valorantposts')
      .orderBy('createdAt')
      .limit(20)
      .get()
      .then(resp => {
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
          });
        });
      })
      .then(() => {
        setCards(arr);
      });
  }, []);

  return (
    <View style={style.container}>
      <View style={{flex: 1, width: '100%'}}>
        {cards ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={cards}
            renderItem={renderItem}
          />
        ) : (
          <LoadingScreen />
        )}
      </View>
    </View>
  );
};

export default ValorantDuoFinderScreen;
