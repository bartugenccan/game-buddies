import React from 'react';

// React-Navigation Imports
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePageNavigation from '../navigations/HomePageNavigation';
import ProfileScreen from '../scenes/mainscenes/profilescreen/ProfileScreen.component';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = [
      'LolDuoFinder',
      'Chats',
      'ApexDuoFinder',
      'ValorantDuoFinder',
      'ChatScreenInDuoFinder',
    ];
    if (hideOnScreens.indexOf(routeName) > -1) {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: '#892cdc',
        },
        showLabel: false,
        style: {
          height: 60,
        },
        keyboardHidesTabBar: true,
      }}
      initialRouteName={'Home'}>
      <Tab.Screen
        name="Messages"
        component={ChatStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: () => (
            <Icon name="comment" type="font-awesome" color="white" size={30} />
          ),
        })}></Tab.Screen>

      <Tab.Screen
        name="Home"
        component={HomePageNavigation}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: () => (
            <Icon name="gamepad" type="font-awesome" color="white" size={35} />
          ),
        })}></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="user" type="font-awesome" color="white" size={30} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};
export default MainNavigation;
