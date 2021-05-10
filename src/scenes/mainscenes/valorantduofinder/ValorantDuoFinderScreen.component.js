import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import style from './ValorantDuoFinderScreen.component.style';

// React Navigation Import
import {useNavigation} from '@react-navigation/native';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

// Utils
import * as selector from '../../../utils/LeagueImageSelectors';
import ItemOfValorant from '../../../components/ItemOfValorant/ItemOfValorant.component';

// Little Function For String
const methodTier = str => {
  let arr = str.split(' ');
  return arr.pop();
};

const ValorantDuoFinderScreen = () => {
  const [cards, setCards] = useState();
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <ItemOfValorant
        avatar_url={item.avatar_url}
        username={item.username}
        league={item.league}
        tier={item.tier}
      />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setCards([
        {
          uid: 'asdjhadahdha',
          username: 'Blackmamba97 #TR1',
          avatar_url: 'https://www.w3schools.com/w3images/avatar2.png',
          league: selector.valorantImageSelector('PLATINUM III'),
          tier: methodTier('PLATINUM III'),
          favorite_champs: ['Breach , Raze'],
          ago: '10 dk önce',
          voice_chat: false,
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
