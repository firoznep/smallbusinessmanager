import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome5';

// FOR NAVIGATION
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from 'react-native-splash-screen';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
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
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        // screenOptions={({route}) => ({
        //   tabBarIcon: ({focused, color, size}) => {
        //     let iconName;

        //     if (route.name === 'Home') {
        //       iconName = focused ? 'home' : 'times';
        //     } else if (route.name === 'Settings') {
        //       iconName = focused ? 'plus' : 'facebook';
        //     }

        //     // You can return any component that you like here!
        //     return <Icon name={iconName} size={size} color={color} />;
        //   },
        // })}
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
