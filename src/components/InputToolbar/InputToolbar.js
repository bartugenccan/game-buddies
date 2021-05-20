import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Image} from 'react-native';

import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Actions,
  Composer,
} from 'react-native-gifted-chat';

export const renderComposer = props => (
  <Composer
    {...props}
    textInputStyle={{
      color: '#222B45',
      backgroundColor: '#fff',
      paddingTop: 8.5,
      paddingHorizontal: 12,
      marginLeft: 0,
    }}
  />
);

export const renderSend = props => {
  return (
    <Send {...props}>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}>
        <Icon
          name="paper-plane"
          type={'font-awesome'}
          size={23}
          iconStyle={{color: '#892cdc', marginRight: 5}}
        />
      </View>
    </Send>
  );
};

export function renderInputToolbar(props) {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: 'white',
        borderTopColor: '#E8E8E8',
        paddingHorizontal: 8,
      }}
      primaryStyle={{alignItems: 'center'}}
    />
  );
}

export function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: 'rgb(123,134,170)',
        },
        left: {
          borderRadius: 20,
        },
      }}
      textStyle={{
        right: {
          fontFamily: 'segoe-ui-light-2',
          color: '#fff',
        },
      }}
      containerToPreviousStyle={{
        right: {borderTopRightRadius: 15},
        left: {borderTopLeftRadius: 15},
      }}
      containerToNextStyle={{
        right: {borderTopRightRadius: 15},
        left: {borderTopLeftRadius: 15},
      }}
      containerStyle={{
        right: {borderTopRightRadius: 15},
        left: {borderTopLeftRadius: 15},
      }}
    />
  );
}
