import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

import style from './LolLeagueFlatListItem.component.style';

const LolLeagueFlatListItem = ({label, backgroundColor, color}) => (
  <View style={[style.container, backgroundColor]}>
    <Text style={[style.textStyle, color]}>{label}</Text>
  </View>
);

export default LolLeagueFlatListItem;
