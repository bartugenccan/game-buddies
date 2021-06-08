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
import ValorantCards from '../../../components/ValorantCards/ValorantCards.component';
import ValorantSelfCards from '../../../components/ValorantSelfCards/ValorantSelfCards.component';

const ValorantDuoFinderScreen = () => {
  // Initial States
  const [selfCard, setSelfCard] = useState();
  const [currentUsername, setCurrentUsername] = useState();
  const [currentUserIcon, setCurrentUserIcon] = useState();
  const [loading, setLoading] = useState(false);

  // Navigation
  const navigation = useNavigation();

  // Dispatch
  const dispatch = useDispatch();

  useEffect(async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          setCurrentUserIcon(doc.data().iconUrl);
          setCurrentUsername(doc.data().UserName);
          console.log(doc.data().iconUrl);
        });
      });
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
          <ValorantSelfCards />
        </View>
        <ValorantCards />
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
  ValorantDuoFinderScreen,
);
