import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AddProduct from '../screens/product/AddProduct';
import HomeScreen from '../screens/HomeScreen';
import TabNavigator from './TabNavigator';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {colors} from '../colors/colors';

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

  switch (routeName) {
    case 'ProductDetail':
      return 'Product Detail';
    case 'HomeScreen':
      return 'Home';
    case 'SaleDetail':
      return 'Sale Detail';
  }
}

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerStyle: {
            backgroundColor: colors.fbBlue,
          },
          headerTintColor: colors.yellow,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontWeight: 'bold'},
        })}
      />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
