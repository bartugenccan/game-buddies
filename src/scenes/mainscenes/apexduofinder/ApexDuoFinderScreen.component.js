import React, {useState, useEffect, useRef} from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';
import style from './ApexDuoFinderScreen.component.style';
import {Icon} from 'react-native-elements';

// React Navigation Import
import {useNavigation} from '@react-navigation/native';

// Loading Screen Import
import LoadingScreen from '../duofinderloadingscreen/LoadingScreen.component';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Add Post Modal Apex Import
import AddPostModalApex from '../../../components/AddPostModalApex/AddPostModalApex.component';

// React-Redux Imports
import {connect, useDispatch} from 'react-redux';
import {set_modal_visibility} from '../../../actions';

// Self Item Import
import SelfItemApex from '../../../components/SelfItemApex/SelfItemApex.component';
import ApexCards from '../../../components/ApexCards/ApexCards.component';
import ApexSelfCards from '../../../components/ApexSelfCards/ApexSelfCards.component';

const ApexDuoFinderScreen = props => {
  const [cards, setCards] = useState(['0']);

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterVoiceChat, setFilterVoiceChat] = useState(null);

  // Delete Post Function
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

  return (
    <View style={style.container}>
      <AddPostModalApex />

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
          <ApexSelfCards />
        </View>
        <ApexCards />
      </View>
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
