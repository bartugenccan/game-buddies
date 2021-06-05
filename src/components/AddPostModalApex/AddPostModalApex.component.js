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
import style from './AddPostModalApex.component.style';

// Data Imports
import ChampionApexData from '../../utils/datas/ApexLegendsChampionDatas/ChampionApexData';

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

const AddPostModalApex = props => {
  // Initial States
  const [selectedLegendApex, setSelectedLegendApex] = useState([]);
  const [username, setUsername] = useState();
  const [iconURL, setIconURL] = useState();
  const [token, setToken] = useState();
  const [apexRank, setApexRank] = useState();
  const [isVoiceChat, setVoiceChat] = useState(false);

  // Can Add State
  const [canAdd, setCanAdd] = useState();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Function for Switch
  const toggleSwitch = () => setVoiceChat(!isVoiceChat);

  useEffect(async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          setUsername(doc.data().ApexAccount['Nickname']);
          setIconURL(doc.data().iconUrl);
          setApexRank(doc.data().ApexAccount['League']);
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
      await firestore().collection('apexposts').add({
        UserName: username,
        voiceChat: isVoiceChat,
        createdAt: firestore.FieldValue.serverTimestamp(),
        rank: apexRank,
        icon: iconURL,
        uid: auth().currentUser.uid,
        tokenS: token,
        favoriteChamp: selectedLegendApex,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Function for onPress Event
  const _onPress = async () => {
    try {
      if (selectedLegendApex.length === 0) {
        Toast.show('Lütfen favori karakterinizi seçiniz.', Toast.SHORT, [
          'RCTModalHostViewController',
        ]);
        return false;
      } else if (selectedLegendApex.length != 0) {
        await createPost().then(() => {
          setSelectedLegendApex([]);
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
  const ApexLegendsItem = ({item, onPress, backgroundColor}) => (
    <TouchableOpacity
      onPressIn={() => onPress()}
      style={[style.item, backgroundColor]}>
      <Avatar source={item.image} size={50} rounded />
    </TouchableOpacity>
  );

  const renderApexItem = ({item}) => {
    const backgroundColor = item.image == selectedLegendApex ? 'gold' : 'white';

    return (
      <ApexLegendsItem
        item={item}
        onPress={() => {
          setSelectedLegendApex(item.image);
          console.log(item.image);
        }}
        backgroundColor={{backgroundColor}}
      />
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modal_visibility} // true
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
            <Avatar source={{uri: iconURL}} size={70} rounded />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {username}
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
                Favori Karakterini Seç
              </Text>
            </View>
            <View>
              <FlatList
                data={ChampionApexData}
                renderItem={renderApexItem}
                keyExtractor={item => item.id}
                extraData={selectedLegendApex}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 6}}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 50,
              }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                }}>
                <Text style={{marginLeft: 15, fontFamily: 'Roboto-Medium'}}>
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
                  thumbColor={isVoiceChat ? 'blue' : '#f4f3f4'}
                  onValueChange={toggleSwitch}
                  value={isVoiceChat}
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
})(AddPostModalApex);
