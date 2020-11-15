import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

// FOR NAVIGATION
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from 'react-native-splash-screen';
import {Products} from './src/database';

import {connect} from 'react-redux';
import {addProduct} from './src/redux/action/actions';

import _ from 'lodash';
import ModalDateTimePicker from './src/components/basicComponents/ModalDateTimePicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProductsDetails from './src/screens/product/ProductsDetail';
import BasicButton from './src/components/basicComponents/BasicButton';

function HomeScreen({setProductReducer}) {
  const din = () => {
    Products.insert({
      date: new Date(),
      name: 'another',
      note: 'good test',
      completed: false,
    });
    // setProductReducer({
    //   date: new Date(),
    //   name: 'another',
    //   note: 'good test',
    //   completed: false,
    // });
    alert('added success');
  };

  const rmAll = () => {
    Products.perform(function (db) {
      // Remove all completed items
      // and update incompleted item to completed
      Products.data().forEach(function (item) {
        if (item.completed) {
          db.remove(item);
        } else {
          db.update(item, {completed: true});
        }
      });
    });
    alert('all Data deleted');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home! </Text>
      <BasicButton
        iconName="times"
        iconColor="red"
        title="remove all data"
        onPress={() => rmAll()}
      />
      <Button title="add Product" onPress={() => din()} />
      <FontAwesome5 name={'comments'} solid size={24} color={'red'} />
    </View>
  );
}

function SettingsScreen() {
  const [pickedDateTime, setPickedDateTime] = useState(
    new Date().toDateString(),
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
      <View>
        <ModalDateTimePicker
          pickedDateTime={setPickedDateTime}
          title={pickedDateTime}
        />
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App({productReducer, setProductReducer}) {
  useEffect(() => {
    Products.onLoaded(() =>
      setProductReducer(Products.filter({completed: true}).data()),
    );

    // Products.onChange(() => setProductReducer(Products.data()));

    SplashScreen.hide();
  }, []);

  // console.log(productReducer);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="ProductsDetails" component={ProductsDetails} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  productReducer: _.reverse(state.productReducer),
});

const mapDispatchToProps = (dispatch) => ({
  setProductReducer: (products) => dispatch(addProduct(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
