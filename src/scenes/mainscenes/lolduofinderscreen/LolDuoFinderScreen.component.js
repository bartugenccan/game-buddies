import React, {useState, useEffect} from 'react';

// Style Imports
import {View, FlatList, Text, TouchableOpacity, Modal} from 'react-native';
import style from './LolDuoFinderScreen.component.style';
import {Icon, Button} from 'react-native-elements';
import ItemOfList from '../../../components/Item/Item.component.js';
import LolLeagueFlatListItem from '../../../components/LolLeagueFlatListItem/LolLeagueFlatListItem.component';
import SwitchSelector from 'react-native-switch-selector';
import Spinner from '../../../components/Spinner/Spinner.component';
import AddPostModal from '../../../components/AddPostModal/AddPostModal.component';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// React-Redux Imports
import {connect, useDispatch} from 'react-redux';

// Datas Import
import FilterLeagueLolData from '../../../utils/datas/LeagueOfLegendsFilterDatas/FilterLeagueLolData';
import FilterLaneLolData from '../../../utils/datas/LeagueOfLegendsFilterDatas/FilterLaneLolData';
import {set_modal_visibility} from '../../../actions';

const DuoFinderScreen = props => {
  // Initial States
  const [cards, setCards] = useState();
  const [filterVisible, setFilterVisible] = useState(false);

  const [selectedLeagueLol, setSelectedLeagueLol] = useState([]);
  const [selectedLaneLol, setSelectedLaneLol] = useState([]);
  const [voiceChat, setVoiceChat] = useState(null);

  const [loading, setLoading] = useState(false);
  const [addPostVisible, setAddPostVisible] = useState(false);

  // Dispatch
  const dispatch = useDispatch();

  const voiceChatOption = [
    {label: 'Farketmez', value: 1},
    {label: 'Sesli Sohbet olsun.', value: 2},
  ];
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
                {label: 'Farketmez', value: 1},
                {label: 'Sesli sohbet olsun', value: 2},
              ]}
              initial={0}
              textColor={'#892cdc'}
              selectedColor={'white'}
              buttonColor={'#892cdc'}
              borderRadius={50}
              hasPadding
              onPress={value => setVoiceChat(value)}
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
            />
          </View>
        </View>
      );
    } else if (f === false || f === null) {
      return null;
    }
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
        {
          avatar_url: 'https://www.w3schools.com/w3images/avatar2.png',
          username: 'BerattoBB',
          subtitle: 'SILVER III',
          league: require('../../../assets/images/LOLLeagueEmblems/Emblem_Gold.png'),
        },
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

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={cards}
            renderItem={renderItem}
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
