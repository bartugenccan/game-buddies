/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';


// Navigations
import LoginNavigation from './src/navigations/LoginNavigation';

const App = () => {
  
  return (
    <NavigationContainer>
      <LoginNavigation></LoginNavigation>
    </NavigationContainer>
  );
};





export default App;
