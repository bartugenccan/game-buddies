import React, {useState} from 'react';
import {View, Text, Linking, Modal} from 'react-native';
import style from './ProfileEditPage.component.style';
import {Avatar, Icon, ListItem} from 'react-native-elements';
import Shimmer from 'react-native-shimmer';

// React-navigation Import
import {useNavigation} from '@react-navigation/native';

// Firebase Import
import auth from '@react-native-firebase/auth';
import VerifEmailModal from '../../../components/VerifEmailModal/VerifyEmailModal.component';

// Toast Import
import Toast from 'react-native-simple-toast';

const keyExtractor = (item, index) => index.toString();

const ProfileEditPage = () => {
  const navigation = useNavigation();

  // Modal Visibility State
  const [verfiyModal, setVerfiyModal] = useState(false);

  // Data For Render
  const list = [
    {
      title: 'Profilimi Düzenle',
      icon: 'user',
      onPress: () => navigation.navigate('Edit'),
    },
    {
      title: 'E-Postamı Doğrula',
      icon: 'envelope',
      onPress: () => setVerfiyModal(true),
    },
    {
      title: "Google Play Store'da Bizi Oyla",
      icon: 'file',
      onPress: () =>
        Linking.openURL(
          'https://play.google.com/store/movies/details/Recep_%C4%B0vedik_6?id=sUNUwp_aas4.P',
        ),
    },
    {
      title: 'Arkadaşlarını davet et!',
      icon: 'mail-bulk',
      onPress: () => {
        console.log('Beratto');
      },
    },
    {
      title: 'Kullanıcı Sözleşmemiz',
      icon: 'file',
      onPress: console.log(),
    },
    {
      title: 'Gizlilik Sözleşmemiz',
      icon: 'file',
      onPress: console.log(),
    },
    {
      title: 'Çıkış yap',
      icon: 'sign-out-alt',
      onPress: () => auth().signOut(),
    },
  ];

  return (
    <View style={style.container}>
      <VerifEmailModal
        visible={verfiyModal}
        onPressOut={() => setVerfiyModal(false)}
        onSendPress={() => {
          auth()
            .currentUser.sendEmailVerification()
            .then(() => {
              setVerfiyModal(false);
              Toast.show(
                'Email kayıtlı olduğunuz e-posta adresine gönderildi.',
                Toast.SHORT,
                ['UIAlertController'],
              );
            });
        }}
      />
      <View style={style.firstView}>
        <View style={style.logoView}>
          <Avatar
            source={{
              uri:
                'https://image.freepik.com/free-vector/console-ninja-gaming-logo-design_100735-52.jpg',
            }}
            size={90}
            rounded
            containerStyle={{marginLeft: 20}}
          />
        </View>
        <View style={style.appNameView}>
          <Shimmer>
            <Text
              style={{
                fontFamily: 'Valorant Font',
                fontSize: 30,
                marginRight: 20,
              }}>
              GameBuddies
            </Text>
          </Shimmer>
        </View>
      </View>
      <View style={style.secondView}>
        {list.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={item.onPress}>
            <Icon name={item.icon} type="font-awesome-5" style={{width: 30}} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text
          style={style.bottomTextStyle}
          onPress={() => Linking.openURL('https://reactnativeelements.com/')}>
          www.gamebuddiesapp.gg
        </Text>
      </View>
    </View>
  );
};

export default ProfileEditPage;
