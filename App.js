/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// React Import
import React, { useEffect, useState } from 'react';

// React & Redux Imports
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';

// Navigations
import LoginNavigation from './src/navigations/LoginNavigation';
import MainNavigation from './src/navigations/MainNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Firebase Import
import auth from '@react-native-firebase/auth';

const App = () => {

  // Initial state for loggedIn is null.
  const [loggedIn, setLoggedIn] = useState(null);

  // Checks for loggedIn state from firebase for navigation return.
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        const newLoggedInState = true;
        setLoggedIn(newLoggedInState);
      } else {
        const newLoggedInState = false;
        setLoggedIn(newLoggedInState);
      }
    });

    
  }, []);

  // Function for conditional rendering 
  const renderContent = () => {
    switch (loggedIn) {
      case true:
        return <MainNavigation></MainNavigation>
      case false:
        return <LoginNavigation></LoginNavigation>
    }
  }

  // Creating store for redux
  const store = createStore(reducers, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#ffffff" barStyle={"dark-content"} />
      <SafeAreaProvider>
        <NavigationContainer>
          {renderContent()}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>

  )
};

export default App;
