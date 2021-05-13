import React, {useState, useEffect, useRef} from 'react';

// Style Imports
import {View, FlatList, Text, TouchableOpacity, Modal} from 'react-native';
import style from './LolDuoFinderScreen.component.style';
import {Icon, Button} from 'react-native-elements';

// List Item Component
import ItemOfList from '../../../components/Item/Item.component.js';
import SelfItemLol from '../../../components/SelfItemLol/SelfItemLol.component';
import LolLeagueFlatListItem from '../../../components/LolLeagueFlatListItem/LolLeagueFlatListItem.component';

// Switch Selector
import SwitchSelector from 'react-native-switch-selector';

// Loading Spinner
import Spinner from '../../../components/Spinner/Spinner.component';

// Add Post Modal Component
import AddPostModal from '../../../components/AddPostModal/AddPostModal.component';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// useNavigation
import {useNavigation} from '@react-navigation/native';

// React-Redux Imports
import {connect, useDispatch} from 'react-redux';

// Image Selector Import
import * as selector from '../../../utils/LeagueImageSelectors';

// Time Difference Function
import * as format from '../../../utils/Formatters';

// Datas Import
import FilterLeagueLolData from '../../../utils/datas/LeagueOfLegendsFilterDatas/FilterLeagueLolData';
import FilterLaneLolData from '../../../utils/datas/LeagueOfLegendsFilterDatas/FilterLaneLolData';
import {set_modal_visibility} from '../../../actions';

// Little Function For String
const methodTier = str => {
  let arr = str.split(' ');
  return arr.pop();
};

// Filter Function Import
import filterFunction from '../../../utils/filterFunction';

const DuoFinderScreen = props => {
  const isMounted = useRef(false);

  // Initial States
  const [cards, setCards] = useState();
  const [selfCard, setSelfCard] = useState();
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedLeagueLol, setSelectedLeagueLol] = useState([]);
  const [selectedLaneLol, setSelectedLaneLol] = useState([]);
  const [filterVoiceChat, setFilterVoiceChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUsername, setCurrentUsername] = useState();
  const [currentUserIcon, setCurrentUserIcon] = useState();

  // Navigation
  const navigation = useNavigation();

  // Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
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
      .collection('lolposts')
      .where('uid', '==', auth().currentUser.uid)
      .limit(20)
      .onSnapshot(resp => {
        let selfArr = [];
        resp.forEach(doc => {
          var today = new Date();
          selfArr.push({
            username: doc.data().UserName,
            avatar_url: doc.data().icon,
            league: selector.lolLeagueImageSelector(doc.data().rank),
            tier: methodTier(doc.data().rank),
            playing_lane: format.LolLaneFormatter(doc.data().playing_lane),
            wanted_lane: format.LolLaneFormatter(doc.data().wantsLane),
            ago: format.timeDifference(today, doc.data().createdAt),
            voice_chat: doc.data().voiceChat,
          });
        });
        setSelfCard(selfArr);
      });

    const bigSubs = firestore()
      .collection('lolposts')
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
            league: selector.lolLeagueImageSelector(doc.data().rank),
            tier: methodTier(doc.data().rank),
            playing_lane: format.LolLaneFormatter(doc.data().playing_lane),
            wanted_lane: format.LolLaneFormatter(doc.data().wantsLane),
            ago: format.timeDifference(today, doc.data().createdAt),
            voice_chat: doc.data().voiceChat,
            token: doc.data().tokenS,
          });
        });
        setCards(arr);
      });

    return () => {
      selfSub();
      bigSubs();
    };
  }, []);

  const renderItem = ({item}) => {
    return (
      <ItemOfList
        uid={item.uid}
        username={item.username}
        avatar_url={item.avatar_url}
        league={item.league}
        tier={item.tier}
        playingLane={item.playing_lane}
        wantsLane={item.wanted_lane}
        navigation={navigation}
        ago={item.ago}
        voice_chat={item.voice_chat}
        currentUserIcon={currentUserIcon}
        currentUsername={currentUsername}
        token={item.token}
      />
    );
  };

  const renderSelfItem = ({item}) => {
    return (
      <SelfItemLol
        username={item.username}
        avatar_url={item.avatar_url}
        league={item.league}
        tier={item.tier}
        playingLane={item.playing_lane}
        wantsLane={item.wanted_lane}
        ago={item.ago}
        voice_chat={item.voice_chat}
      />
    );
  };

  const renderItemLolLeague = ({item}) => {
    let backgroundColor = selectedLeagueLol.includes(item.id)
      ? '#892cdc'
      : '#fff';

    let color = selectedLeagueLol.includes(item.id) ? '#fff' : 'black';

    return (
      <TouchableOpacity
        onPress={() => {
          if (!selectedLeagueLol.includes(item.id)) {
            setSelectedLeagueLol([...selectedLeagueLol, item.id]);
          } else if (selectedLeagueLol.includes(item.id)) {
            setSelectedLeagueLol(
              selectedLeagueLol.filter(elem => {
                return elem !== item.id;
              }),
            );
          }
        }}
        activeOpacity={1}>
        <LolLeagueFlatListItem
          label={item.label}
          backgroundColor={{backgroundColor}}
          color={{color}}
        />
      </TouchableOpacity>
    );
  };

  const renderItemLolLane = ({item}) => {
    let backgroundColor = selectedLaneLol.includes(item.id)
      ? '#892cdc'
      : '#fff';

    let color = selectedLaneLol.includes(item.id) ? '#fff' : 'black';

    return (
      <TouchableOpacity
        onPress={() => {
          if (!selectedLaneLol.includes(item.id)) {
            setSelectedLaneLol([...selectedLaneLol, item.id]);
          } else if (selectedLaneLol.includes(item.id)) {
            setSelectedLaneLol(
              selectedLaneLol.filter(elem => {
                return elem !== item.id;
              }),
            );
          }
        }}
        activeOpacity={1}>
        <LolLeagueFlatListItem
          label={item.label}
          backgroundColor={{backgroundColor}}
          color={{color}}
        />
      </TouchableOpacity>
    );
  };

  const renderChoice = f => {
    if (f === true) {
      return (
        <View style={{width: '100%', height: 250}}>
          <View style={{flex: 0.27}}>
            <View style={{flex: 0.3}}>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 0,
                  textAlign: 'center',
                }}>
                Lig
              </Text>
            </View>
            <View
              style={{
                flex: 0.7,
              }}>
              <FlatList
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                data={FilterLeagueLolData}
                renderItem={renderItemLolLeague}
                extraData={selectedLeagueLol}
                contentContainerStyle={{alignSelf: 'center'}}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={{flex: 0.27}}>
            <View style={{flex: 0.3}}>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 0,
                  textAlign: 'center',
                }}>
                Koridor
              </Text>
            </View>
            <View style={{flex: 0.7}}>
              <FlatList
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                data={FilterLaneLolData}
                renderItem={renderItemLolLane}
                extraData={selectedLaneLol}
                contentContainerStyle={{alignSelf: 'center'}}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.27,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SwitchSelector
              options={[
                {label: 'Farketmez', value: true},
                {label: 'Sesli sohbet olsun', value: false},
              ]}
              initial={0}
              textColor={'#892cdc'}
              selectedColor={'white'}
              buttonColor={'#892cdc'}
              borderRadius={50}
              hasPadding
              onPress={value => setFilterVoiceChat(value)}
              style={{width: '80%'}}
              borderColor={'#892cdc'}
              borderWidth={1}
            />
          </View>
          <View
            style={{
              flex: 0.19,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              title={'Filtrele'}
              type="solid"
              buttonStyle={{
                width: '50%',
                backgroundColor: '#892cdc',
                justifyContent: 'space-evenly',
              }}
              onPress={() => {
                let tempCards = filterFunction(
                  cards,
                  selectedLeagueLol,
                  [],
                  filterVoiceChat,
                );
                setCards(tempCards);
              }}
            />
          </View>
        </View>
      );
    } else if (f === false || f === null) {
      return null;
    }
  };

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
      <AddPostModal />
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

          {renderChoice(filterVisible)}

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
  const {
    playing_lane,
    wanted_lane,
    voice_chat,
    modal_visibility,
  } = LolAddPostResponse;

  return {
    playing_lane,
    wanted_lane,
    voice_chat,
    modal_visibility,
  };
};

export default connect(mapStateToProps, {set_modal_visibility})(
  DuoFinderScreen,
);
