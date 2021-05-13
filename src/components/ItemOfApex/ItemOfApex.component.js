import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import {Avatar, Icon} from 'react-native-elements';

import style from './ItemOfApex.component.style';

// Devam edicek
const favChampSelector = c => {
  switch (c) {
    case 14:
      return require('../../assets/images/ApexChamps/Bangalore_Icon.png');
    case 15:
      return require('../../assets/images/ApexChamps/Bloodhound_Icon.png');
    case 16:
      return require('../../assets/images/ApexChamps/Caustic_Icon.png');
    case 17:
      return require('../../assets/images/ApexChamps/Crypto_Icon.png');
    case 18:
      return require('../../assets/images/ApexChamps/Gibraltar_Icon.png');
    case 19:
      return require('../../assets/images/ApexChamps/Horizon_symbol.png');
    case 20:
      return require('../../assets/images/ApexChamps/Lifeline_Icon.png');
    case 21:
      return require('../../assets/images/ApexChamps/Loba_Icon.png');
    case 22:
      return require('../../assets/images/ApexChamps/Mirage_Icon.png');
    case 23:
      return require('../../assets/images/ApexChamps/Octane_Icon.png');
  }
};

const ItemOfApex = ({
  uid,
  username,
  avatar_url,
  league,
  navigation,
  ago,
  voice_chat,
  currentUsername,
  currentUserIcon,
  token,
  favChamp,
}) => (
  <TouchableOpacity
    style={{
      flex: 1,
      flexDirection: 'row',
      overflow: 'hidden',
      alignSelf: 'center',
    }}
    onPress={() =>
      navigation.navigate('ChatScreenInDuoFinder', {
        uid: uid,
        avatar_url: avatar_url,
        nickname: username,
        currentUsername: currentUsername,
        currentUserIcon: currentUserIcon,
        receiverToken: token,
      })
    }
    activeOpacity={1}>
    <Card style={style.container}>
      <View style={style.avatarView}>
        <Avatar
          source={{
            uri: avatar_url,
          }}
          rounded
          size={70}
        />
      </View>
      <View style={style.statsView}>
        <View style={{flex: 0.45, flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'segoe-ui-light-2',
                marginLeft: 15,
              }}>
              {username}
            </Text>
            {voice_chat == true ? (
              <Icon
                name="microphone"
                type="font-awesome"
                size={17}
                style={{marginLeft: 5}}
              />
            ) : (
              <Icon
                name="microphone-slash"
                type="font-awesome"
                size={17}
                style={{marginLeft: 5}}
              />
            )}
          </View>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Avatar
                source={league}
                rounded
                size={50}
                containerStyle={{marginRight: 10, marginTop: 25}}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.45,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'segoe-ui-light-2',
              paddingLeft: 15,
              height: 25,
            }}>
            Favori Karakteri:
          </Text>
          <Avatar
            source={favChampSelector(favChamp)}
            rounded
            size={30}
            containerStyle={{marginLeft: 5}}
          />
          <View style={{marginLeft: 15, marginTop: 25}}>
            <Text style={{color: 'gray', fontSize: 11}}>{ago}</Text>
          </View>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

export default ItemOfApex;
