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
      name: 'sixth',
      color: 'blue',
      note: 'Testing by inserting an item',
      is_completed: 'true',
    })[0];

    alert('item added');
  };

  const dltAllPro = () => {
    Products.perform(function (db) {
      // Remove all completed items
      // and update incompleted item to completed
      Products.data().forEach(function (item) {
        db.remove(item);
        // if (item.completed) {
        // } else {
        //     db.update(item, { completed: true })
        // }
      });
    });
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

        <BasicButton
          title="add"
          onPress={() => {
            adPr();
            alert('item added');
          }}
        />
        <BasicButton
          title="Delete all Product"
          onPress={() => {
            dltAllPro();
            alert('deleted all Pro');
          }}
        />
      </View>
    </SafeScreen>
  );
};

export default AddProduct;
