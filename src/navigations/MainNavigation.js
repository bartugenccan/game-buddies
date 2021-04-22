import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePageNavigation from '../navigations/HomePageNavigation';
import ProfileScreen from '../scenes/mainscenes/profilescreen/ProfileScreen.component';
import MesssageScreen from '../scenes/mainscenes/messagesscreen/MessageScreen.component';

import { Icon } from 'react-native-elements';
const Tab = createBottomTabNavigator();


const MainNavigation = () => {

    return (
        <Tab.Navigator
            tabBarOptions={{
                tabStyle: {
                    backgroundColor: "#892cdc",
                },
                showLabel: false,
                style: {
                    height: 60
                },
                keyboardHidesTabBar : true
            }}
            initialRouteName={"Home"}>
            <Tab.Screen name="Messages" component={MesssageScreen} options={{
                tabBarIcon: () => <Icon
                    name="comment"
                    type="font-awesome"
                    color='white'
                    size={30} />,
            }}></Tab.Screen>

            <Tab.Screen name="Home" component={HomePageNavigation}
                options={{
                    tabBarIcon: () => <Icon name="gamepad" type="font-awesome" color='white' size={35} /> , 
                    headerStyle : {
                        backgroundColor : "red"
                    }
                }}
                ></Tab.Screen>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: () =>
                    <Icon
                        name="user"
                        type="font-awesome"
                        color='white'
                        size={30} />
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}
export default MainNavigation;