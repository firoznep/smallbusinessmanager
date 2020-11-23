import React, {useEffect} from 'react';

import {useFormikContext} from 'formik';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {styles} from '../../../styles/styles';
import {formatToCurrencyInd, getTotalWithPercent} from '../../../util/utilFunc';
import BasicButton from '../../basicComponents/BasicButton';
import BasicInput from '../../basicComponents/BasicInput';
import ModalDateTimePicker from '../../basicComponents/ModalDateTimePicker';
import ErrorMsg from '../ErrorMsg';
import {colors} from '../../../colors/colors';

const ProductFormikForm = () => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    setFieldValue(
      'sale_price',
      getTotalWithPercent(
        Number(values.cost_price) + Number(values.expenses),
        values.profit_percent,
      ),
    );
    setFieldValue(
      'real_cost',
      Number(values.cost_price) + Number(values.expenses),
    );
  }, [values.cost_price, values.expenses, values.profit_percent]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      {/* DATE */}
      <ModalDateTimePicker
        pickedDateTime={(d) => setFieldValue('date', d)}
        title={new Date(values.date).toDateString()}
      />

      {/* NAME */}
      <BasicInput
        label="Name"
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
      />
      <ErrorMsg name="name" />

      {/* MODEL */}
      <BasicInput
        label="Model"
        onChangeText={handleChange('model')}
        onBlur={handleBlur('model')}
      />

      {/* COLOR */}
      <BasicInput
        label="Color"
        onChangeText={handleChange('color')}
        onBlur={handleBlur('color')}
      />

      {/* COST PRICE */}
      <BasicInput
        label="Cost Price"
        onChangeText={handleChange('cost_price')}
        onBlur={handleBlur('cost_price')}
        keyboardType="numeric"
      />
      <ErrorMsg name="cost_price" />

      {/*  EXPENSES */}
      <BasicInput
        label="Expenses"
        onChangeText={handleChange('expenses')}
        onBlur={handleBlur('expenses')}
        keyboardType="numeric"
      />

      <View
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderBottomWidth: 3,
          borderBottomColor: 'orange',
        }}>
        <Text style={{color: colors.phGray}}>Real Cost</Text>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: 'gray'}}>
          {formatToCurrencyInd(
            Number(values.cost_price) + Number(values.expenses),
          )}
        </Text>
      </View>

      {/* MARGIN PERCENT */}
      <BasicInput
        label="Profit %"
        onChangeText={handleChange('profit_percent')}
        onBlur={handleBlur('profit_percent')}
        keyboardType="numeric"
      />

      <View
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderBottomWidth: 3,
          borderBottomColor: 'orange',
        }}>
        <Text style={{color: colors.phGray}}>Sale Price</Text>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: 'gray'}}>
          {`Sale Price: ${formatToCurrencyInd(values.sale_price)}`}
        </Text>
      </View>

      {/* <BasicButton
        style={styles.whiteBtn}
        fontSize={18}
        fontColor={'gray'}
        title={`Sale Price: ${formatToCurrencyInd(values.sale_price)}`}
      /> */}

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
