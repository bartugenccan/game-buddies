import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Linking,
  KeyboardAvoidingView,
  Alert,
  DatePickerAndroid,
} from 'react-native';
import style from './AddScreen.component.style';

import {Input, Button, Avatar, Icon} from 'react-native-elements';

import Spinner from '../../../components/Spinner/Spinner.component';
import DeleteScreen from '../../mainscenes/deletescreen/DeleteScreen.component';

// Firebase Imports
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// API Functions
import {
  checkVerificationCode,
  getID,
  fetchStats,
  getProfileIconId,
} from '../../../utils/RiotApiFunc';

// Redux Imports
import {connect, useDispatch} from 'react-redux';

// Action Imports
import {
  games_set,
  profile_screen_stats_set,
  profile_screen_stats_add,
} from '../../../actions';

// Util Imports
import * as selector from '../../../utils/LeagueImageSelectors';

function BreakSignal() {}
BreakSignal.prototype = new Error();

const AddScreen = ({navigation, route}) => {
  // Common States
  const [addModalVisible, setAddModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // League Of Legends && Valorant && Apex Legends
  const [summonerName, setSummonerName] = useState('BerattoBB'); // ""

  // League Of Legends
  const [code, setCode] = useState('');
  const [canAddLol, setCanAddLol] = useState(true);

  // Valorant
  const [tag, setTag] = useState('TR1');
  const [canAddValorant, setCanAddValorant] = useState(true);

  // Apex
  const [canAddApex, setCanAddApex] = useState(true);

  // Route Params
  const {type} = route.params;

  // PUBG Mobile
  const [canAddPUBGMobile, setCanAddPUBGMobile] = useState(true);

  // Dispath
  const dispatch = useDispatch();

  // Success Callback
  const _success_callback = async () => {
    let id = await getID('BerattoBB'); // summonername == "BerattoBB"
    let stats = await fetchStats('BerattoBB'); // summonername == "BerattoBB"
    let profileIconId = await getProfileIconId('BerattoBB'); // summonername == "BerattoBB"
    let userEmail = auth().currentUser.email;

    const tempDoc = [];

    await firestore()
      .collection('users')
      .get()
      .then(resp => {
        resp.forEach(doc => {
          if (doc.data().LolAccount != null) {
            tempDoc.push(doc.data().LolAccount['Nickname']);
          }
        });
      })
      .then(() => {
        firestore()
          .collection('users')
          .where('UserEmail', '==', userEmail)
          .get()
          .then(resp => {
            resp.forEach(doc => {
              let tempList = doc.data().Games;
              tempList.push({id: '0', gameName: 'League Of Legends'});

              dispatch(games_set(tempList));
              doc.ref.update({
                LolAccount: {
                  FlexRanked: stats[1],
                  Nickname: summonerName,
                  ID: id,
                  SoloQueueRanked: stats[0],
                  iconID: profileIconId,
                },
                Games: tempList,
              });
            });
          })
          .then(() => {
            dispatch(
              profile_screen_stats_add({
                name: 'League Of Legends',
                avatar_url: require('../../../assets/images/League_of_Legends_icon.png'),
                league: selector.lolLeagueImageSelector(stats[0]),
                subtitle: summonerName,
              }),
            );

            setLoading(false);
            navigation.navigate('HomePage');
          });
      })
      .catch(e => {
        if (e instanceof BreakSignal) {
          setLoading(false);
          Alert.alert(
            'Hatalı Giriş',
            'Girmiş olduğun kullanıcı adıyla başka bir hesapla giriş yapılmış.',
          );
        }
      });

    setLoading(false);
  };

  // League Of Legends failed_callback
  const _failed_callback = () => {
    setErrMessage('* Sihirdar adı veya doğrulama kodu hatalı.');
    setSummonerName('');
    setCode('');
    setTag('');
  };

  // Valorant onPress event
  const _onPressValorant = async () => {
    const tempDoc = [];
    const currentUserEmail = auth().currentUser.email;

    await firestore()
      .collection('users')
      .get()
      .then(resp => {
        resp.forEach(doc => {
          if (doc.data().ValorantAccount != null) {
            tempDoc.push(doc.data().ValorantAccount['Nickname']);
          }
        });
      })
      .then(() => {
        if (tempDoc.includes(summonerName + ' #' + tag)) {
          throw new BreakSignal();
        }
      })
      .then(() => {
        firestore()
          .collection('users')
          .where('UserEmail', '==', currentUserEmail)
          .get()
          .then(resp => {
            resp.forEach(doc => {
              let tempList = doc.data().Games;
              tempList.push({id: '1', gameName: 'Valorant'});

              dispatch(games_set(tempList));
              doc.ref.update({
                ValorantAccount: {Nickname: summonerName, League: ''},
                Games: tempList,
              });
            });
          })
          .then(() => {
            dispatch(
              profile_screen_stats_add({
                name: 'Valorant',
                avatar_url: require('../../../assets/images/Valorant_icon.png'),
                league: false,
                subtitle: summonerName,
              }),
            );

            setLoading(false);
            navigation.navigate('HomePage');
          });
      })
      .catch(e => {
        if (e instanceof BreakSignal) {
          setLoading(false);
          Alert.alert(
            'Hatalı Giriş',
            'Girmiş olduğun kullanıcı adıyla başka bir hesapla giriş yapılmış.',
          );
        }
      });

    setLoading(false);
  };

  // Apex Legends onPress event
  const _onPressApex = async () => {
    const tempDoc = [];
    const currentUserEmail = auth().currentUser.email;

    await firestore()
      .collection('users')
      .get()
      .then(resp => {
        resp.forEach(doc => {
          if (doc.data().ApexAccount != null) {
            tempDoc.push(doc.data().ApexAccount['Nickname']);
          }
        });
      })
      .then(() => {
        if (tempDoc.includes(summonerName)) {
          throw new BreakSignal();
        }
      })
      .then(() => {
        firestore()
          .collection('users')
          .where('UserEmail', '==', currentUserEmail)
          .get()
          .then(resp => {
            resp.forEach(doc => {
              let tempList = doc.data().Games;
              tempList.push({id: '2', gameName: 'Apex Legends'});

              dispatch(games_set(tempList));
              doc.ref.update({
                ApexAccount: {Nickname: summonerName, League: ''},
                Games: tempList,
              });
            });
          })
          .then(() => {
            dispatch(
              profile_screen_stats_add({
                name: 'Apex Legends',
                avatar_url: require('../../../assets/images/Apex_Legends_icon.png'),
                league: false,
                subtitle: summonerName,
              }),
            );

            setLoading(false);
            navigation.navigate('HomePage');
          });
      })
      .catch(e => {
        if (e instanceof BreakSignal) {
          setLoading(false);
          Alert.alert(
            'Hatalı Giriş',
            'Girmiş olduğun kullanıcı adıyla başka bir hesapla giriş yapılmış.',
          );
        }
      });

    setLoading(false);
  };

  // PUBG Mobile onPress event
  const _onPressPUBGMobile = async () => {
    const tempDoc = [];
    const currentUserEmail = auth().currentUser.email;

    await firestore()
      .collection('users')
      .get()
      .then(resp => {
        resp.forEach(doc => {
          if (doc.data().PUBGMobileAccount != null) {
            tempDoc.push(doc.data().PUBGMobileAccount['Nickname']);
          }
        });
      })
      .then(() => {
        if (tempDoc.includes(summonerName)) {
          throw new BreakSignal();
        }
      })
      .then(() => {
        firestore()
          .collection('users')
          .where('UserEmail', '==', currentUserEmail)
          .get()
          .then(resp => {
            resp.forEach(doc => {
              let tempList = doc.data().Games;
              tempList.push({id: '3', gameName: 'PUBG Mobile'});

              dispatch(games_set(tempList));
              doc.ref.update({
                PUBGMobileAccount: {Nickname: summonerName, League: ''},
              });
            });
          })
          .then(() => {
            dispatch(
              profile_screen_stats_add({
                name: 'PUBG Mobile',
                avatar_url: require('../../../assets/images/PUBG_Mobile_icon.png'),
                league: false,
                subtitle: summonerName,
              }),
            );
            setLoading(false);
            navigation.navigate('HomePage');
          });
      })
      .catch(e => {
        if (e instanceof BreakSignal) {
          setLoading(false);
          Alert.alert(
            'Hatalı Giriş',
            'Girmiş olduğun kullanıcı adıyla başka bir hesapla giriş yapılmış.',
          );
        }
      });
  };

  // Useeffect function for League of Legends
  const useEffectLeagueOfLegends = async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          if (doc.data().LolAccount != null) {
            setCanAddLol(false);
          } else if (doc.data().LolAccount == null) {
            setCanAddLol(true);
          }
        });
      })
      .then(() => {
        setLoading(false);
      });
  };

  // Useeffect function for Valorant
  const useEffectValorant = async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          if (doc.data().ValorantAccount != null) {
            setCanAddValorant(false);
          } else if (doc.data().ValorantAccount == null) {
            setCanAddValorant(true);
          }
        });
      })
      .then(() => setLoading(false));
  };

  // Useeffect function for Apex Legends
  const useEffectApex = async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          if (doc.data().ApexAccount != null) {
            setCanAddApex(false);
          } else if (doc.data().ApexAccount == null) {
            setCanAddApex(true);
          }
        });
      })
      .then(() => setLoading(false));
  };

  // Useeffect function for PUBG Mobile
  const useEffectPUBGMobile = async () => {
    await firestore()
      .collection('users')
      .where('UserEmail', '==', auth().currentUser.email)
      .get()
      .then(resp => {
        resp.forEach(doc => {
          if (doc.data().PUBGMobileAccount != null) {
            setCanAddPUBGMobile(false);
          } else if (doc.data().PUBGMobileAccount == null) {
            setCanAddPUBGMobile(true);
          }
        });
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);

    if (type == 'League Of Legends') {
      useEffectLeagueOfLegends();
    } else if (type == 'Valorant') {
      useEffectValorant();
    } else if (type == 'Apex Legends') {
      console.log('Ber312313atto');
      useEffectApex();
    } else if (type == 'PUBG Mobile') {
      useEffectPUBGMobile();
    }
  }, []);

  switch (type) {
    case 'League Of Legends':
      if (canAddLol) {
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
              visible={addModalVisible}
              onRequestClose={() => {
                setAddModalVisible(false);
                navigation.navigate('PCModal');
              }}>
              <View style={style.container}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={style.closeView}
                  onPress={() => {
                    console.log(addModalVisible);
                    setAddModalVisible(!addModalVisible);
                    console.log(addModalVisible);
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
                      <Text
                        style={[
                          style.textStyle,
                          {
                            fontFamily:
                              'friz-quadrata-std-medium-5870338ec7ef8',
                          },
                        ]}>
                        League Of Legends
                      </Text>
                    </View>
                  </View>
                  <View style={style.inputView}>
                    <Input
                      placeholder="Kullanıcı Adınız"
                      leftIcon={
                        <Icon
                          name="user"
                          size={24}
                          type={'font-awesome'}
                          color="white"
                        />
                      }
                      inputStyle={{color: 'white'}}
                      onChangeText={val => setSummonerName(val)}
                      containerStyle={{width: '80%'}}
                      value={summonerName}
                    />
                    <Input
                      placeholder="Doğrulama Kodunuz"
                      leftIcon={
                        <Icon
                          name="unlock-alt"
                          size={24}
                          type={'font-awesome'}
                          color="white"
                        />
                      }
                      inputStyle={{color: 'white'}}
                      onChangeText={val => setCode(val)}
                      containerStyle={{width: '80%'}}
                      value={code}
                      errorMessage={errMessage}
                      errorStyle={{color: '#dcedc1'}}
                      autoCorrect={false}
                    />
                  </View>
                  <View style={style.buttonView}>
                    <Button
                      title="Hesabını Bağla"
                      type="outline"
                      raised
                      containerStyle={{backgroundColor: 'white', width: '70%'}}
                      titleStyle={{color: '#892cdc'}}
                      onPress={async () => {
                        try {
                          setLoading(true);
                          checkVerificationCode(
                            'bugraaaaaa',
                            'zaxd31',
                            _success_callback,
                            _failed_callback,
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: 5,
                        textDecorationLine: 'underline',
                      }}
                      onPress={() =>
                        Linking.openURL(
                          'https://stackoverflow.com/questions/43804032/open-url-in-default-web-browser',
                        )
                      }>
                      Yardıma mı ihtiyacın var?
                    </Text>
                  </View>
                  <View></View>
                </KeyboardAvoidingView>
              </View>
            </Modal>
          </View>
        );
      } else if (!canAddLol) {
        return <DeleteScreen gameName={type}></DeleteScreen>;
      }
    case 'Valorant':
      if (canAddValorant) {
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
              visible={addModalVisible}
              onRequestClose={() => {
                setAddModalVisible(false);
                navigation.navigate('PCModal');
              }}>
              <View style={style.container}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={style.closeView}
                  onPress={() => {
                    console.log(addModalVisible);
                    setAddModalVisible(!addModalVisible);
                    console.log(addModalVisible);
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
                        size={70}></Avatar>
                    </View>
                    <View style={{marginTop: 10}}>
                      <Text style={style.textStyleValorant}>{type}</Text>
                    </View>
                  </View>
                  <View style={style.inputViewValorant}>
                    <Input
                      placeholder="Kullanıcı Adınız"
                      leftIcon={
                        <Icon
                          name="user"
                          size={24}
                          type={'font-awesome'}
                          color="white"
                        />
                      }
                      inputStyle={{color: 'white'}}
                      onChangeText={val => setSummonerName(val)}
                      containerStyle={{width: '40%'}}
                      value={summonerName}
                    />
                    <Input
                      placeholder="Tag"
                      leftIcon={
                        <Icon
                          name="tag"
                          size={24}
                          type={'material-icons'}
                          color="white"
                        />
                      }
                      inputStyle={{color: 'white'}}
                      onChangeText={val => setTag(val)}
                      containerStyle={{width: '40%'}}
                      value={tag}
                      errorMessage={errMessage}
                      errorStyle={{color: '#dcedc1'}}
                      autoCorrect={false}
                    />
                  </View>

                  <View style={style.buttonView}>
                    <Button
                      title="Hesabını Bağla"
                      type="outline"
                      raised
                      containerStyle={{
                        backgroundColor: 'white',
                        width: '70%',
                        marginTop: 20,
                      }}
                      titleStyle={{color: '#892cdc'}}
                      onPress={async () => {
                        try {
                          setLoading(true);
                          _onPressValorant();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: 5,
                        textDecorationLine: 'underline',
                      }}
                      onPress={() =>
                        Linking.openURL(
                          'https://stackoverflow.com/questions/43804032/open-url-in-default-web-browser',
                        )
                      }>
                      Yardıma mı ihtiyacın var?
                    </Text>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>
          </View>
        );
      } else if (!canAddValorant) {
        return <DeleteScreen gameName={type}></DeleteScreen>;
      }

    case 'Apex Legends':
      if (canAddApex) {
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
              visible={addModalVisible}
              onRequestClose={() => {
                setAddModalVisible(false);
                navigation.navigate('PCModal');
              }}>
              <View style={style.container}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={style.closeView}
                  onPress={() => {
                    console.log(addModalVisible);
                    setAddModalVisible(!addModalVisible);
                    console.log(addModalVisible);
                    navigation.navigate('PCModal');
                  }}></TouchableOpacity>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  style={style.bigView}>
                  <View style={style.iconView}>
                    <View>
                      <Avatar
                        containerStyle={{backgroundColor: '#6c3427'}}
                        rounded
                        source={require('../../../assets/images/Apex_Legends_icon.png')}
                        size={70}></Avatar>
                    </View>
                    <View style={{marginTop: 10}}>
                      <Text
                        style={[
                          style.textStyleValorant,
                          {fontFamily: 'AgencyFB-Bold'},
                        ]}>
                        {type}
                      </Text>
                    </View>
                  </View>
                  <View style={style.inputViewValorant}>
                    <Input
                      placeholder="Kullanıcı Adınız"
                      leftIcon={
                        <Icon
                          name="user"
                          size={24}
                          type={'font-awesome'}
                          color="white"
                        />
                      }
                      inputStyle={{color: 'white'}}
                      onChangeText={val => setSummonerName(val)}
                      containerStyle={{width: '80%'}}
                      value={summonerName}
                    />
                  </View>
                  <View style={style.buttonView}>
                    <Button
                      title="Hesabını Bağla"
                      type="outline"
                      raised
                      containerStyle={{
                        backgroundColor: 'white',
                        width: '70%',
                        marginTop: 20,
                      }}
                      titleStyle={{color: '#892cdc'}}
                      onPress={async () => {
                        try {
                          setLoading(true);
                          _onPressApex();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: 5,
                        textDecorationLine: 'underline',
                      }}
                      onPress={() =>
                        Linking.openURL(
                          'https://stackoverflow.com/questions/43804032/open-url-in-default-web-browser',
                        )
                      }>
                      Yardıma mı ihtiyacın var?
                    </Text>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>
          </View>
        );
      } else if (!canAddApex) {
        return <DeleteScreen gameName={type}></DeleteScreen>;
      }
    case 'PUBG Mobile':
      if (canAddPUBGMobile) {
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
              visible={addModalVisible}
              onRequestClose={() => {
                setAddModalVisible(false);
                navigation.navigate('PCModal');
              }}>
              <View style={style.container}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={style.closeView}
                  onPress={() => {
                    console.log(addModalVisible);
                    setAddModalVisible(!addModalVisible);
                    console.log(addModalVisible);
                    navigation.navigate('PCModal');
                  }}></TouchableOpacity>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  style={style.bigView}>
                  <View style={style.iconView}>
                    <View>
                      <Avatar
                        containerStyle={{backgroundColor: '#6c3427'}}
                        rounded
                        source={require('../../../assets/images/PUBG_Mobile_icon.png')}
                        size={70}></Avatar>
                    </View>
                    <View style={{marginTop: 10}}>
                      <Text
                        style={[
                          style.textStyleValorant,
                          {fontFamily: 'HeadlinerNo.45 DEMO', fontSize: 40},
                        ]}>
                        {type}
                      </Text>
                    </View>
                  </View>
                  <View style={style.inputViewValorant}>
                    <Input
                      placeholder="Kullanıcı Adınız"
                      leftIcon={
                        <Icon
                          name="user"
                          size={24}
                          type={'font-awesome'}
                          color="white"
                        />
                      }
                      inputStyle={{color: 'white'}}
                      onChangeText={val => setSummonerName(val)}
                      containerStyle={{width: '80%'}}
                      value={summonerName}
                    />
                  </View>
                  <View style={style.buttonView}>
                    <Button
                      title="Hesabını Bağla"
                      type="outline"
                      raised
                      containerStyle={{
                        backgroundColor: 'white',
                        width: '70%',
                        marginTop: 20,
                      }}
                      titleStyle={{color: '#892cdc'}}
                      onPress={async () => {
                        try {
                          setLoading(true);
                          _onPressPUBGMobile();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: 5,
                        textDecorationLine: 'underline',
                      }}
                      onPress={() =>
                        Linking.openURL(
                          'https://stackoverflow.com/questions/43804032/open-url-in-default-web-browser',
                        )
                      }>
                      Yardıma mı ihtiyacın var?
                    </Text>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>
          </View>
        );
      } else if (!canAddPUBGMobile) {
        return <DeleteScreen gameName={type}></DeleteScreen>;
      }
    default:
      return <Text>Error</Text>;
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
  profile_screen_stats_set,
  profile_screen_stats_add,
})(AddScreen);
