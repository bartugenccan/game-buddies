import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';

import style from './AddPostModalValorant.component.style';
import {Avatar} from 'react-native-elements';
import {BallIndicator} from 'react-native-indicators';
import Toast from 'react-native-simple-toast';

// React-Redux Import
import {connect, useDispatch} from 'react-redux';
import {set_voice_chat_lol, set_modal_visibility} from '../../actions';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Selectoe Import
import * as selector from '../../utils/LeagueImageSelectors';

const AddPostModalValorant = props => {
  const [username, setUsername] = useState('');
  const [profileIcon, setProfileIcon] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
  );
  const [isVoiceChat, setVoiceChat] = useState(false);
  const [token, setToken] = useState();
  const [valorantRank, setValorantRank] = useState();

  // Dispatch For react-redux
  const dispatch = useDispatch();

  useEffect(async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          setUsername(doc.data().ValorantAccount['Nickname']);
          setProfileIcon(doc.data().iconUrl);
          setValorantRank(doc.data().ValorantAccount['League']);
          setToken(doc.data().tokenS);
        });
      });
  }, []);

  //props.modal_visibility

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
          <View style={style.headerView}>
            <Text style={style.headerTextStyle}>Yeni İlan Oluştur</Text>
          </View>
          <View style={style.userIconView}>
            <Avatar source={{uri: profileIcon}} rounded size={80} />
          </View>
          <View style={style.statsView}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text style={{marginRight: 15}}>{username}</Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Avatar
                source={selector.valorantImageSelector(valorantRank)}
                containerStyle={{height: '80%', marginLeft: 10}}
              />
            </View>
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
  set_modal_visibility,
  set_voice_chat_lol,
})(AddPostModalValorant);
