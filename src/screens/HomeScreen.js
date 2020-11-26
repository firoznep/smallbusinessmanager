import React, {useCallback, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import SafeScreen from '../components/basicComponents/SafeScreen';
import {styles} from '../styles/styles';
import {filterByName} from '../storeRedux/actions/productActions';

const HomeScreen = ({navigation}) => {
  const allProductData = useSelector((state) => ({
    DATA: _.reverse([...state.productReducer.allProducts.data()]),
    filterByN: state.productReducer.filter,
  }));

  const dispatch = useDispatch();

  // const dd = useCallback((name) => dispatch(filterByName(name)));

  // dd('muslim');

  return (
    <SafeScreen>
      <ScrollView
        style={{
          flex: 1,
          // justifyContent: 'center',
          backgroundColor: 'white',
          // alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.homeItems}>
            <Text>Total Product</Text>
            {/* <Text>{allProductData.length}</Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeItems}
            onPress={() => dispatch(filterByName('Umar'))}>
            <Text>filterbyName</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeItems}>
            <Text>Placeholder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeItems}>
            <Text>Placeholder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeItems}>
            <Text>Placeholder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeItems}>
            <Text>Placeholder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default HomeScreen;
