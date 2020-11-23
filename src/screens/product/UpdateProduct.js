import {Formik} from 'formik';
import React from 'react';
import {
  ScrollView,
  Text,
  TextInputBase,
  TouchableHighlight,
  View,
} from 'react-native';
import BasicInput from '../../components/basicComponents/BasicInput';
import ModalDateTimePicker from '../../components/basicComponents/ModalDateTimePicker';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import {Products} from '../../database';

const UpdateProduct = () => {
  return (
    <SafeScreen>
      <Formik
        initialValues={{
          date: new Date(),
          name: '',
          model: '',
          color: '',
          cost_price: '',
          expenses: '',
          profit_percent: '',
          sale_price: '',
          description: '',
        }}
        onSubmit={(values) => {
          Products.update(values);
          alert('added');
        }}
        validationSchema={productsValidateSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <ScrollView keyboardShouldPersistTaps="handled">
            {/* DATE */}
            <ModalDateTimePicker
              pickedDateTime={(d) => setFieldValue('date', d)}
              title={new Date(values.date).toDateString()}
            />

            {/* NAME */}
            <BasicInput
              label="Name"
              // iconName="tshirt"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={errors.name}
              touched={touched.name}
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
              onChangeText={handleChange('cost_price')}
              onBlur={handleBlur('cost_price')}
              keyboardType="numeric"
              error={errors.cost_price}
              touched={touched.cost_price}
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

            <Text style={{color: 'red', fontSize: 9}}>
              update this value, if cost price or expenses or profit % is
              changed!
            </Text>

            <TouchableHighlight
              onPress={() =>
                setFieldValue(
                  'sale_price',
                  getTotalWithPercent(
                    Number(values.cost_price) + Number(values.expenses),
                    values.profit_percent,
                  ),
                )
              }
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderBottomColor: 'orange',
                borderBottomWidth: 2,
                // width: '50%',
              }}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'gray'}}>
                  Sale Price: Sale Price:{' '}
                  {formatToCurrencyInd(values.sale_price)}
                </Text>
              </View>
            </TouchableHighlight>

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
    </SafeScreen>
  );
};

export default UpdateProduct;
