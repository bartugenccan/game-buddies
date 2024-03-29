import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MessageScreen from '../scenes/mainscenes/messagesscreen/MessageScreen.component';
import ChatScreen from '../scenes/mainscenes/chatscreen/ChatScreen.component';

import WS from '../utils/services/Websocket';

const Stack = createStackNavigator();

// Chat stack navigatior nested with tab navigator
function ChatStack() {
  return (
    <Stack.Navigator initialRouteName={'Mesajlar'}>
      <Stack.Screen
        name="Mesajlar"
        component={MessageScreen}
        options={{headerShown: true}}></Stack.Screen>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) => ({
          title: route.params.nickname,
        })}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default ChatStack;
