import React, {useEffect, useState, useCallback} from 'react';
import {Modal, RefreshControl, Text, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import {Picker} from '@react-native-picker/picker';

// import {v4 as uuidv4} from 'uuid/dist/v4';
// import {v1 as uuidv1} from 'uuid';

import {Products} from '../../database';

import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import RenderItem from '../../components/functionalComponents/RenderItem';

import {styles} from '../../styles/styles';

import {dltAllPro, handleDelete} from '../../util/handleDelete';

import {
  filterByDate,
  filterByName,
  filterByVendor,
  isFlatListRefreshedAction,
  productFilterScreenVisibleAction,
  updateProAction,
} from '../../storeRedux/actions/productActions';
import BasicDropdownPicker from '../../components/basicComponents/BasicDropdownPicker';
import RenderItemChild from '../../components/functionalComponents/RenderItemChild';
import {sortedUniqBy} from '../../util/sortedUniq';
import BasicFlatList from '../../components/basicComponents/BasicFlatList';
import {colors} from '../../colors/colors';
import {randomId} from '../../util/utilFunc';

// MAIN FUNC ===================================================
const ProductDetail = ({navigation}) => {
  // STATES
  const [data, setData] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  // REDUX SELECTORS
  const isFlatListRefreshed = useSelector(
    (state) => state.productReducer.isFlatListRefreshed,
  );

  const isFilterScreenVisible = useSelector(
    (state) => state.productReducer.productFilterScreenIsVisible,
  );

  const filterAllProduct = useSelector((state) =>
    _.reverse([...state.productReducer.allProducts.data()]),
  );

  const filteredName = useSelector(
    (state) => state.productReducer.filter.byName,
  );

  const filteredVendor = useSelector(
    (state) => state.productReducer.filter.byVendor,
  );

  const filteredDate = useSelector(
    (state) => state.productReducer.filter.byDate,
  );

  // ------------------
  const filteredBy = (arr, by) => {
    return arr.filter((item) => {
      switch (by) {
        case 'date':
          return new Date(item.date).toDateString('en-US') === filteredDate;
        case 'name':
          return item.name === filteredName;
        case 'vendor':
          return item.vendor === filteredVendor;
        case 'productVendor':
          return item.vendor === filteredVendor && item.name === filteredName;
        case 'nameNDate':
          return (
            new Date(item.date).toDateString('en-US') === filteredDate &&
            item.name === filteredName
          );
        case 'vendorNDate':
          return (
            new Date(item.date).toDateString('en-US') === filteredDate &&
            item.vendor === filteredVendor
          );
        case 'vendorProductDate':
          return (
            new Date(item.date).toDateString('en-US') === filteredDate &&
            item.vendor === filteredVendor &&
            item.name === filteredName
          );
      }
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    Products.onChange(() => {
      setProductFilterFunc();
    });
    const unSubscribe = setProductFilterFunc();
    // return unSubscribe;
  }, [isFlatListRefreshed]);

  const onRefresh = useCallback(() => {
    dispatch(isFlatListRefreshedAction(true));
    setFilterBy('all');
    setData(filterAllProduct);

    dispatch(isFlatListRefreshedAction(false));
  });

  const setProductFilterFunc = () => {
    switch (filterBy) {
      case 'all':
        setData(filterAllProduct);
        setFilterBy('all');
        flt();
        break;

      case 'name':
        setData(filteredBy(filterAllProduct, 'name'));
        setFilterBy('name');
        flt();
        break;

      case 'vendor':
        setData(filteredBy(filterAllProduct, 'vendor'));
        setFilterBy('vendor');
        flt();
        break;

      case 'date':
        setData(filteredBy(filterAllProduct, 'date'));
        setFilterBy('date');
        flt();
        break;

      case 'productVendor':
        setData(filteredBy(filterAllProduct, 'productVendor'));
        setFilterBy('productVendor');
        flt();
        break;

      case 'nameNDate':
        setData(filteredBy(filterAllProduct, 'nameNDate'));
        setFilterBy('nameNDate');
        flt();
        break;

      case 'vendorNDate':
        setData(filteredBy(filterAllProduct, 'vendorNDate'));
        setFilterBy('vendorNDate');
        flt();
        break;

      case 'vendorProductDate':
        setData(filteredBy(filterAllProduct, 'vendorProductDate'));
        setFilterBy('vendorProductDate');
        flt();
        break;

      default:
        setData(filteredBy(filterAllProduct, 'date'));
        setFilterBy('date');
        flt();
    }
  };

  const renderItem = ({item}) => (
    <RenderItem
      item={item}
      handleDelete={() => handleDelete(Products, item)}
      handleUpdate={() => {
        let item1 = Products.get({id: item.id});
        dispatch(updateProAction(item1));
        navigation.navigate('UpdateProduct');
      }}
    />
  );

  let flt = () => {
    switch (filterBy) {
      case 'name':
        return filteredName;
      case 'vendor':
        return filteredVendor;
      case 'date':
        return filteredDate;
      case 'productVendor':
        return `Product ${filteredName} From ${filteredVendor}`;
      case 'nameNDate':
        return `Product ${filteredName} on ${filteredDate}`;
      case 'vendorNDate':
        return `From ${filteredVendor} on ${filteredDate}`;
      case 'vendorProductDate':
        return `From ${filteredVendor}, ${filteredName} on ${filteredDate}`;
      case 'all':
        return '';
    }
  };

  return (
    <SafeScreen>
      {data.length ? (
        <RenderItemChild itemField={data.length} title={`Total: ${flt()}`} />
      ) : (
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 24}}>No data available!</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{flt()}</Text>
          <Text>Please, filter by another {filterBy}</Text>
        </View>
      )}
      <BasicButton
        style={styles.roundBtn}
        iconName="plus"
        onPress={() => navigation.navigate('AddProduct')}
      />
      <Modal
        visible={isFilterScreenVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalView}>
          <View
            style={{
              width: '95%',
              height: '50%',
              backgroundColor: colors.backGColor,
              padding: 5,
              elevation: 10,
            }}>
            <BasicButton
              style={styles.roundBtn}
              // title="Close"
              iconName="check-circle"
              onPress={() => {
                setProductFilterFunc();
                dispatch(productFilterScreenVisibleAction(false));
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <BasicDropdownPicker
                title="Filter By"
                selectedValue={filterBy}
                backgroundColor={colors.fbBlue}
                fontColor={colors.yellow}
                minWidth={215}
                onValueChange={(itemValue) => setFilterBy(itemValue)}>
                <Picker.Item label="Filter By" value="" color="gray" />
                <Picker.Item label="Product" value="name" />
                <Picker.Item label="Vendor" value="vendor" />
                <Picker.Item label="Date" value="date" />
                <Picker.Item label="Product Vendor" value="productVendor" />
                <Picker.Item label="Product Date" value="nameNDate" />
                <Picker.Item label="Vendor Date" value="vendorNDate" />
                <Picker.Item
                  label="Vendor Product Date"
                  value="vendorProductDate"
                />
                <Picker.Item label="Show All Data" value="all" />
              </BasicDropdownPicker>

              {filterBy === 'vendor' ||
              filterBy === 'vendorNDate' ||
              filterBy === 'vendorProductDate' ||
              filterBy === 'productVendor' ? (
                <BasicDropdownPicker
                  title="Vendor's Name"
                  minWidth={190}
                  selectedValue={filteredVendor}
                  onValueChange={(itemValue) =>
                    dispatch(filterByVendor(itemValue))
                  }>
                  <Picker.Item
                    label="Select Vendor"
                    value={null}
                    color="gray"
                  />
                  {sortedUniqBy(filterAllProduct, 'vendor').map((elm) => {
                    return (
                      <Picker.Item label={elm} value={elm} key={randomId()} />
                    );
                  })}
                </BasicDropdownPicker>
              ) : null}

              {filterBy === 'name' ||
              filterBy === 'nameNDate' ||
              filterBy === 'vendorProductDate' ||
              filterBy === 'productVendor' ? (
                <BasicDropdownPicker
                  title="Product Name"
                  minWidth={190}
                  selectedValue={filteredName}
                  onValueChange={(itemValue) =>
                    dispatch(filterByName(itemValue))
                  }>
                  <Picker.Item label="Select Name" value={null} color="gray" />
                  {sortedUniqBy(filterAllProduct, 'name').map((elm) => {
                    return (
                      <Picker.Item label={elm} value={elm} key={randomId()} />
                    );
                  })}
                </BasicDropdownPicker>
              ) : null}

              {filterBy === 'date' ||
              filterBy === 'nameNDate' ||
              filterBy === 'vendorNDate' ||
              filterBy === 'vendorProductDate' ? (
                <BasicDropdownPicker
                  title="Date"
                  minWidth={190}
                  selectedValue={filteredDate}
                  onValueChange={(itemValue) =>
                    dispatch(filterByDate(itemValue))
                  }>
                  <Picker.Item label="Select Date" value={null} color="gray" />
                  {sortedUniqBy(filterAllProduct, 'date').map((elm) => {
                    return (
                      <Picker.Item label={elm} value={elm} key={randomId()} />
                    );
                  })}
                </BasicDropdownPicker>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>

      <BasicFlatList
        data={data}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isFlatListRefreshed}
            onRefresh={onRefresh}
          />
        }
      />

      <BasicButton
        title="Delete All"
        onPress={() => {
          // randomId();
          console.log(randomId());
        }}
      />
    </SafeScreen>
  );
};

export default ProductDetail;
