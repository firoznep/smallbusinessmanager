import React, {useEffect} from 'react';

import {ScrollView, Text, TextInput} from 'react-native';

import {useFormikContext} from 'formik';

import BasicButton from '../../basicComponents/BasicButton';
import BasicInput from '../../basicComponents/BasicInput';
import ModalDateTimePicker from '../../basicComponents/ModalDateTimePicker';
import ErrorMsg from '../ErrorMsg';
import GetImage from '../GetImage';
import RenderItemChild from '../RenderItemChild';
import {getTotalAmt} from '../../../util/utilFunc';

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

  useEffect(() => {
    setFieldValue('real_cost', getTotalAmt(values.cost_price, values.expenses));
    setFieldValue(
      'total_amount',
      getTotalAmt(values.cost_price, values.expenses, values.quantity),
    );
  }, [values.cost_price, values.expenses, values.quantity]);

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
        label={`Product Name *`}
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

      {/* UNIT */}
      <BasicInput
        label="Unit"
        onChangeText={handleChange('unit')}
        onBlur={handleBlur('unit')}
        value={values.unit}
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

      {/* COST PRICE */}
      <BasicInput
        label="Primary cost on per unit *"
        onChangeText={handleChange('cost_price')}
        onBlur={handleBlur('cost_price')}
        keyboardType="numeric"
        value={values.cost_price}
      />
      <ErrorMsg
        errField={errors.cost_price}
        touchedField={touched.cost_price}
      />

      {/* EXPENSES */}
      <BasicInput
        label="Expenses On per unit (vat,transport...)"
        onChangeText={handleChange('expenses')}
        onBlur={handleBlur('expenses')}
        keyboardType="numeric"
        value={values.expenses}
      />

      <RenderItemChild title="Real Cost" itemField={values.real_cost} />
      <RenderItemChild title="Total Amount" itemField={values.total_amount} />

      {/* DESCRIPTION */}
      <RenderItemChild>Description</RenderItemChild>
      <TextInput
        placeholder="Description"
        onChangeText={handleChange('description')}
        autoCapitalize="none"
        multiline={true}
        numberOfLines={3}
        textAlignVertical="top"
        // onBlur={handleBlur('description')}
        value={values.description}
        keyboardType="twitter"
        // blurOnSubmit={true}
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
