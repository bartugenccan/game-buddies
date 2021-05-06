import React from 'react';
import {Text, View, Image} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';

import style from './Item.component.style';

const ItemOfList = ({avatar_url, username, subtitle, league}) => (
  <Card style={style.container}>
    <View style={style.avatarView}>
      <Avatar
        source={{
          uri:
            'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/7b/ThreshSquare.png/revision/latest/scale-to-width-down/120?cb=20170802153635',
        }}
        rounded
        size={75}
      />
    </View>
    <View style={style.statsView}>
      <View style={style.usernameView}>
        <View style={{flex: 0.5, alignItems: 'center', flexDirection: 'row'}}>
          <Text style={style.usernameTextStyle}>{username}</Text>
          <Icon
            name="microphone-slash"
            type="font-awesome"
            size={17}
            style={{marginLeft: 5}}
          />
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
              IV
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
            <Text style={{fontSize: 15, marginBottom: 5}}>Aradığı Rol :</Text>
            <Image
              source={require('../../assets/images/LOLRoles/Position_Gold-Bot.png')}
              style={{height: 20, width: 20, marginBottom: 5}}
            />
          </View>
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
                }}>
                <Text style={style.roleText}>Oynadığı Rol :</Text>
                <Image
                  source={require('../../assets/images/LOLRoles/Position_Gold-Support.png')}
                  style={{height: 20, width: 20}}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text style={{color: 'gray', fontSize: 11, marginLeft: 25}}>
                  15dk önce
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
