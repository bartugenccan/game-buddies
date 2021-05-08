import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';
import {useNavigation} from '@react-navigation/native';

import style from './Item.component.style';

const laneImageSelector = i => {
  switch (i) {
    case 'Orta':
      return require('../../assets/images/LOLRoles/Position_Gold-Mid.png');
    case 'Üst':
      return require('../../assets/images/LOLRoles/Position_Gold-Top.png');
    case 'Ormancı':
      return require('../../assets/images/LOLRoles/Position_Gold-Jungle.png');
    case 'Nişancı':
      return require('../../assets/images/LOLRoles/Position_Gold-Bot.png');
    case 'Destek':
      return require('../../assets/images/LOLRoles/Position_Gold-Support.png');
    default:
      return false;
  }
};

const ItemOfList = ({
  uid,
  username,
  avatar_url,
  league,
  tier,
  playingLane,
  wantsLane,
  navigation,
  ago,
  voice_chat,
  currentUsername,
  currentUserIcon,
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
          size={75}
        />
      </View>
      <View style={style.statsView}>
        <View style={style.usernameView}>
          <View style={{flex: 0.5, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={style.usernameTextStyle}>{username}</Text>
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
          <View style={style.smallestStatsView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Avatar
                source={league}
                rounded
                size={30}
                containerStyle={{marginRight: 5}}
              />
              <Text style={{fontSize: 20, fontFamily: 'segoe-ui-light-2'}}>
                {tier}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.smallStatsView}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              {wantsLane.length == 1 ? (
                <View style={style.wantsLane}>
                  <Text style={{fontSize: 15, marginBottom: 5}}>Aradığı:</Text>
                  <Avatar
                    source={laneImageSelector(wantsLane[0])}
                    rounded
                    size={20}
                    containerStyle={{marginBottom: 5, marginLeft: 5}}
                  />
                </View>
              ) : (
                <View style={style.wantsLane}>
                  <Text style={{fontSize: 15, marginBottom: 5}}>Aradığı:</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Avatar
                      source={laneImageSelector(wantsLane[0])}
                      rounded
                      size={20}
                      containerStyle={{marginBottom: 5}}
                    />
                    <Avatar
                      source={laneImageSelector(wantsLane[1])}
                      rounded
                      size={20}
                      containerStyle={{marginBottom: 5}}
                    />
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginRight: 5,
              }}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 0.8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 7,
                    justifyContent: 'flex-start',
                  }}>
                  {playingLane.length == 1 ? (
                    <View style={style.playingLane}>
                      <Text style={style.roleText}>Oynadığı:</Text>
                      <Avatar
                        source={laneImageSelector(playingLane[0])}
                        rounded
                        size={20}
                      />
                    </View>
                  ) : (
                    <View style={style.playingLane}>
                      <Text style={style.roleText}>Oynadığı:</Text>
                      <Avatar
                        source={laneImageSelector(playingLane[0])}
                        rounded
                        size={20}
                      />
                      <Avatar
                        source={laneImageSelector(playingLane[1])}
                        rounded
                        size={20}
                      />
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flex: 0.3,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: 'gray', fontSize: 11, marginLeft: 25}}>
                    {ago}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

export default ItemOfList;
