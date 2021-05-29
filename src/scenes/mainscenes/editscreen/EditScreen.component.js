import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {Input, Icon} from 'react-native-elements';

// Firebase Imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Toast Import
import Toast from 'react-native-simple-toast';

// Avatar Component
import EditProfileAvatar from '../../../components/EditProfileAvatar/EditProfileAvatar.component';

// Avatar Select Modal Import
import ProfileUrlModal from '../../../components/ProfileUrlModal/ProfileUrlModal.component';

// Background Select Modal Import
import ProfileBackgroundModal from '../../../components/ProfileBackgroundModal/ProfileBackgroundModal.component';

const EditScreen = () => {
  const [bio, setBio] = useState('');
  const [profileIconModalVisib, setProfileIconModalVisib] = useState(false);
  const [
    profileBackgroundModalVisib,
    setProfileBackgroundModalVisib,
  ] = useState(false);

  const _onPress = () => {
    if (bio.length > 60) {
      Toast.show(
        'Karakter sınırını aştın. Biyografine maksimum 60 karakter girebilirsin.',
        Toast.LONG,
        ['UIAlertController'],
      );
    } else if (bio.length <= 60 && bio.length != 0) {
      firestore()
        .collection('users')
        .where('UserEmail', '==', auth().currentUser.email)
        .onSnapshot(resp => {
          resp.forEach(doc => {
            doc.ref.update({
              bio: bio,
            });
          });
        });
      Toast.show('Biyografin başarıyla kaydedildi.', Toast.LONG, [
        'UIAlertController',
      ]);
    }
  };

  const renderView = () => {
    if (bio.length <= 60 && bio.length != 0) {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: Dimensions.get('screen').width / 9,
          }}>
          <Icon name="check" type="font-awesome" size={15} color="green" />
        </View>
      );
    } else if (bio.length > 60) {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: Dimensions.get('screen').width / 9,
          }}>
          <Icon name="times" type="font-awesome" size={15} color="red" />
        </View>
      );
    }
  };

  const _closeFunc = () => {
    setProfileIconModalVisib(false);
  };

  const _closeFuncBg = () => {
    setProfileBackgroundModalVisib(false);
  };
  return (
    <View style={{flex: 1}}>
      <ProfileUrlModal visible={profileIconModalVisib} closeFunc={_closeFunc} />
      <ProfileBackgroundModal
        visible={profileBackgroundModalVisib}
        closeFunc={_closeFuncBg}
      />
      <View style={{width: '100%', height: 150, marginTop: 20}}>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <EditProfileAvatar size={85} />
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{color: '#178bd8', fontSize: 15, marginBottom: 10}}
            onPress={() => setProfileIconModalVisib(true)}>
            Profil Fotoğrafını Değiştir
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: '#178bd8',
          fontSize: 15,
          marginBottom: 10,
          textAlign: 'center',
        }}
        onPress={() => setProfileBackgroundModalVisib(true)}>
        Arkaplan Fotoğrafını Değiştir
      </Text>
      <View style={{width: '100%', height: 60, marginTop: 15}}>
        <Input
          placeholder="Biyografin"
          multiline={true}
          numberOfLines={2}
          containerStyle={{width: '85%', alignSelf: 'center', height: 60}}
          inputStyle={{fontSize: 14}}
          onChangeText={val => setBio(val)}
        />
        {renderView()}
      </View>
      <View
        style={{
          width: '100%',
          height: 60,

          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: '80%',
            width: '45%',
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#178bd8',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPress={() => _onPress()}>
          <Text style={{color: '#178bd8', fontSize: 22}}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditScreen;
