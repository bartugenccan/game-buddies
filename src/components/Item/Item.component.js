import React from 'react';
import {Text, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';

import style from './Item.component.style';

const ItemOfList = ({avatar_url, username, subtitle, league}) => (
  <Card style={style.container}>
    <View style={style.avatarView}>
      <Avatar source={{uri: avatar_url}} rounded size={75} />
    </View>
    <View style={style.statsView}>
      <View style={style.usernameView}>
        <View style={{flex: 0.5, alignItems: 'center'}}>
          <Text style={style.usernameTextStyle}>{username}</Text>
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
              II
            </Text>
          </View>
        </View>
      </View>
      <View style={style.smallStatsView}></View>
    </View>
  </Card>
);

export default ItemOfList;
