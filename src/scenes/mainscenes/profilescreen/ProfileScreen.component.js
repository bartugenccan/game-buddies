import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Styling Imports
import Spinner from '../../../components/Spinner/Spinner.component';
import style from './ProfileScreen.component.style';
import {ListItem, Avatar, Icon, Button} from 'react-native-elements';

// React-Navigation Import
import {useNavigation} from '@react-navigation/native';

// Action Import
import {
  profile_screen_stats_set,
  profile_screen_league_set,
} from '../../../actions';

// Datas Import
import ApexData from '../../../utils/datas/ApexLeaguesData';
import ValorantData from '../../../utils/datas/ValorantDatas/ValorantLeaguesData';

// Redux Import
import {connect, useDispatch} from 'react-redux';

// Util Import
import * as selector from '../../../utils/LeagueImageSelectors';

// Key Extractor for Games Flatlist
const keyExtractor = (item, index) => index.toString();

// Item component for League Select Flatlist
const Item = ({item, onPress, borderWidth}) => (
  <TouchableOpacity
    style={[style.item, borderWidth]}
    onPress={onPress}
    activeOpacity={0.7}>
    <Image source={item.image} style={{width: 60, height: 60}} />
  </TouchableOpacity>
);

const ProfileScreen = props => {
  // Navigation
  const navigation = useNavigation();

  // Dispatch
  const dispatch = useDispatch();

  // Initial States
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [game, setGame] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    const games = [];
    const fetchProfile = async () => {
      await firestore()
        .collection('users')
        .where('UserEmail', '==', auth().currentUser.email)
        .get()
        .then(resp => {
          resp.forEach(doc => {
            setUsername(doc.data().UserName);
            setBio(doc.data().bio);

            if (doc.data().LolAccount != null) {
              let source = selector.lolLeagueImageSelector(
                doc.data().LolAccount['SoloQueueRanked'],
              );
              games.push({
                name: 'League Of Legends',
                avatar_url: require('../../../assets/images/League_of_Legends_icon.png'),
                league: source,
                subtitle: doc.data().LolAccount['Nickname'],
              });
            }
            if (doc.data().ValorantAccount != null) {
              let source = selector.valorantImageSelector(
                doc.data().ValorantAccount['League'],
              );

              games.push({
                name: 'Valorant',
                avatar_url: require('../../../assets/images/Valorant_icon.png'),
                league: source,
                subtitle: doc.data().ValorantAccount['Nickname'],
              });
            }
            if (doc.data().ApexAccount != null) {
              let source = selector.apexImageSelector(
                doc.data().ApexAccount['League'],
              );
              games.push({
                name: 'Apex Legends',
                avatar_url: require('../../../assets/images/Apex_Legends_icon.png'),
                league: source,
                subtitle: doc.data().ApexAccount['Nickname'],
              });
            }
          });

          dispatch(profile_screen_stats_set(games));
        });
    };

    setLoading(true);
    fetchProfile().then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  // OnPress event for select league
  const _onPress = gameName => {
    setGame(gameName);
    setModalVisible(true);
  };

  // Flatlist renderItem function for biggest Games View
  const renderItem = ({item}) => {
    return (
      <ListItem containerStyle={{backgroundColor: '#fff'}}>
        <Avatar source={item.avatar_url} rounded size={40} />
        <ListItem.Content>
          <ListItem.Title style={{fontFamily: 'Roboto-Medium'}}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Title>
          {item.league == false ? (
            <Icon
              name="edit"
              type="font-awesome"
              size={35}
              onPress={() => _onPress(item.name)}
            />
          ) : (
            <Avatar size={38} source={item.league} />
          )}
        </ListItem.Title>
      </ListItem>
    );
  };

  // Flatlist renderLeagueItem function for league select view
  const renderLeagueItem = ({item}) => {
    const borderWidth = item.id === selectedID ? 5 : 0;

    return (
      <Item
        item={item}
        onPress={() => {
          if (selectedID == item.id) {
            setSelectedID(null);
          } else if (selectedID != item.id) {
            setSelectedID(item.id);
          }
        }}
        borderWidth={{borderWidth}}
      />
    );
  };

  // Conditional rendering for Edit Modal
  const renderChoice = c => {
    if (c == 'Apex Legends') {
      return (
        <View
          style={{
            height: 250,
            width: 350,
            backgroundColor: '#ffffff',
            borderRadius: 30,
            overflow: 'hidden',
          }}>
          <View style={{flex: 1}}>
            <View style={style.apexTextView}>
              <Text style={{fontFamily: 'Roboto-Medium', fontSize: 20}}>
                Apex Legends Liginizi Seçin
              </Text>
            </View>
            <View style={style.apexLeagueView}>
              <FlatList
                horizontal={true}
                keyExtractor={item => item.id}
                data={ApexData}
                renderItem={renderLeagueItem}
                showsHorizontalScrollIndicator={false}
                extraData={selectedID}
              />
            </View>
            <View style={style.apexButtonView}>
              <Icon
                name="times-circle"
                type="font-awesome"
                size={60}
                color="red"
                containerStyle={{paddingBottom: 0, alignSelf: 'center'}}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedID(null);
                }}
              />
              <View style={{alignSelf: 'center', backgroundColor: 'red'}}>
                <Button
                  icon={
                    <Icon
                      name="check-circle"
                      size={30}
                      color="white"
                      type="font-awesome"
                    />
                  }
                  iconContainerStyle={{backgroundColor: 'blue'}}
                  buttonStyle={{
                    backgroundColor: 'green',
                    width: 150,
                    height: 50,
                    justifyContent: 'space-around',
                  }}
                  titleStyle={{fontSize: 20}}
                  title="Kaydet"
                  onPress={() => {
                    ApexData.forEach(elem => {
                      if (elem.id === selectedID) {
                        console.log(elem.name);
                        dispatch(
                          profile_screen_league_set('Apex Legends', elem.name),
                        );
                      }
                      setModalVisible(false);
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      );
    } else if (c == 'Valorant') {
      return (
        <View
          style={{
            height: 250,
            width: 350,
            backgroundColor: '#ffffff',
            borderRadius: 30,
            overflow: 'hidden',
          }}>
          <View style={{flex: 1}}>
            <View style={style.apexTextView}>
              <Text style={{fontFamily: 'Roboto-Medium', fontSize: 20}}>
                Valorant Liginizi Seçin
              </Text>
            </View>
            <View style={style.apexLeagueView}>
              <FlatList
                horizontal={true}
                keyExtractor={item => item.id}
                data={ValorantData}
                renderItem={renderLeagueItem}
                showsHorizontalScrollIndicator={false}
                extraData={selectedID}
              />
            </View>
            <View style={style.apexButtonView}>
              <Icon
                name="times-circle"
                type="font-awesome"
                size={60}
                color="red"
                containerStyle={{paddingBottom: 0, alignSelf: 'center'}}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedID(null);
                }}
              />
              <View style={{alignSelf: 'center', backgroundColor: 'red'}}>
                <Button
                  icon={
                    <Icon
                      name="check-circle"
                      size={30}
                      color="white"
                      type="font-awesome"
                    />
                  }
                  iconContainerStyle={{backgroundColor: 'blue'}}
                  buttonStyle={{
                    backgroundColor: 'green',
                    width: 150,
                    height: 50,
                    justifyContent: 'space-around',
                  }}
                  titleStyle={{fontSize: 20}}
                  title="Kaydet"
                  onPress={() => {
                    ValorantData.forEach(elem => {
                      if (elem.id === selectedID) {
                        console.log(elem.name);
                        dispatch(
                          profile_screen_league_set('Valorant', elem.name),
                        );
                      }

                      setSelectedID(null);
                      setModalVisible(false);
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
      }}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: 100,
              width: 200,
              backgroundColor: '#892cdc',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Spinner color={'yellow'} size={100}></Spinner>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          {renderChoice(game)}
        </View>
      </Modal>
      <View style={style.headerContainer}>
        <View style={style.coverContainer}>
          <ImageBackground
            source={{
              uri:
                'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Diana_0.jpg',
            }}
            style={style.coverImage}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginRight: 15, marginTop: 10}}>
              <Icon
                type="font-awesome"
                name="gear"
                color="#fff"
                size={25}
                onPress={() => navigation.navigate('ProfileEdit')}
              />
            </TouchableOpacity>
            <View style={style.coverTitleContainer}>
              <Text style={style.coverTitle} />
            </View>
            <View style={style.coverMetaContainer}>
              <Text style={style.coverName}>{username}</Text>
              <Text style={style.coverBio}>
                {bio == ''
                  ? 'Profilinizi ayarlamak için ekranin sağ üstündeki ikona basabilirsin'
                  : bio}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={style.profileImageContainer}>
          <Image
            source={{
              uri:
                'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
            }}
            style={style.profileImage}
          />
        </View>
        <View style={style.tabContainer}>
          <View style={{flex: 0.36}}></View>
          <View style={style.gamesView}>
            <TouchableOpacity style={style.gamesContainer} activeOpacity={1}>
              <Text>{props.profile_games_arr.length} Games</Text>
            </TouchableOpacity>
          </View>
          <View style={style.messageView}>
            <TouchableOpacity style={style.messageContainer} activeOpacity={1}>
              <Icon
                name="envelope"
                type="font-awesome"
                color="white"
                size={25}
                onPress={() => props.navigation.navigate('Messages')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 20,
          fontSize: 20,
          fontFamily: 'Roboto-Bold',
        }}>
        Oyunlar
      </Text>
      <View style={{backgroundColor: '#fff'}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={props.profile_games_arr}
          renderItem={renderItem}
          contentContainerStyle={{backgroundColor: 'red'}}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 100,
        }}></View>
    </View>
  );
};

const mapStateToProps = ({ProfileScreenResponse}) => {
  const {profile_games_arr} = ProfileScreenResponse;

  return {
    profile_games_arr,
  };
};

export default connect(mapStateToProps, {
  profile_screen_stats_set,
  profile_screen_league_set,
})(ProfileScreen);
