import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

import style from './LolLaneImageFlatlistItem.component.style';
const LolLaneImageFlatlistItem = ({img, backgroundColor}) => (
  <View style={[style.itemView, backgroundColor]}>
    <Avatar source={img} size={30} rounded />
  </View>
);

export default LolLaneImageFlatlistItem;
