import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Alert, Text, TouchableOpacity} from 'react-native';
import style from './ApexDuoFinderScreen.component.style';
import {Avatar, Icon, ListItem, Button} from 'react-native-elements';
import SwitchSelector from 'react-native-switch-selector';

// React Navigation Import
import {useNavigation} from '@react-navigation/native';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Selector and Utils Imports
import * as selector from '../../../utils/LeagueImageSelectors';
import ItemOfApex from '../../../components/ItemOfApex/ItemOfApex.component';

// Time Difference Function
import * as format from '../../../utils/Formatters';

// Add Post Modal Apex Import
import AddPostModalApex from '../../../components/AddPostModalApex/AddPostModalApex.component';

// React-Redux Imports
import {connect, useDispatch} from 'react-redux';
import {set_modal_visibility} from '../../../actions';

// Self Item Import
import SelfItemApex from '../../../components/SelfItemApex/SelfItemApex.component';

const ApexDuoFinderScreen = props => {
  const isMounted = useRef(false);

  const [cards, setCards] = useState();
  const [selfCard, setSelfCard] = useState();

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterVoiceChat, setFilterVoiceChat] = useState(null);

  const [currentUsername, setCurrentUsername] = useState();
  const [currentUserIcon, setCurrentUserIcon] = useState();

  // Navigation
  const navigation = useNavigation();

  const deletePost = async () => {
    await firestore()
      .collection('apexposts')
      .where('uid', '==', auth().currentUser.uid)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          doc.ref.set({});
          doc.ref.delete();
        });
      });
  };
  // Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    let realArr = [];
    let selfArr = [];

    isMounted.current = true;

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

    const selfSub = firestore()
      .collection('apexposts')
      .where('uid', '==', auth().currentUser.uid)
      .limit(20)
      .onSnapshot(resp => {
        resp.forEach(doc => {
          if (isMounted.current == true) {
            var today = new Date();
            var date = new Date(doc.data().createdAt);
            console.log(date);
            selfArr.push({
              uid: doc.data().uid,
              username: doc.data().UserName,
              avatar_url: doc.data().icon,
              league: selector.apexImageSelector(doc.data().rank),
              ago: format.timeDifference(today, date),
              favChamp: doc.data().favoriteChamp,
            });
            setSelfCard(selfArr);
          }
        });
      });

    const bigItemSubs = firestore()
      .collection('apexposts')
      .where('uid', '!=', auth().currentUser.uid)
      .limit(20)
      .onSnapshot(resp => {
        resp.forEach(doc => {
          if (isMounted.current == true) {
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
            setCards(realArr);
          }
        });
      });

    return () => {
      isMounted.current = false;
      bigItemSubs();
      selfSub();
    };
  }, [cards, selfCard]);

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
                onPress: () => deletePost(),
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
    <View style={style.container}>
      <AddPostModalApex />
      {cards ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={style.headerView}>
            <Icon
              name="plus-circle"
              type="font-awesome"
              size={35}
              onPress={() => null}
              containerStyle={{marginRight: 13}}
              color={'green'}
              onPress={() => dispatch(set_modal_visibility(true))}
            />
            <Icon
              name="search"
              type="material-icons"
              size={35}
              onPress={() => setFilterVisible(!filterVisible)}
              containerStyle={{marginRight: 15}}
            />
          </View>

          <View>
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
          </View>

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
        </View>
      ) : (
        <LoadingScreen />
      )}
    </View>
  );
};

const mapStateToProps = ({LolAddPostResponse}) => {
  const {voice_chat, modal_visibility} = LolAddPostResponse;

  return {
    voice_chat,
    modal_visibility,
  };
};

export default connect(mapStateToProps, {set_modal_visibility})(
  ApexDuoFinderScreen,
);
