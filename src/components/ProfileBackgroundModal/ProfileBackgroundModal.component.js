import React, {useState} from 'react';
import Toast from 'react-native-simple-toast';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

// Style Import
import style from './ProfileBackgroundModal.component.style';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DATA = [
  {
    id: '0',
    img: 'https://wallpaperaccess.com/full/4848691.jpg',
  },
  {
    id: '1',
    img: 'https://wallpaperaccess.com/full/2722030.jpg',
  },
  {
    id: '2',
    img:
      'https://i.pinimg.com/originals/9d/36/79/9d3679333d3d9b43962eb742bc468799.jpg',
  },
  {
    id: '3',
    img:
      'https://t3.ftcdn.net/jpg/02/87/87/18/360_F_287871802_GrrmM4RgBQt7hfIPYFTkRqaj2Fb8xvY4.jpg',
  },
  {
    id: '4',
    img:
      'https://t3.ftcdn.net/jpg/03/23/88/08/360_F_323880864_TPsH5ropjEBo1ViILJmcFHJqsBzorxUB.jpg',
  },
];

const Item = ({item, onPress, borderWidth}) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
    <Image source={{uri: item.img}} style={[style.img, borderWidth]} />
  </TouchableOpacity>
);

const ProfileBackgroundModal = ({visible, closeFunc}) => {
  // Initial State of selectedUrl
  const [selectedUrl, setSelectedUrl] = useState('');

  // Users db
  const db = firestore().collection('users');

  const _onPress = () => {
    if (selectedUrl == '') {
      Toast.showWithGravity(
        'Profil arka planınız için lütfen bir resmi seçiniz.',
        Toast.LONG,
        Toast.BOTTOM,
      );
    } else if (selectedUrl != '') {
      db.where('uid', '==', auth().currentUser.uid).onSnapshot(resp =>
        resp.forEach(doc =>
          doc.ref.update({backgroundUrl: selectedUrl}).then(() => {
            closeFunc();
            Toast.showWithGravity(
              'Arka plan fotoğrafınız başarıyla güncellenmiştir.',
              Toast.LONG,
              Toast.BOTTOM,
            );
          }),
        ),
      );
    }
  };
  const renderItem = ({item}) => {
    const borderWidth = item.img == selectedUrl ? 5 : 0;

    return (
      <Item
        item={item}
        onPress={() => setSelectedUrl(item.img)}
        borderWidth={{borderWidth}}
      />
    );
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
        activeOpacity={1}
        onPressOut={() => closeFunc()}>
        <TouchableWithoutFeedback>
          <View
            style={{
              height: '70%',
              width: '80%',
              backgroundColor: '#fff',
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <View
              style={{
                flex: 0.85,
              }}>
              <View onStartShouldSetResponder={() => true}>
                <FlatList
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{
                    paddingBottom: 5,
                  }}
                  extraData={selectedUrl}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: '50%',
                  aspectRatio: 2.5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#178bd8',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={1}
                onPress={_onPress}>
                <Text style={{color: '#178bd8', fontSize: 18}}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ProfileBackgroundModal;
