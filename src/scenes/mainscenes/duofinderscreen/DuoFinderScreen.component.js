import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import style from './DuoFinderScreen.component.style';
import {Avatar, Icon} from 'react-native-elements';

// React Navigation Import
import {useNavigation} from '@react-navigation/native';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DuoFinderScreen = ({route, navigation}) => {
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
        {cards ? <Text>BerattoBB</Text> : <LoadingScreen />}
      </View>
    </View>
  );
};

export default DuoFinderScreen;
