import React, {useEffect, useState, useCallback} from 'react';
import {Modal, RefreshControl, Text, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import {Products} from '../../database';

import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import RenderItem from '../../components/functionalComponents/RenderItem';

import {styles} from '../../styles/styles';

import {dltAllPro, handleDelete} from '../../util/handleDelete';

import {
  isFlatListRefreshedAction,
  productFilterScreenVisibleAction,
  updateProAction,
} from '../../storeRedux/actions/productActions';
import RenderItemChild from '../../components/functionalComponents/RenderItemChild';
import BasicFlatList from '../../components/basicComponents/BasicFlatList';
import {formatToCurrencyInd, getTotal, randomId} from '../../util/utilFunc';
import ModalItem from '../../components/functionalComponents/products/ModalItem';
import {colors} from '../../colors/colors';

// MAIN FUNC ===================================================
const ProductDetail = ({navigation}) => {
  // STATES
  const [data, setData] = useState([]);
  const [filterBy, setFilterBy] = useState('date');
  const [totalQnt, setTotalQnt] = useState('');
  const [totalRealCost, setTotalRealCost] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

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

  const dispatch = useDispatch();

  useEffect(() => {
    Products.onChange(() => {
      setProductFilterFunc();
    });
    const unSubscribe = setProductFilterFunc();
    return unSubscribe;
  }, [isFlatListRefreshed]);

  useEffect(() => {
    setTotalQnt(getTotal(data, 'quantity'));
    setTotalRealCost(getTotal(data, 'real_cost'));
    setTotalAmount(getTotal(data, 'total_amount'));
  }, [data]);

  const onRefresh = useCallback(() => {
    dispatch(isFlatListRefreshedAction(true));
    setFilterBy('all');
    setData(filterAllProduct);
    dispatch(isFlatListRefreshedAction(false));
  });

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

  const setProductFilterFunc = () => {
    switch (filterBy) {
      case 'all':
        setData(filterAllProduct);
        break;

      case 'name':
        setData(filteredBy(filterAllProduct, 'name'));
        break;

      case 'vendor':
        setData(filteredBy(filterAllProduct, 'vendor'));
        break;

      case 'date':
        setData(filteredBy(filterAllProduct, 'date'));
        break;

      case 'productVendor':
        setData(filteredBy(filterAllProduct, 'productVendor'));
        break;

      case 'nameNDate':
        setData(filteredBy(filterAllProduct, 'nameNDate'));
        break;

      case 'vendorNDate':
        setData(filteredBy(filterAllProduct, 'vendorNDate'));
        break;

      case 'vendorProductDate':
        setData(filteredBy(filterAllProduct, 'vendorProductDate'));
        break;

      default:
        setData(filteredBy(filterAllProduct, 'date'));
    }
  };

  let flt = () => {
    switch (filterBy) {
      case 'name':
        return `Product: ${filteredName}`;
      case 'vendor':
        return `Vendor: ${filteredVendor}`;
      case 'date':
        return `Date: ${filteredDate}`;
      case 'productVendor':
        return `Product: ${filteredName} Vendor: ${filteredVendor}`;
      case 'nameNDate':
        return `Product: ${filteredName} Date: ${filteredDate}`;
      case 'vendorNDate':
        return `Vendor: ${filteredVendor} Date: ${filteredDate}`;
      case 'vendorProductDate':
        return `Vendor: ${filteredVendor}, Product: ${filteredName}, Date: ${filteredDate}`;
      case 'all':
        return 'All Entry';
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

  return (
    <SafeScreen>
      <View>
        {data.length ? (
          <View>
            <Text style={{color: colors.fbBlue}}>{flt()}</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              <RenderItemChild itemField={totalQnt} title="Total Quantity" />
              <RenderItemChild
                itemField={formatToCurrencyInd(totalRealCost)}
                title="Total Real Cost"
              />
              <RenderItemChild
                itemField={formatToCurrencyInd(totalAmount)}
                title="Total Amount"
              />
            </View>
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'red', fontSize: 24}}>No data available!</Text>
            <Text>Please, filter by another {filterBy}</Text>
          </View>
        )}
      </View>
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
          <View style={styles.modalViewChild}>
            <BasicButton
              style={styles.roundBtn}
              iconName="check-circle"
              onPress={() => {
                setProductFilterFunc();
                dispatch(productFilterScreenVisibleAction(false));
              }}
            />

            <ModalItem
              filterAllProduct={filterAllProduct}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              filteredDate={filteredDate}
              filteredName={filteredName}
              filteredVendor={filteredVendor}
            />
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

      {/* <BasicButton
        title="Delete All"
        onPress={() => {
          dltAllPro();
          alert('All data deleted!');
        }}
      /> */}
    </SafeScreen>
  );
};

export default ProductDetail;
