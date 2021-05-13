import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Modal} from 'react-native';

// Style Imports
import style from './ValorantDuoFinderScreen.component.style';
import Spinner from '../../../components/Spinner/Spinner.component';
import {Icon, Button} from 'react-native-elements';

// React Navigation Import
import {useNavigation} from '@react-navigation/native';

// Firebase Import
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

// React-Redux Imports
import {connect, useDispatch} from 'react-redux';
import {set_modal_visibility} from '../../../actions';

// Time Difference Function
import * as format from '../../../utils/Formatters';

// Add Post Modal Import
import AddPostModalValorant from '../../../components/AddPostModalValorant/AddPostModalValorant.component';

// Utils
import * as selector from '../../../utils/LeagueImageSelectors';
import * as formatter from '../../../utils/Formatters';

// Items
import ItemOfValorant from '../../../components/ItemOfValorant/ItemOfValorant.component';
import SelfItemValorant from '../../../components/SelfItemValorant/SelfItemValorant.component';

// Little Function For String
const methodTier = str => {
  let arr = str.split(' ');
  return arr.pop();
};

const ValorantDuoFinderScreen = () => {
  // Initial States
  const [cards, setCards] = useState();
  const [selfCard, setSelfCard] = useState();
  const [currentUsername, setCurrentUsername] = useState();
  const [currentUserIcon, setCurrentUserIcon] = useState();
  const [loading, setLoading] = useState(false);

  // Navigation
  const navigation = useNavigation();

  // Dispatch
  const dispatch = useDispatch();

  // RenderItem function for self posts
  const renderSelfItem = ({item}) => {
    return (
      <SelfItemValorant
        avatar_url={item.avatar_url}
        username={item.username}
        league={item.league}
        tier={item.tier}
        ago={item.ago}
        voice_chat={item.voice_chat}
      />
    );
  };

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

    const selfSub = firestore()
      .collection('valorantposts')
      .where('uid', '==', auth().currentUser.uid)
      .limit(20)
      .onSnapshot(resp => {
        const selfArr = [];
        resp.forEach(doc => {
          arr.push({
            username: doc.data().UserName,
            avatar_url: doc.data().icon,
            league: selector.valorantImageSelector(doc.data().rank),
            tier: methodTier(doc.data().rank),
            ago: formatter.timeDifference(today, doc.data().createdAt),
            voice_chat: doc.data().voice_chat,
          });
        });
        setSelfCard(selfArr);
      });

    () => {
      bigSubs();
      selfSub();
    };
  }, []);

  return (
    <View style={style.container}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: 100,
              width: 200,
              backgroundColor: '#892cdc',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Spinner color={'yellow'} size={100}></Spinner>
          </View>
        </View>
      </Modal>
      <AddPostModalValorant />
      {cards ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={style.headerView}>
            <Icon
              name="plus-circle"
              type="font-awesome"
              size={35}
              onPress={() => null}
              containerStyle={{marginRight: 13}}
              onPress={() => {
                dispatch(set_modal_visibility(true));
              }}
              color={'green'}
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
  ValorantDuoFinderScreen,
);
