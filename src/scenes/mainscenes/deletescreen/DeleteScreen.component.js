import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Button, Image, Avatar, Icon} from 'react-native-elements';
import style from './DeleteScreen.component.style';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Spinner from '../../../components/Spinner/Spinner.component';

import {useNavigation} from '@react-navigation/native';

// Redux Imports
import {connect, useDispatch} from 'react-redux';

import {games_set, profile_screen_stats_delete} from '../../../actions';

const DeleteScreen = props => {
  // Navigation
  const navigation = useNavigation();

  // Dispatch
  const dispatch = useDispatch();

  // Initial States
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(true);
  const [profileName, setProfileName] = useState('');
  const [iconId, setIconId] = useState();

  useEffect(() => {
    // Basic switch-case depending on gameName which is coming from previous screen.
    switch (props.gameName) {
      case 'League Of Legends':
        setLoading(true);
        firestore()
          .collection('users')
          .where('UserEmail', '==', auth().currentUser.email)
          .get()
          .then(resp => {
            resp.forEach(async doc => {
              setProfileName(doc.data().LolAccount['Nickname']);
            });
          })
          .then(() => {
            setLoading(false);
          });
        break;

      case 'Valorant':
        console.log('Valorant');
        setLoading(true);
        firestore()
          .collection('users')
          .where('UserEmail', '==', auth().currentUser.email)
          .get()
          .then(resp => {
            resp.forEach(doc => {
              setProfileName(doc.data().ValorantAccount['Nickname']);
            });
          })
          .then(() => {
            setLoading(false);
          });
        break;

      case 'Apex Legends':
        setLoading(true);
        firestore()
          .collection('users')
          .where('UserEmail', '==', auth().currentUser.email)
          .get()
          .then(resp => {
            resp.forEach(async doc => {
              setProfileName(doc.data().ApexAccount['Nickname']);
            });
          })
          .then(() => {
            setLoading(false);
          });
        break;

      default:
        break;
    }
  }, []);

  // OnPress Function for unlink an game account with application account
  const _onPress = async g => {
    if (g == 'League Of Legends') {
      await firestore()
        .collection('users')
        .where('UserEmail', '==', auth().currentUser.email)
        .get()
        .then(resp => {
          resp.forEach(doc => {
            var tempList = doc.data().Games;

            // For removing Lol object from array func
            for (var i = 0; i < tempList.length; i++) {
              if (tempList[i].gameName == g) {
                tempList.splice(i, 1);
                i--;
              }
            }

            // Deleting Lol from firebase user document and set null to LolAccount refference to null.
            doc.ref.update({Games: tempList, LolAccount: null});

            // For set games_arr
            dispatch(games_set(tempList));
          });
        })
        .then(() => {
          dispatch(profile_screen_stats_delete('League Of Legends'));
        });
    } else if (g == 'Valorant') {
      await firestore()
        .collection('users')
        .where('UserEmail', '==', auth().currentUser.email)
        .get()
        .then(resp => {
          resp.forEach(doc => {
            var tempList = doc.data().Games;

            // Removing Valorant object
            for (var i = 0; i < tempList.length; i++) {
              if (tempList[i].gameName == g) {
                tempList.splice(i, 1);
                i--;
              }
            }

            doc.ref.update({Games: tempList, ValorantAccount: null});
            dispatch(games_set(tempList));
          });
        })
        .then(() => {
          dispatch(profile_screen_stats_delete('Valorant'));
        });
    } else if (g == 'Apex Legends') {
      await firestore()
        .collection('users')
        .where('UserEmail', '==', auth().currentUser.email)
        .get()
        .then(resp => {
          resp.forEach(doc => {
            var tempList = doc.data().Games;
            for (var i = 0; i < tempList.length; i++) {
              if (tempList[i].gameName == g) {
                tempList.splice(i, 1);
                i--;
              }
            }

            doc.ref.update({Games: tempList, ApexAccount: null});
            dispatch(games_set(tempList));
          });
        })
        .then(() => {
          dispatch(profile_screen_stats_delete('Apex Legends'));
        });
    }
  };

  // Basic switch-case for render depending on params
  switch (props.gameName) {
    case 'League Of Legends':
      return (
        <View style={{flex: 1}}>
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
            animationType="slide"
            transparent={true}
            visible={deleteModalVisible}
            onRequestClose={() => {
              setDeleteModalVisible(false);
              navigation.navigate('HomePage');
            }}>
            <View style={style.container}>
              <TouchableOpacity
                activeOpacity={1}
                style={style.closeView}
                onPress={() => {
                  setDeleteModalVisible(!deleteModalVisible);
                  navigation.navigate('PCModal');
                }}></TouchableOpacity>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={style.bigView}>
                <View style={style.iconView}>
                  <View>
                    <Avatar
                      rounded
                      source={require('../../../assets/images/League_of_Legends_icon.png')}
                      size={55}></Avatar>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text style={style.textStyle}>{props.gameName}</Text>
                  </View>
                </View>
                <View style={style.bigTextView}>
                  <View style={style.smallTextView}>
                    <Text style={style.dangerText}>
                      Bu hesaba bağlı bir {props.gameName} hesabı bulduk.
                    </Text>
                  </View>
                  <View style={style.smallIconView}>
                    <View style={style.profileIconView}>
                      <Avatar
                        source={{
                          uri:
                            'https://ddragon.leagueoflegends.com/cdn/11.8.1/img/profileicon/' +
                            iconId +
                            '.png',
                        }}
                        rounded
                        size="large"
                        containerStyle={{marginRight: 10}}
                      />
                    </View>
                    <View style={style.profileNameView}>
                      <View
                        style={{
                          height: '50%',
                          backgroundColor: 'white',
                          width: '90%',
                          borderRadius: 20,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          overflow: 'scroll',
                        }}>
                        <Text numberOfLines={2} style={style.profileNameText}>
                          {profileName}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={style.buttonView}>
                  <Button
                    icon={
                      <Icon
                        name="trash"
                        type="font-awesome"
                        size={35}
                        color="white"
                      />
                    }
                    iconLeft
                    title="Hesaptan çıkış yap."
                    containerStyle={{width: 300}}
                    buttonStyle={{
                      backgroundColor: 'red',
                      justifyContent: 'space-evenly',
                    }}
                    onPress={() => {
                      try {
                        setLoading(true);
                        _onPress(props.gameName).then(() => {
                          setLoading(false);
                          navigation.navigate('HomePage');
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>
      );
    case 'Valorant':
      return (
        <View style={{flex: 1}}>
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
            animationType="slide"
            transparent={true}
            visible={deleteModalVisible}
            onRequestClose={() => {
              setDeleteModalVisible(false);
              navigation.navigate('MobileModal');
            }}>
            <View style={style.container}>
              <TouchableOpacity
                activeOpacity={1}
                style={style.closeView}
                onPress={() => {
                  setDeleteModalVisible(!deleteModalVisible);
                  navigation.navigate('PCModal');
                }}></TouchableOpacity>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={style.bigView}>
                <View style={style.iconView}>
                  <View>
                    <Avatar
                      rounded
                      source={require('../../../assets/images/Valorant_icon.png')}
                      size={55}></Avatar>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text
                      style={[style.textStyle, {fontFamily: 'Valorant Font'}]}>
                      {props.gameName}
                    </Text>
                  </View>
                </View>
                <View style={style.bigTextView}>
                  <View style={style.smallTextView}>
                    <Text style={style.dangerText}>
                      Bu hesaba bağlı bir {props.gameName} hesabı bulduk.
                    </Text>
                  </View>
                  <View style={style.justTextView}>
                    <View style={style.profileNameView}>
                      <View
                        style={{
                          height: '50%',
                          backgroundColor: 'white',
                          width: '90%',
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'scroll',
                        }}>
                        <Text
                          numberOfLines={2}
                          style={[
                            style.profileNameText,
                            {textAlign: 'center', marginLeft: 0},
                          ]}>
                          {profileName}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={style.buttonView}>
                  <Button
                    icon={
                      <Icon
                        name="trash"
                        type="font-awesome"
                        size={35}
                        color="white"
                      />
                    }
                    iconLeft
                    title="Hesaptan çıkış yap."
                    containerStyle={{width: 300, marginBottom: 50}}
                    buttonStyle={{
                      backgroundColor: 'red',
                      justifyContent: 'space-evenly',
                    }}
                    onPress={() => {
                      try {
                        setLoading(true);
                        _onPress(props.gameName).then(() => {
                          setLoading(false);
                          navigation.navigate('HomePage');
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>
      );

    case 'Apex Legends':
      return (
        <View style={{flex: 1}}>
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
            animationType="slide"
            transparent={true}
            visible={deleteModalVisible}
            onRequestClose={() => {
              setDeleteModalVisible(false);
              navigation.navigate('MobileModal');
            }}>
            <View style={style.container}>
              <TouchableOpacity
                activeOpacity={1}
                style={style.closeView}
                onPress={() => {
                  setDeleteModalVisible(!deleteModalVisible);
                  navigation.navigate('PCModal');
                }}></TouchableOpacity>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={style.bigView}>
                <View style={style.iconView}>
                  <View>
                    <Avatar
                      rounded
                      source={require('../../../assets/images/Apex_Legends_icon.png')}
                      size={55}></Avatar>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text style={style.textStyle}>{props.gameName}</Text>
                  </View>
                </View>
                <View style={style.bigTextView}>
                  <View style={style.smallTextView}>
                    <Text style={style.dangerText}>
                      Bu hesaba bağlı bir {props.gameName} hesabı bulduk.
                    </Text>
                  </View>
                  <View style={{flex: 0.65, width: '100%', overflow: 'scroll'}}>
                    <View
                      style={{
                        flex: 0.6,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: '70%',
                          backgroundColor: 'white',
                          width: '90%',
                          borderRadius: 20,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          overflow: 'scroll',
                        }}>
                        <Text numberOfLines={2} style={style.profileNameText}>
                          {profileName}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={style.buttonView}>
                  <Button
                    icon={
                      <Icon
                        name="trash"
                        type="font-awesome"
                        size={35}
                        color="white"
                      />
                    }
                    iconLeft
                    title="Hesaptan çıkış yap."
                    containerStyle={{width: 300}}
                    buttonStyle={{
                      backgroundColor: 'red',
                      justifyContent: 'space-evenly',
                    }}
                    onPress={() => {
                      try {
                        setLoading(true);
                        _onPress(props.gameName).then(() => {
                          setLoading(false);
                          navigation.navigate('HomePage');
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>
      );

    default:
      return <Text>ERROR</Text>;
  }
};

const mapStateToProps = ({HomeScreenResponse}) => {
  const {games_arr} = HomeScreenResponse;

  return {
    games_arr,
  };
};

export default connect(mapStateToProps, {
  games_set,
  profile_screen_stats_delete,
})(DeleteScreen);
