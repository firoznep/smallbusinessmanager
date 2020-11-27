import React from 'react';

import {ScrollView, Text, TextInput} from 'react-native';

import {useFormikContext} from 'formik';

import BasicButton from '../../basicComponents/BasicButton';
import BasicInput from '../../basicComponents/BasicInput';
import ModalDateTimePicker from '../../basicComponents/ModalDateTimePicker';
import ErrorMsg from '../ErrorMsg';
import GetImage from '../GetImage';
import BasicIcon from '../../basicComponents/BasicIcon';

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

      {/* VENDOR */}
      <BasicInput
        label="Vendor"
        onChangeText={handleChange('vendor')}
        onBlur={handleBlur('vendor')}
        value={values.vendor}
      />

      {/* NAME */}
      <BasicInput
        label={`Name *`}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        value={values.name}
      />
      <ErrorMsg errField={errors.name} touchedField={touched.name} />

      {/* MODEL */}
      <BasicInput
        label="Model"
        onChangeText={handleChange('model')}
        onBlur={handleBlur('model')}
        value={values.model}
      />

      {/* SIZE */}
      <BasicInput
        label="Size"
        onChangeText={handleChange('size')}
        onBlur={handleBlur('size')}
        value={values.size}
      />

      {/* COLOR */}
      <BasicInput
        label="Color"
        onChangeText={handleChange('color')}
        onBlur={handleBlur('color')}
        value={values.color}
      />

      {/* QUANTITY */}
      <BasicInput
        label="Quantity *"
        onChangeText={handleChange('quantity')}
        onBlur={handleBlur('quantity')}
        keyboardType="numeric"
        value={values.quantity}
      />
      <ErrorMsg errField={errors.quantity} touchedField={touched.quantity} />

      {/* REAL COST */}
      <BasicInput
        label="Real Cost *"
        onChangeText={(n) =>
          setFieldValue('real_cost', Math.floor(n).toString())
        }
        onBlur={handleBlur('real_cost')}
        keyboardType="numeric"
        value={values.real_cost}
      />
      <ErrorMsg errField={errors.real_cost} touchedField={touched.real_cost} />

      {/* DESCRIPTION */}
      <Text>Description</Text>
      <TextInput
        placeholder="Description"
        onChangeText={(d) => setFieldValue('description', d)}
        autoCapitalize="none"
        multiline={true}
        numberOfLines={3}
        textAlignVertical="top"
        onBlur={handleBlur('description')}
        value={values.description}
        keyboardType="twitter"
        blurOnSubmit={true}
        selectTextOnFocus={true}
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
