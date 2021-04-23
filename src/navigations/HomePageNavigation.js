import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Pages Import
import HomePage from '../scenes/mainscenes/homescreen/HomePage.component';
import FriendsScreen from '../scenes/mainscenes/friendsscreen/FriendsScreen.component';

// Modal Navigation Import
import ModalNavigation from './ModalNavigation';

// Style Import 
import { Icon } from "react-native-elements";

// Creating stack navigator
const Stack = createStackNavigator();





const HomePageNavigation = (props) => {
    return (
        <Stack.Navigator initialRouteName={"HomePage"}
            screenOptions={{
                gestureEnabled : true,
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: false,
                cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 0.5, 0.9, 1],
                            outputRange: [0, 0.25, 0.7, 1],
                        }),
                    },
                    overlayStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5],
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
                    headerTitle: "Oyunlar",
                    headerTitleStyle: { marginLeft: 10 },
                    headerRight: () => <Icon name="users" type="font-awesome" size={27} onPress={() => props.navigation.navigate("Friends")} />,
                    headerRightContainerStyle: { marginRight: 20 },
                }}
            ></Stack.Screen>

            <Stack.Screen
                name="Friends"
                component={FriendsScreen}
                options={{
                    headerShown: true
                }}

            ></Stack.Screen>

            <Stack.Screen
                name="Modal"
                component={ModalNavigation}
                options={{ headerShown: false }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
}

export default HomePageNavigation;