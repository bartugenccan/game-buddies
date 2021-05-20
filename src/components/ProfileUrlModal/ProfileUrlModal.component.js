import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Text,
  View,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {Avatar} from 'react-native-elements';

import style from './ProfileUrlModal.component.style';
import Toast from 'react-native-simple-toast';

// Firebase Import
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Indicator Import
import {BallIndicator} from 'react-native-indicators';

const DATA = [
  {
    id: '0',
    img: 'https://www.blexar.com/avatar.png',
  },
  {
    id: '1',
    img:
      'https://img.pngio.com/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png',
  },
  {
    id: '2',
    img:
      'https://img.favpng.com/17/17/20/professional-computer-icons-avatar-job-png-favpng-tWiTgDuutg4v0iY0j8d5T5fVb.jpg',
  },
  {
    id: '3',
    img:
      'https://img.favpng.com/17/17/20/professional-computer-icons-avatar-job-png-favpng-tWiTgDuutg4v0iY0j8d5T5fVb.jpg',
  },
];

const Item = ({item, onPress, borderColor}) => (
  <Avatar
    source={{uri: item.img}}
    size={70}
    onPress={onPress}
    avatarStyle={[borderColor, style.item]}
    containerStyle={{marginHorizontal: 5, alignSelf: 'center'}}
    rounded
  />
);

const ProfileUrlModal = ({visible, closeFunc}) => {
  const [selectedUrl, setSelectedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const lolDb = firestore().collection('lolposts');
  const valorantDb = firestore().collection('valorantposts');
  const apexDb = firestore().collection('apexposts');

  const renderItem = ({item}) => {
    const borderColor = item.img === selectedUrl ? '#892cdc' : 'white';

    return (
      <Item
        item={item}
        onPress={() => setSelectedUrl(item.img)}
        borderColor={{borderColor}}
      />
    );
  };

  const _onPress = () => {
    if (selectedUrl.length == 0) {
      Toast.show('Lütfen bir profil fotoğrafı seçiniz.', Toast.LONG, [
        'UIAlertController',
      ]);
    } else if (selectedUrl.length != 0) {
      setLoading(true);

      firestore()
        .collection('users')
        .where('UserEmail', '==', auth().currentUser.email)
        .get()
        .then(resp => {
          resp.forEach(doc => {
            doc.ref.update({iconUrl: selectedUrl});

            if (doc.data().ValorantAccount != null) {
              valorantDb
                .where('uid', '==', auth().currentUser.uid)
                .onSnapshot(resp =>
                  resp.forEach(doc => doc.ref.update({icon: selectedUrl})),
                );
            }
            if (doc.data().ApexAccount != null) {
              apexDb
                .where('uid', '==', auth().currentUser.uid)
                .onSnapshot(resp =>
                  resp.forEach(doc => doc.ref.update({icon: selectedUrl})),
                );
            }
            if (doc.data().LolAccount != null) {
              lolDb
                .where('uid', '==', auth().currentUser.uid)
                .onSnapshot(resp =>
                  resp.forEach(doc => doc.ref.update({icon: selectedUrl})),
                );
            }
          });
        })
        .then(() => {
          firestore()
            .collection('messages')
            .where('members', 'array-contains', auth().currentUser.uid)
            .onSnapshot(resp => {
              resp.forEach(doc => {
                let tempArr = doc.data()[auth().currentUser.uid];
                tempArr[0] = selectedUrl;
                doc.ref.update({[auth().currentUser.uid]: tempArr});
              });
            });
        })
        .then(() => {
          setLoading(false);
          closeFunc();
          Toast.show(
            'Profile fotoğrafınız başarıyla güncellenmiştir.',
            Toast.LONG,
            ['UIAlertController'],
          );
        });
    }
  };
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        onPressOut={() => closeFunc()}
        activeOpacity={1}>
        <TouchableWithoutFeedback>
          <View
            style={{
              width: '80%',
              height: '20%',
              backgroundColor: 'white',
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <View
              style={{
                flex: 0.7,
              }}>
              <View style={{alignSelf: 'center'}}>
                <FlatList
                  horizontal
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedUrl}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: '75%',
                  width: 70,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderColor: '#892cdc',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={1}
                onPress={_onPress}>
                {loading == false ? (
                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      color: '#892cdc',
                      fontSize: 17,
                    }}>
                    Kaydet
                  </Text>
                ) : (
                  <BallIndicator color="#892cdc" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ProfileUrlModal;
