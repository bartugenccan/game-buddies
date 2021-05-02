import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, FlatList} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import style from './TinderCard.component.style';
import * as selector from '../../utils/LeagueImageSelectors';

const keyExtractor = (item, index) => index.toString();

const renderItem = ({item}) => {
  return (
    <ListItem containerStyle={{backgroundColor: '#fff'}}>
      <Avatar source={item.avatar_url} rounded size={35} />
      <ListItem.Content>
        <ListItem.Title style={{fontFamily: 'Roboto-Medium'}}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Title>
        {item.league == false ? null : (
          <Avatar size={38} source={item.league} />
        )}
      </ListItem.Title>
    </ListItem>
  );
};

const reviewRenderItem = ({item}) => {
  return <ListItem containerStyle={style.reviewContainer}></ListItem>;
};

const TinderCard = ({data}) => {
  const [gamesList, setGamesList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    setGamesList([
      {
        name: 'League Of Legends',
        avatar_url: require('../../assets/images/League_of_Legends_icon.png'),
        league: false,
        subtitle: 'BerattoBB',
      },
      {
        name: 'Valorant',
        avatar_url: require('../../assets/images/Valorant_icon.png'),
        league: require('../../assets/images/ValorantRanksAssets/Valorant_Bronze1.png'),
        subtitle: 'iksBe',
      },
    ]);

    setReviewList([{}]);
  }, []);

  return (
    <View style={[style.card, {backgroundColor: '#ffffff'}]}>
      <ImageBackground
        style={style.headerView}
        source={{uri: data.backgroundUrl}}>
        <Avatar source={{uri: data.profileIconUrl}} rounded size={100} />
        <Text style={style.usernameStyle}>{data.username}</Text>
      </ImageBackground>
      <View style={style.gamesLine}>
        <Text style={style.gameTextStyle}>Oyunlar</Text>
      </View>
      <View style={{backgroundColor: '#fff'}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={gamesList}
          renderItem={renderItem}
          contentContainerStyle={{backgroundColor: '#fff'}}
        />
      </View>
      <View style={style.reviewLine}>
        <Text style={style.gameTextStyle}>Kullanıcının Yorumları</Text>
      </View>
      <View style={{backgroundColor: '#fff'}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={reviewList}
          renderItem={reviewRenderItem}
        />
      </View>
    </View>
  );
};

export default TinderCard;
