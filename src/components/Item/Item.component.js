import React from 'react';
import {Text, View, Image} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';

import style from './Item.component.style';

/*
<Text style={{fontSize: 15, marginBottom: 5}}>Aradığı Rol :</Text>
            <Image
              source={require('../../assets/images/LOLRoles/Position_Gold-Bot.png')}
              style={{height: 20, width: 20, marginBottom: 5}}
            />
*/

/*
<Text style={style.roleText}>Oynadığı Rol :</Text>
                <Image
                  source={require('../../assets/images/LOLRoles/Position_Gold-Support.png')}
                  style={{height: 20, width: 20}}
                />
*/
const laneImageSelector = i => {
  switch (l) {
    case 'Mid':
      return null;

    default:
      break;
  }
};

const ItemOfList = ({
  avatar_url,
  username,
  league,
  ago,
  tier,
  playingLane,
  wantsLane,
  voice_chat,
}) => (
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
            }} /* Aradığı rol*/
          ></View>
          <View
            style={{
              flex: 0.5,
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 0.8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 7,
                }} /* Oynadığım rol*/
              ></View>
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
);

export default ItemOfList;
