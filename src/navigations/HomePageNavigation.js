import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Pages Import
import HomePage from '../scenes/mainscenes/homescreen/HomePage.component';
import FriendsScreen from '../scenes/mainscenes/friendsscreen/FriendsScreen.component';

// Modal Navigation Import
import ModalNavigation from './ModalNavigation';

// Style Import
import {Icon} from 'react-native-elements';
import LolDuoFinderScreen from '../scenes/mainscenes/lolduofinderscreen/LolDuoFinderScreen.component';
import ApexDuoFinderScreen from '../scenes/mainscenes/apexduofinder/ApexDuoFinderScreen.component';
import ValorantDuoFinderScreen from '../scenes/mainscenes/valorantduofinder/ValorantDuoFinderScreen.component';
import PUBGMobileDuoFinderScreen from '../scenes/mainscenes/pubgmobileduofinder/PUBGMobileDuoFinderScreen.component';

// Creating stack navigator
const Stack = createStackNavigator();

const HomePageNavigation = props => {
  return (
    <Stack.Navigator
      initialRouteName={'HomePage'}
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: false,
        cardStyleInterpolator: ({current: {progress}}) => ({
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.2],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
      mode="modal">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: true,
          headerTitle: 'Oyunlar',
          headerTitleStyle: {marginLeft: 10, fontFamily: 'Roboto-Medium'},
          headerRight: () => (
            <Icon
              name="users"
              type="font-awesome"
              size={27}
              onPress={() => props.navigation.navigate('Friends')}
            />
          ),
          headerRightContainerStyle: {marginRight: 20},
        }}></Stack.Screen>

      <Stack.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          headerShown: true,
          cardStyle: {backgroundColor: '#ffffff'},
        }}></Stack.Screen>

      <Stack.Screen
        name="Modal"
        component={ModalNavigation}
        options={{headerShown: false}}></Stack.Screen>

      <Stack.Screen
        name="LolDuoFinder"
        component={LolDuoFinderScreen}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}></Stack.Screen>

      <Stack.Screen
        name="ValorantDuoFinder"
        component={ValorantDuoFinderScreen}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}></Stack.Screen>

      <Stack.Screen
        name="ApexDuoFinder"
        component={ApexDuoFinderScreen}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}></Stack.Screen>

      <Stack.Screen
        name="PUBGMobileDuoFinder"
        component={PUBGMobileDuoFinderScreen}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#ffffff'},
        }}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomePageNavigation;
