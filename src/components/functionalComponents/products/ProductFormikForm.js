import React from 'react';

import {ScrollView, Text, TextInput} from 'react-native';

import {useFormikContext} from 'formik';

import BasicButton from '../../basicComponents/BasicButton';
import BasicInput from '../../basicComponents/BasicInput';
import ModalDateTimePicker from '../../basicComponents/ModalDateTimePicker';
import ErrorMsg from '../ErrorMsg';
import GetImage from '../GetImage';

const ProductFormikForm = () => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
  } = useFormikContext();

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      {/* DATE */}
      <ModalDateTimePicker
        pickedDateTime={(d) => setFieldValue('date', d)}
        title={new Date(values.date).toDateString()}
      />

      {/* IMGDATA */}

      <GetImage setImgData={(d) => setFieldValue('img_data', d)} />

      {/* NAME */}
      <BasicInput
        label="Name"
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
      />
      <ErrorMsg errField={errors.name} touchedField={touched.name} />

      {/* MODEL */}
      <BasicInput
        label="Model"
        onChangeText={handleChange('model')}
        onBlur={handleBlur('model')}
      />

      {/* SIZE */}
      <BasicInput
        label="Size"
        onChangeText={handleChange('size')}
        onBlur={handleBlur('size')}
      />

      {/* COLOR */}
      <BasicInput
        label="Color"
        onChangeText={handleChange('color')}
        onBlur={handleBlur('color')}
      />

      {/* QUANTITY */}
      <BasicInput
        label="Quantity"
        onChangeText={handleChange('quantity')}
        onBlur={handleBlur('quantity')}
        keyboardType="numeric"
      />
      <ErrorMsg errField={errors.quantity} touchedField={touched.quantity} />

      {/* REAL COST */}
      <BasicInput
        label="Real Cost"
        onChangeText={handleChange('real_cost')}
        onBlur={handleBlur('real_cost')}
        keyboardType="numeric"
      />
      <ErrorMsg errField={errors.real_cost} touchedField={touched.real_cost} />

      {/* DESCRIPTION */}
      <Text>Description</Text>
      <TextInput
        placeholder="Description"
        onChangeText={handleChange('description')}
        onBlur={handleBlur('description')}
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        style={{
          backgroundColor: 'white',
          borderWidth: 2,
          marginBottom: 10,
        }}
      />

      <BasicButton onPress={handleSubmit} title="Submit" iconName="check" />
    </ScrollView>
  );
};

export default ProductFormikForm;
