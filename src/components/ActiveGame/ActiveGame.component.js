import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';

import style from './ActiveGame.component.style';
import {Button} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Toast Import
import Toast from 'react-native-simple-toast';

// Image Selector with parameters
const gameImageSelector = g => {
  switch (g) {
    case 'League Of Legends':
      return require('../../assets/images/League_of_Legends_icon.png');
    case 'Apex Legends':
      return require('../../assets/images/Apex_Legends_icon.png');
    case 'Valorant':
      return require('../../assets/images/Valorant_icon.png');
  }
};

// If there is an active game in system , render active game view
const ActiveGame = props => {
  const [visib, setVisib] = useState(false);
  return (
    <View style={style.firstView}>
      <Modal
        visible={visib}
        transparent={true}
        onRequestClose={() => setVisib(false)}
        animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{height: 200, width: 200, backgroundColor: 'white'}}>
            <Text style={{textAlign: 'center'}}>{props.game.game}</Text>
            <Text>{props.game.playedUid}</Text>
            <Text style={{textAlign: 'center'}}>{props.game.name}</Text>
            <Text>{props.game.avatarUrl}</Text>
            <Button
              title="Oyla ve bitir."
              onPress={() => {
                firestore()
                  .collection('users')
                  .where('uid', '==', auth().currentUser.uid)
                  .onSnapshot(resp =>
                    resp.forEach(doc => {
                      doc.ref.update({activeGames: false});
                    }),
                  );
                Toast.showWithGravity(
                  'Değerlendirmeni başarıyla aldık. Keyifli oyunlar!',
                  Toast.LONG,
                  Toast.BOTTOM,
                );
              }}
            />
          </View>
        </View>
      </Modal>
      <LinearGradient
        colors={['#7f53ac', '#647dee']}
        style={style.linearGradient}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar
            source={{
              uri: props.game.avatarUrl,
            }}
            size={70}
            rounded
          />
        </View>
        <View style={{flex: 0.7, marginLeft: 5}}>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 0.4,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  backgroundColor: 'transparent',
                  fontFamily: 'Roboto-Bold',
                  color: 'white',
                }}>
                Aktif Oyununuz
              </Text>
              <Avatar
                source={gameImageSelector(props.game.game)}
                rounded
                containerStyle={{marginLeft: 15}}
              />
            </View>
            <View
              style={{
                flex: 0.6,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  backgroundColor: 'transparent',
                  fontFamily: 'Roboto-MediumItalic',
                }}>
                {props.game.name}
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setVisib(true)}>
                <LinearGradient
                  colors={['#dcf8ef', '#fee2f8']}
                  style={style.activeButton}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Roboto-Medium',
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                    }}>
                    Bitir ve Oyla
                  </Text>
                  <Icon
                    name="check-circle"
                    type="font-awesome"
                    color="#647dee"
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ActiveGame;
