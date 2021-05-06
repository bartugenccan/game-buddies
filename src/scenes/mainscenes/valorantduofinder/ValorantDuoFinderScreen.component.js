import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import style from './ValorantDuoFinderScreen.component.style';
import {Avatar, Icon, ListItem} from 'react-native-elements';

// React Navigation Import
import {useNavigation} from '@react-navigation/native';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import ItemOfList from '../../../components/Item/Item.component.js';

const ValorantDuoFinderScreen = () => {
  const [cards, setCards] = useState();
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <ItemOfList
        avatar_url={item.avatar_url}
        username={item.username}
        subtitle={item.subtitle}
        league={item.league}
      />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setCards([
        {
          avatar_url: 'https://www.w3schools.com/w3images/avatar2.png',
          username: 'BerattoBB',
          subtitle: 'SILVER III',
          league: require('../../../assets/images/LOLLeagueEmblems/Emblem_Gold.png'),
        },
      ]);
    }, 1000);
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
