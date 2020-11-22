import React, {useRef, useState} from 'react';

import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import {Formik, useFormikContext} from 'formik';

import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import {Products} from '../../database';

import * as yup from 'yup';
import ModalDateTimePicker from '../../components/basicComponents/ModalDateTimePicker';
import BasicInput from '../../components/basicComponents/BasicInput';

import _ from 'lodash';
import {colors} from '../../colors/colors';

const productsValidateSchema = yup.object().shape({
  name: yup.string().required('Email Address is Required').label('Name'),
});

const getTotalWithPercent = (num1, num2, per) => {
  let t = Number(num1) + Number(num2);
  let result = Math.floor((per / 100) * t + t);
  return result;
};

// MAIN FUNC --------------------------------------------------------
const AddProduct = () => {
  // const {values, handleSubmit} = useFormikContext();

  // console.log(values);
  // const adPr = () => {
  //   Products.insert({
  //     date: new Date(),
  //     name: 'track',
  //     model: 'box',
  //     color: 'navi-blue',
  //     cost_price: 150,
  //     expenses: 150,
  //     profit_percent: 15,
  //     sale_price: getTotalWithPercent(150 + 150, 15),
  //     description: '4 box, ilastic ancle, ilastic belt with dori',
  //   })[0];

  //   alert('item added');
  // };

  const dltAllPro = () => {
    Products.perform(function (db) {
      Products.data().forEach(function (item) {
        db.remove(item);
      });
    });
  };
  // console.log(pickedDateTime);

  const formatToCurrency = (amount) => {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  console.log(formatToCurrency(120000));

  return (
    <SafeScreen>
      {/* <ScrollView
        style={{backgroundColor: 'green', flex: 1}}
        keyboardShouldPersistTaps="handled"> */}
      <Formik
        initialValues={{
          date: new Date(),
          name: '',
          model: '',
          color: '',
          cost_price: 0,
          expenses: 0,
          profit_percent: 0,
          sale_price: 0,
          description: '',
        }}
        onSubmit={(values) => {
          Products.insert(values);
          alert('added');
        }}
        validationSchema={productsValidateSchema}>
        {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
          <ScrollView keyboardShouldPersistTaps="handled">
            {/* DATE */}
            <ModalDateTimePicker
              // pickedDateTime={setPickedDateTime}
              pickedDateTime={(d) => setFieldValue('date', d)}
              title={new Date(values.date).toDateString()}
            />

            {/* NAME */}
            <BasicInput
              label="Name"
              // iconName="tshirt"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />

            {/* MODEL */}
            <BasicInput
              label="Model"
              // iconName="user"
              onChangeText={handleChange('model')}
              onBlur={handleBlur('model')}
            />

            {/* COLOR */}
            <BasicInput
              label="Color"
              // iconName="user"
              onChangeText={handleChange('color')}
              onBlur={handleBlur('color')}
            />

            {/* COST PRICE */}
            <BasicInput
              label="Cost Price"
              // iconName="user"
              onChangeText={handleChange('cost_price')}
              onBlur={handleBlur('cost_price')}
              keyboardType="numeric"
            />

            {/* OTHER EXPENSES */}
            <BasicInput
              label="Expenses"
              // iconName="user"
              onChangeText={handleChange('expenses')}
              onBlur={handleBlur('expenses')}
              keyboardType="numeric"
            />

            {/* MARGIN PERCENT */}
            <BasicInput
              label="Profit %"
              // iconName="user"
              onChangeText={handleChange('profit_percent')}
              onBlur={handleBlur('profit_percent')}
              keyboardType="numeric"
            />

            <TouchableHighlight
              onPress={() =>
                setFieldValue(
                  'sale_price',
                  getTotalWithPercent(
                    values.cost_price,
                    values.expenses,
                    values.profit_percent,
                  ),
                )
              }
              style={{
                backgroundColor: 'white',
                padding: 8,
                borderBottomColor: 'orange',
                borderBottomWidth: 2,
                width: '50%',
              }}>
              {/* <Text>Sale Price</Text> */}
              <Text style={{fontWeight: 'bold', fontSize: 18, color: 'gray'}}>
                Sale Price: {values.sale_price}
              </Text>
            </TouchableHighlight>

            {/* SALE PRICE */}
            {/* <TextInput
                // label="Sale Price"
                onChangeText={() =>
                  setFieldValue(
                    'sale_price',
                    getTotalWithPercent(
                      values.cost_price + values.expenses,
                      values.profit_percent,
                    ),
                  )
                }
                onBlur={handleBlur('sale_price')}
                value={values.sale_price}
              /> */}

            {/* DESCRIPTION */}
            <TextInput
              // label="Description"
              placeholder="Description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              style={{
                backgroundColor: 'white',
                borderWidth: 2,
                margin: 10,
              }}
            />

            <BasicButton
              onPress={handleSubmit}
              title="Submit"
              iconName="check"
            />
          </ScrollView>
        )}
      </Formik>
      {/* </ScrollView> */}

      {/* other.............. */}
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Add Product</Text> */}

      {/* <BasicButton
          title="add"
          onPress={() => {
            adPr();
            alert('item added');
          }}
        /> */}

      <BasicButton
        title="Delete all Product"
        onPress={() => {
          dltAllPro();
          alert('deleted all Pro');
        }}
      />
      {/* </View> */}
    </SafeScreen>
  );
};

export default AddProduct;
