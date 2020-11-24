import React from 'react';

import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import {ErrorMessage, Formik} from 'formik';

import {Products} from '../../database';

import _ from 'lodash';

import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import ModalDateTimePicker from '../../components/basicComponents/ModalDateTimePicker';
import BasicInput from '../../components/basicComponents/BasicInput';

import {formatToCurrencyInd, getTotalWithPercent} from '../../util/utilFunc';
import {yupValidationSchema} from '../../util/yupValidationSchema';
import {styles} from '../../styles/styles';
import ErrorMsg from '../../components/functionalComponents/ErrorMsg';
import ProductFormikForm from '../../components/functionalComponents/products/ProductFormikForm';

// MAIN FUNC --------------------------------------------------------
const AddProduct = () => {
  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: new Date(),
          img_data: '',
          name: '',
          model: '',
          size: '',
          color: '',
          quantity: '',
          real_cost: '',
          description: '',
        }}
        onSubmit={(values) => {
          Products.insert(values);
          alert('Product added');
        }}
        validationSchema={yupValidationSchema}>
        <ProductFormikForm />
      </Formik>
    </SafeScreen>
  );
};

export default AddProduct;
