import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

// FOR NAVIGATION
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from 'react-native-splash-screen';
import {Products} from './src/database';

function HomeScreen() {
  const din = () => {
    Products.insert({
      name: 'test',
      note: 'some testing',
      completed: false,
    });
    alert('added success');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home! </Text>
      <Button title="add Product" onPress={() => din()} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    Products.onLoaded(() => setProductData(Products.data()));

    /**
     * onChange is used to perform actions whenever DB is changed or updated.
     */
    Products.onChange(() => setProductData(Products.data()));

    SplashScreen.hide();
  }, []);

  console.log(productData.length);
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
