import React, {useCallback, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import SafeScreen from '../components/basicComponents/SafeScreen';
import {styles} from '../styles/styles';

const HomeScreen = ({navigation}) => {
  const allProductData = useSelector((state) => ({
    DATA: _.reverse([...state.productReducer.allProducts.data()]),
    filterByN: state.productReducer.filter,
  }));

  const dispatch = useDispatch();

  return (
    <SafeScreen>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.homeItems}>
            <Text>Total Product</Text>
            <Text>{allProductData.DATA.length}</Text>
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
