import React, {useEffect, useState, useCallback} from 'react';
import {Alert, FlatList, Modal, RefreshControl, Text, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import {Picker} from '@react-native-picker/picker';

import {Products} from '../../database';

import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import RenderItem from '../../components/functionalComponents/RenderItem';

import {styles} from '../../styles/styles';

import {dltAllPro, handleDelete} from '../../util/handleDelete';
import FlatItemSeparator from '../../components/functionalComponents/FlatItemSeparator';
import {
  filterByDate,
  filterByName,
  isFlatListRefreshedAction,
  productFilterScreenVisibleAction,
  updateProAction,
} from '../../storeRedux/actions/productActions';
import BasicDropdownPicker from '../../components/basicComponents/BasicDropdownPicker';
import RenderItemChild from '../../components/functionalComponents/RenderItemChild';
import {VIEWABILITY_CONFIG} from '../../util/utilFunc';
import {sortedUniqBy} from '../../util/sortedUniq';

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

  const filteredDate = useSelector(
    (state) => state.productReducer.filter.byDate,
  );

  // ------------------
  const filterProductByName = filterAllProduct.filter(
    (item) => item.name === filteredName,
  );

  const filterProductByDate = filterAllProduct.filter(
    (item) => new Date(item.date).toDateString('en-US') === filteredDate,
  );

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
        setData(filterProductByName);
        setFilterBy('name');
        flt();
        break;

      case 'date':
        setData(filterProductByDate);
        setFilterBy('date');
        flt();
        break;

      default:
        setData(filterProductByDate);
        setFilterBy('date');
        flt();
    }
  };

  const renderItem = ({item}) => (
    <RenderItem
      item={item}
      handleDelete={() => handleDelete(Products, item)}
      handleUpdate={() => {
        var item1 = Products.get({id: item.id});
        dispatch(updateProAction(item1));
        navigation.navigate('UpdateProduct');
      }}
    />
  );

  let flt = () => {
    switch (filterBy) {
      case 'name':
        return filteredName;
      case 'date':
        return filteredDate;
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
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>By: {flt()}</Text>
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
        <View
          style={{
            backgroundColor: 'rgba(11,23,44,.5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{width: '80%', height: '80%', backgroundColor: 'yellow'}}>
            <BasicButton
              title="Close"
              onPress={() => {
                setProductFilterFunc();
                dispatch(productFilterScreenVisibleAction(false));
              }}
            />

            <View style={{margin: 10}}>
              <BasicDropdownPicker
                selectedValue={filterBy}
                onValueChange={(itemValue) => setFilterBy(itemValue)}>
                <Picker.Item label="Filter By" value="" color="gray" />
                <Picker.Item label="Name" value="name" />
                <Picker.Item label="Date" value="date" />
                <Picker.Item label="Show All" value="all" />
              </BasicDropdownPicker>

              {filterBy === 'name' ? (
                <BasicDropdownPicker
                  selectedValue={filteredName}
                  onValueChange={(itemValue) =>
                    dispatch(filterByName(itemValue))
                  }>
                  <Picker.Item label="Select Name" value={null} color="gray" />
                  {sortedUniqBy(filterAllProduct, 'name').map((elm) => {
                    return <Picker.Item label={elm} value={elm} key={elm} />;
                  })}
                </BasicDropdownPicker>
              ) : null}

              {filterBy === 'date' ? (
                <BasicDropdownPicker
                  selectedValue={filteredDate}
                  onValueChange={(itemValue) =>
                    dispatch(filterByDate(itemValue))
                  }>
                  <Picker.Item label="Select Date" value={null} color="gray" />
                  {sortedUniqBy(filterAllProduct, 'date').map((elm) => {
                    return <Picker.Item label={elm} value={elm} key={elm} />;
                  })}
                </BasicDropdownPicker>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={FlatItemSeparator}
        // getItemLayout={getItemLayout}
        onEndReachedThreshold={7}
        scrollsToTop={true}
        initialNumToRender={7}
        removeClippedSubviews={true}
        viewabilityConfig={VIEWABILITY_CONFIG}
        refreshControl={
          <RefreshControl
            refreshing={isFlatListRefreshed}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeScreen>
  );
};

export default ProductDetail;
