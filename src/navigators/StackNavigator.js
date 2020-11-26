import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AddProduct from '../screens/product/AddProduct';
import HomeScreen from '../screens/HomeScreen';
import TabNavigator from './TabNavigator';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {colors} from '../colors/colors';
import UpdateProduct from '../screens/product/UpdateProduct';
import BasicIcon from '../components/basicComponents/BasicIcon';
import {useDispatch} from 'react-redux';
import {productFilterScreenVisibleAction} from '../storeRedux/actions/productActions';
import BasicButton from '../components/basicComponents/BasicButton';

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
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerRight: () =>
            getHeaderTitle(route) === 'Product Detail' ? (
              <BasicButton
                iconName="filter"
                iconColor="yellow"
                onPress={() => {
                  dispatch(productFilterScreenVisibleAction(true));
                }}
              />
            ) : null,

          headerStyle: {
            backgroundColor: colors.fbBlue,
          },
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontWeight: 'bold'},
        })}
      />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
