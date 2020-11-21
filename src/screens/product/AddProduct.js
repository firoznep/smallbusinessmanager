import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {colors} from '../../colors/colors';
import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import {Products} from '../../database';

const AddProduct = () => {
  const adPr = () => {
    Products.insert({
      date: new Date(),
      name: 'Test',
      color: 'blue',
      note: 'Testing by inserting an item',
      is_completed: 'false',
    })[0];

    // alert('done');
    console.log(Products.data().length);
  };

  return (
    <SafeScreen>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Add Product</Text>

        <BasicButton title="add" onPress={() => adPr()} />
      </View>
    </SafeScreen>
  );
};

export default AddProduct;
