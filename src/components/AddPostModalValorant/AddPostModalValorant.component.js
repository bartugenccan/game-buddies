import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Switch,
} from 'react-native';

// Styling Import
import {Avatar, Icon, ListItem, Button} from 'react-native-elements';
import {BallIndicator} from 'react-native-indicators';
import Toast from 'react-native-simple-toast';
import SwitchSelector from 'react-native-switch-selector';
import style from './AddPostModalValorant.component.style';

// Data Imports
import ValorantAgentData from '../../utils/datas/ValorantDatas/ValorantAgentData';

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

const AddPostModalValorant = props => {
  // Initial States
  const [selectedAgentValorant, setSelectedAgentValorant] = useState([]);
  const [username, setUsername] = useState();
  const [profileIcon, setProfileIcon] = useState();
  const [iconURL, setIconURL] = useState();
  const [token, setToken] = useState();
  const [valorantRank, setValorantRank] = useState();
  const [voiceChat, setVoiceChat] = useState();
  const [isEnabled, setIsEnabled] = useState(false);

  //Switch
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // Loading State
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          setUsername(doc.data().ValorantAccount['Nickname']);
          setIconURL(doc.data().iconUrl);
          setValorantRank(doc.data().ValorantAccount['League']);
          setToken(doc.data().tokenS);
        });
      });
  }, []);

  // Dispatch
  const dispatch = useDispatch();

  // Firebase createPost function
  const createPost = async () => {
    try {
      console.log('createPost');
      await firestore().collection('valorantposts').add({
        UserName: username,
        voiceChat: voiceChat,
        createdAt: firestore.FieldValue.serverTimestamp(),
        rank: valorantRank,
        icon: iconURL,
        uid: auth().currentUser.uid,
        tokenS: token,
        favoriteChamp: selectedAgentValorant,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Function for onPress Event
  const _onPress = async () => {
    try {
      if (selectedAgentValorant.length === 0) {
        Toast.show('Lütfen favori karakterinizi seçiniz.', Toast.SHORT, [
          'RCTModalHostViewController',
        ]);
        return false;
      } else if (selectedAgentValorant.length != 0) {
        await createPost().then(() => {
          setSelectedAgentValorant([]);
          setVoiceChat(false);
          setLoading(false);
          dispatch(set_modal_visibility(false));
          Toast.show(
            'İlanınız başarıyla oluşturuldu. Takım arkadaşı arayan kullanıcılar size bu ilan üzerinden mesaj atabilirler.',
            Toast.LONG,
            ['RCTModalHostViewController'],
          );
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderButton = () => {
    if (loading) {
      return <BallIndicator color={'white'} size={30} />;
    } else if (!loading) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setLoading(true);
            _onPress().then(() => setLoading(false));
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              color: 'white',
              fontSize: 20,
            }}>
            İlanı oluştur
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const ValorantItem = ({img, backgroundColor}) => (
    <View style={[style.itemView, backgroundColor]}>
      <Avatar source={img} size={50} rounded />
    </View>
  );

  const renderValorantItem = ({item}) => {
    let backgroundColor = selectedAgentValorant.includes(item.id)
      ? '#892cdc'
      : '#fff';

    return (
      <TouchableOpacity
        onPress={() => {
          if (!selectedAgentValorant.includes(item.id)) {
            if (selectedAgentValorant.length > 1) {
              selectedAgentValorant.shift();
              setSelectedAgentValorant([...selectedAgentValorant, item.id]);
            }
            setSelectedAgentValorant([...selectedAgentValorant, item.id]);
          } else if (selectedAgentValorant.includes(item.id)) {
            setSelectedAgentValorant(
              selectedAgentValorant.filter(elem => {
                return elem !== item.id;
              }),
            );
          }
        }}
        activeOpacity={1}>
        <ValorantItem img={item.image} backgroundColor={{backgroundColor}} />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modal_visibility}
      onRequestClose={() => {
        dispatch(set_modal_visibility(false));
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            height: '60%',
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 15,
            overflow: 'hidden',
          }}>
          <View style={{flex: 0.15, justifyContent: 'center'}}>
            <Text
              style={{marginLeft: 15, fontFamily: 'Roboto-Bold', fontSize: 20}}>
              Yeni İlan Oluştur
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              alignItems: 'center',
            }}>
            <Avatar
              source={{
                uri:
                  'https://i.pinimg.com/236x/ea/a6/68/eaa668ece7e463e23e42db4c9bab09b2.jpg',
              }}
              size={70}
              rounded
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Blackmamba97
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 15,
                  marginBottom: 5,
                }}>
                Favori Ajanını Seç
              </Text>
            </View>
            <View>
              <FlatList
                data={ValorantAgentData}
                renderItem={renderValorantItem}
                keyExtractor={item => item.id}
                extraData={selectedAgentValorant}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 6}}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', height: 50}}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontFamily: 'segoe-ui-light-2',
                    fontWeight: 'bold',
                  }}>
                  Sesli sohbet kullanıyorum.
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                }}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{marginRight: 10}}
                />
              </View>
            </View>

            <View style={style.buttonContainer}>{renderButton()}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = ({LolAddPostResponse}) => {
  const {voice_chat, modal_visibility} = LolAddPostResponse;

  return {
    voice_chat,
    modal_visibility,
  };
};

export default connect(mapStateToProps, {
  set_playing_lane_lol,
  set_voice_chat_lol,
  set_wants_lane_lol,
  set_modal_visibility,
})(AddPostModalValorant);
