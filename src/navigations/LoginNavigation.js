import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Pages Import
import LoginPage from '../scenes/loginscenes/loginpage/LoginPage.component';
import RegisterPage from '../scenes/loginscenes/registerpage/RegisterPage.component';
import ForgotPage from '../scenes/loginscenes/forgotpage/ForgotPage.component';

const Stack = createStackNavigator();


const LoginNavigaton = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Login" component = {LoginPage} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name = "Register" component = {RegisterPage}></Stack.Screen>
            <Stack.Screen name = "Forgot" component = {ForgotPage}></Stack.Screen>
        </Stack.Navigator>
    );
}

export default LoginNavigaton;