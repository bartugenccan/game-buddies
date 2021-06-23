// React Imports
import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

// Style Imports
import style from './ListModalMobileScreen.component.style';
import {ListItem, Avatar} from 'react-native-elements';

// Example Data For Mobile Platform
const list = [
  {
    name: 'PUBG Mobile',
    avatar_url: require('../../../assets/images/PUBG_Mobile_icon.png'),
    subtitle: 'Online',
  },
];

const keyExtractor = (item, index) => index.toString();

// Modal Screen For Mobile Games List

const ListModalMobileScreen = ({navigation, route}) => {
  // Initial State For Modal Visibility
  const [modalVisible, setModalVisible] = useState(true);

  // Cusstom Component For FlatLists Item
  const PlatformList = props => {
    function renderChoice(name, avatar_url, subtitle) {
      if (subtitle != 'Çok yakında.') {
        return (
          <ListItem
            bottomDivider
            containerStyle={{backgroundColor: 'transparent'}}
            onPress={() => {
              navigation.navigate('AddScreen', {type: name});
            }}
            activeOpacity={1}
            underlayColor={'rgba(0,0,0,0.5)'}>
            <Avatar source={avatar_url} rounded size={44} />
            <ListItem.Content>
              <ListItem.Title style={{color: 'white'}}>{name}</ListItem.Title>
              <ListItem.Subtitle style={{color: 'rgba(169,169,169,0.5)'}}>
                {subtitle}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      } else if (subtitle == 'Çok yakında.') {
        return (
          <ListItem
            bottomDivider
            containerStyle={{backgroundColor: 'transparent'}}>
            <Avatar source={avatar_url} rounded size={44} />
            <ListItem.Content>
              <ListItem.Title style={{color: 'white'}}>{name}</ListItem.Title>
              <ListItem.Subtitle style={{color: 'rgba(169,169,169,0.5)'}}>
                {subtitle}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      }
    }
    return (
      <View>{renderChoice(props.name, props.avatar_url, props.subtitle)}</View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          navigation.goBack();
        }}>
        <View style={style.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={style.closeView}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('HomePage');
            }}></TouchableOpacity>
          <View style={style.bigView}>
            <View style={style.textView}>
              <Text style={style.textStyle}>Mobil Platformlar</Text>
            </View>
            <View style={style.lineView}></View>
            <View>
              <FlatList
                keyExtractor={keyExtractor}
                data={list}
                renderItem={({item}) => (
                  <PlatformList
                    avatar_url={item.avatar_url}
                    name={item.name}
                    subtitle={item.subtitle}
                  />
                )}
                contentContainerStyle={{paddingBottom: 100}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListModalMobileScreen;
