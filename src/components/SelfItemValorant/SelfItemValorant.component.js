import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import {Avatar, Icon} from 'react-native-elements';

import style from './SelfItemValorant.component.style';

const champImageSelector = c => {
  switch (c) {
    case 'Astra':
      return 'https://titles.trackercdn.com/valorant-api/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png';
    case 'Breach':
      return 'https://titles.trackercdn.com/valorant-api/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png';
    case 'Brimstone':
      return 'https://titles.trackercdn.com/valorant-api/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png';
    case 'Cypher':
      return 'https://titles.trackercdn.com/valorant-api/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png';
    case 'Jett':
      return 'https://titles.trackercdn.com/valorant-api/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png';
    case 'Killjoy':
      return 'https://titles.trackercdn.com/valorant-api/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png';
    case 'Omen':
      return 'https://titles.trackercdn.com/valorant-api/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png';
    case 'Phoenix':
      return 'https://titles.trackercdn.com/valorant-api/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png';
    case 'Raze':
      return 'https://titles.trackercdn.com/valorant-api/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png';
    case 'Reyna':
      return 'https://titles.trackercdn.com/valorant-api/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png';
    case 'Sage':
      return 'https://titles.trackercdn.com/valorant-api/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png';
    case 'Skye':
      return 'https://titles.trackercdn.com/valorant-api/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png';
    case 'Sova':
      return 'https://titles.trackercdn.com/valorant-api/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png';
    case 'Viper':
      return 'https://titles.trackercdn.com/valorant-api/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png';
    case 'Yoru':
      return 'https://titles.trackercdn.com/valorant-api/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png';
  }
};

const renderChamps = arr => {
  if (arr.length == 1) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Avatar
          rounded
          size={30}
          source={{
            uri: champImageSelector(arr[0]),
          }}
          containerStyle={{marginLeft: 10}}
        />
      </View>
    );
  } else if (arr.length == 2) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Avatar
          rounded
          size={30}
          source={{
            uri: champImageSelector(arr[0]),
          }}
          containerStyle={{marginLeft: 10}}
        />
        <Avatar
          rounded
          size={30}
          source={{
            uri: champImageSelector(arr[1]),
          }}
          containerStyle={{marginLeft: 11}}
        />
      </View>
    );
  }
};

const SelfItemValorant = ({
  avatar_url,
  username,
  league,
  tier,
  ago,
  uid,
  voice_chat,
}) => (
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
      <View style={{flex: 0.42, flexDirection: 'row'}}>
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
            }}>
            {username}
          </Text>
          {voice_chat == true ? (
            <Icon
              name="microphone"
              type="font-awesome"
              size={15}
              style={{marginLeft: 5}}
              containerStyle={{
                height: 23,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          ) : (
            <Icon
              name="microphone-slash"
              type="font-awesome"
              size={17}
              style={{marginLeft: 5}}
              containerStyle={{
                height: 23,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 3,
              }}
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
              size={27}
              containerStyle={{marginRight: 5}}
            />
            <Text style={{fontSize: 20, fontFamily: 'segoe-ui-light-2'}}>
              {tier}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.43,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 15,
            marginLeft: 0,
            height: 25,
          }}>
          Favori Ajanları :
        </Text>
        {renderChamps(['Raze', 'Omen'])}
      </View>
      <View style={{flex: 0.15, alignItems: 'flex-end'}}>
        <Text
          style={{
            marginRight: 25,
            fontSize: 11,
            color: 'gray',
          }}>
          {ago}
        </Text>
      </View>
    </View>
  </Card>
);

export default SelfItemValorant;
