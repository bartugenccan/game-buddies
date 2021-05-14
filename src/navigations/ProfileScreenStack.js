import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../scenes/mainscenes/profilescreen/ProfileScreen.component';
import ProfileEditPage from '../scenes/mainscenes/profileeditpage/ProfileEditPage.component';

const Stack = createStackNavigator();

function ProfileScreenStack() {
  return (
    <Stack.Navigator initialRouteName={'ProfileScreen'}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditPage}
        options={{
          headerShown: true,
          cardStyle: {backgroundColor: '#ffffff'},
          title: 'Ayarlar',
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default ProfileScreenStack;
