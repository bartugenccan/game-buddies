import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Pages Import
import HomePage from '../scenes/mainscenes/homescreen/HomePage.component';
import FriendsScreen from '../scenes/mainscenes/friendsscreen/FriendsScreen.component';


// Style Import 
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const LoginNavigaton = (props) => {
    return (
        <Stack.Navigator initialRouteName={"HomePage"}>
            <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    headerShown: true,
                    headerTitle: "Oyunlar",
                    headerTitleStyle: { marginLeft: 10 },
                    headerRight: () => <Icon name="users" type="font-awesome" size={27} onPress={() => props.navigation.navigate("Friends")} />,
                    headerRightContainerStyle: { marginRight: 20 }
                }} ></Stack.Screen>
            <Stack.Screen name="Friends" component={FriendsScreen} options={{ headerShown: true }}></Stack.Screen>
        </Stack.Navigator>
    );
}

export default LoginNavigaton;