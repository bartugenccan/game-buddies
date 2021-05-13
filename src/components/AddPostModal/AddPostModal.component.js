// React && Style Imports
import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import style from './AddPostModal.component.style';
import {Avatar} from 'react-native-elements';
import LolLaneImageFlatlistItem from '../../components/LolLaneImageFlatlistItem/LolLaneImageFlatlistItem.component';
import {BallIndicator} from 'react-native-indicators';
import Toast from 'react-native-simple-toast';

// React-Redux Import
import {connect, useDispatch} from 'react-redux';
import {
  set_voice_chat_lol,
  set_wants_lane_lol,
  set_playing_lane_lol,
  set_modal_visibility,
} from '../../actions';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Datas Imports
import FilterLaneLolData from '../../utils/datas/LeagueOfLegendsFilterDatas/FilterLaneLolData';

const AddPostModal = props => {
  const [username, setUsername] = useState('');
  const [profileIcon, setProfileIcon] = useState(1);
  const [isVoiceChat, setVoiceChat] = useState(false);
  const [lolRank, setLolRank] = useState();
  const [iconURL, setIconURL] = useState();
  const [token, setToken] = useState();

  // League Of Legends Playing Role Selection
  const [selectedLaneLol, setSelectedLaneLol] = useState([]);
  const [selectedLaneWantsLol, setSelectedLaneWantsLol] = useState([]);

  // Function for Switch
  const toggleSwitch = () => setVoiceChat(!isVoiceChat);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Firebase createPost function
  const createPost = async () => {
    try {
      await firestore().collection('lolposts').add({
        UserName: username,
        playing_lane: selectedLaneLol,
        wantsLane: selectedLaneWantsLol,
        voiceChat: isVoiceChat,
        createdAt: firestore.FieldValue.serverTimestamp(),
        rank: lolRank,
        icon: iconURL,
        uid: auth().currentUser.uid,
        tokenS: token,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Function for onPress Event
  const _onPress = async () => {
    try {
      if (selectedLaneLol.length === 0) {
        Toast.show(
          'Lütfen oynamak istediğiniz koridor veya koridorları seçiniz.',
          Toast.SHORT,
          ['RCTModalHostViewController'],
        );
      } else if (selectedLaneWantsLol == 0) {
        Toast.show(
          'Lütfen aradığınız koridor veya koridorları seçiniz.',
          Toast.SHORT,
          ['RCTModalHostViewController'],
        );
      } else if (selectedLaneLol.length !== 0 && selectedLaneWantsLol !== 0) {
        await createPost();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Dispatch
  const dispatch = useDispatch();

  // Renders button depend on loading state.
  const renderButton = () => {
    if (loading) {
      return <BallIndicator color={'white'} size={30} />;
    } else if (!loading) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              color: 'white',
              fontSize: 20,
            }}
            onPress={() => {
              setLoading(true);
              _onPress().then(() => {
                setSelectedLaneLol([]);
                setVoiceChat(false);
                setSelectedLaneWantsLol([]);
                setLoading(false);
                dispatch(set_modal_visibility(false));
                Toast.show(
                  'İlanınız başarıyla oluşturuldu. Takım arkadaşı arayan kullanıcılar size bu ilan üzerinden mesaj atabilirler.',
                  Toast.LONG,
                  ['RCTModalHostViewController'],
                );
              });
            }}>
            İlanı oluştur
          </Text>
        </TouchableOpacity>
      );
    }
  };

  // RenderItem function for League of Legends lane image
  const renderItemLolImageLane = ({item}) => {
    let backgroundColor = selectedLaneLol.includes(item.id)
      ? '#d3d3d3'
      : '#fff';

    return (
      <TouchableOpacity
        onPress={() => {
          if (!selectedLaneLol.includes(item.id)) {
            if (selectedLaneLol.length > 1) {
              selectedLaneLol.shift();
              setSelectedLaneLol([...selectedLaneLol, item.id]);
            }
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
        <LolLaneImageFlatlistItem
          img={item.image}
          backgroundColor={{backgroundColor}}
        />
      </TouchableOpacity>
    );
  };

  // RenderItem function for League of Legends lane image
  const renderItemLolImageWantLane = ({item}) => {
    let backgroundColor = selectedLaneWantsLol.includes(item.id)
      ? '#d3d3d3'
      : '#fff';

    return (
      <TouchableOpacity
        onPress={() => {
          if (!selectedLaneWantsLol.includes(item.id)) {
            if (selectedLaneWantsLol.length > 1) {
              selectedLaneWantsLol.shift();
              setSelectedLaneWantsLol([...selectedLaneWantsLol, item.id]);
            } else {
              setSelectedLaneWantsLol([...selectedLaneWantsLol, item.id]);
            }
          } else if (selectedLaneWantsLol.includes(item.id)) {
            setSelectedLaneWantsLol(
              selectedLaneWantsLol.filter(elem => {
                return elem !== item.id;
              }),
            );
          }
        }}
        activeOpacity={1}>
        <LolLaneImageFlatlistItem
          img={item.image}
          backgroundColor={{backgroundColor}}
        />
      </TouchableOpacity>
    );
  };

  useEffect(async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          setUsername(doc.data().LolAccount['Nickname']);
          setProfileIcon(doc.data().LolAccount['iconID']);
          setLolRank(doc.data().LolAccount['SoloQueueRanked']);
          setIconURL(doc.data().iconUrl);
          setToken(doc.data().tokenS);
        });
      });
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modal_visibility}
      onRequestClose={() => {
        dispatch(set_modal_visibility(false));
      }}>
      <View style={style.container}>
        <View style={style.bigView}>
          <View style={style.headerTextView}>
            <Text style={style.headerTextStyle}>Yeni İlan Oluştur</Text>
          </View>
          <View style={style.userView}>
            <Avatar
              rounded
              size={70}
              source={{
                uri:
                  'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/profileicon/' +
                  profileIcon +
                  '.png',
              }}
            />
            <Text style={style.usernameTextStyle}>{username}</Text>
          </View>
          <View style={style.inputView}>
            <View style={style.firstView}>
              <Text style={style.firstViewTextStyle}>Ne oynamak istersin?</Text>
              <FlatList
                horizontal
                keyExtractor={(item, index) => index}
                data={FilterLaneLolData}
                renderItem={renderItemLolImageLane}
                extraData={selectedLaneLol}
                contentContainerStyle={{alignSelf: 'center'}}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={style.secondView}>
              <Text style={style.firstViewTextStyle}>
                Kimlerle oynamak istersin?
              </Text>
              <FlatList
                horizontal
                keyExtractor={(item, index) => index}
                data={FilterLaneLolData}
                renderItem={renderItemLolImageWantLane}
                extraData={selectedLaneWantsLol}
                contentContainerStyle={{alignSelf: 'center'}}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={style.thirdView}>
              <View style={style.thirdTextView}>
                <Text style={{marginLeft: 10, fontFamily: 'Roboto-Medium'}}>
                  Sesli sohbet kullanıyorum.
                </Text>
              </View>
              <View style={style.thirdSwitchView}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isVoiceChat ? 'blue' : '#f4f3f4'}
                  onValueChange={toggleSwitch}
                  value={isVoiceChat}
                />
              </View>
            </View>
          </View>
          <View style={style.buttonView}>
            <View style={style.buttonContainer}>{renderButton()}</View>
          </View>
        </View>
      </View>
    </Modal>
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

export default connect(mapStateToProps, {
  set_playing_lane_lol,
  set_voice_chat_lol,
  set_wants_lane_lol,
  set_modal_visibility,
})(AddPostModal);
