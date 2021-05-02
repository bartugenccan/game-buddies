import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import style from './DuoFinderScreen.component.style';
import {Avatar, Icon} from 'react-native-elements';
import SwipeCards from 'react-native-swipe-cards-deck';
import TinderCard from '../../../components/TinderCard/TinderCard.component';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

function handleYup(card) {
  console.log(`Yup for ${card.text}`);
  return true; // return false if you wish to cancel the action
}

function handleNope(card) {
  console.log(`Nope for ${card.text}`);
  return true;
}

const DuoFinderScreen = () => {
  const [cards, setCards] = useState();

  useEffect(() => {
    setTimeout(() => {
      setCards([
        {
          username: 'BerattoBB',
          profileIconUrl:
            'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
          backgroundUrl:
            'https://s3.envato.com/files/0a892d74-9142-489e-b30f-d52e8a3733aa/inline_image_preview.jpg',
          valorantaccount: {
            nickname: 'iksBe #TR1',
            league: 'BRONZE III',
          },
          apexaccount: {
            nickname: 'BERATTOBB',
            league: 'APEX PREDATOR',
          },
          leagueoflegendsaccount: {
            nickname: 'BerattoBB',
            league: 'GOLD I',
          },
          uid: 'hıasdouadad13123dabjdaus131',
          reviews: {
            1: {
              reviewSender: 'Bartu TR',
              reviewMessage: 'HLLSN',
              reviewSenderProfileIcon:
                'https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png',
            },
          },
        },
      ]);
    }, 1000);
  }, []);

  return (
    <View style={style.container}>
      <View style={{flex: 1, width: '100%'}}>
        {cards ? (
          <SwipeCards
            cards={cards}
            renderCard={cardData => <TinderCard data={cardData} />}
            keyExtractor={cardData => String(cardData.text)}
            renderNoMoreCards={() => <Text>o more cards..</Text>}
            handleYup={handleYup}
            handleNope={handleNope}
            hasMaybeAction={false}
            dragY={false}
          />
        ) : (
          <LoadingScreen />
        )}
      </View>
    </View>
  );
};

export default DuoFinderScreen;
