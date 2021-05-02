import React from 'react';

// Modal Screens Import
import ListModalScreenPc from '../scenes/mainscenes/listmodalpcscreen/ListModalScreenPc.component';
import AddScreen from '../scenes/mainscenes/addscreen/AddScreen.component';
import ListModalMobileScreen from '../scenes/mainscenes/listmodalmobilescreen/ListModalMobileScreen.component';

// React-Navigation Import
import {createStackNavigator} from '@react-navigation/stack';

// Creating stack navigator
const ModalStack = createStackNavigator();

function ModalNavigation() {
  return (
    <ModalStack.Navigator
      screenOptions={{headerShown: false}}
      mode="modal"
      initialRouteName={'AddScreen'}>
      <ModalStack.Screen
        name="PCModal"
        component={ListModalScreenPc}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}
      />
      <ModalStack.Screen
        name="MobileModal"
        component={ListModalMobileScreen}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}></ModalStack.Screen>
      <ModalStack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}
      />
    </ModalStack.Navigator>
  );
}

export default ModalNavigation;
