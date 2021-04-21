import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Pages Import
import LoginPage from '../scenes/loginscenes/loginpage/LoginPage.component';
import RegisterPage from '../scenes/loginscenes/registerpage/RegisterPage.component';
import ForgotPage from '../scenes/loginscenes/forgotpage/ForgotPage.component';

const Stack = createStackNavigator();


const LoginNavigaton = () => {
    return (
        <Stack.Navigator initialRouteName = {"Login"}>
            <Stack.Screen name = "Login" component = {LoginPage} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name = "Register" component = {RegisterPage} options = {{headerShown : false}}></Stack.Screen>
            <Stack.Screen name = "Forgot" component = {ForgotPage} options = {{headerShown : false}}></Stack.Screen>
        </Stack.Navigator>
    );
}

export default LoginNavigaton;