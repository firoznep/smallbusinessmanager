import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

// FOR NAVIGATION
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';

import _ from 'lodash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Products} from './src/database';

function App() {
  useEffect(() => {
    // Products.onLoaded(() =>
    //   setProductReducer(Products.filter({completed: true}).data()),
    // );

    // Products.onChange(() => console.log('Data Changed'));

    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
