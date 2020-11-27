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

import {dltAllPro} from '../../util/deleteAll';
import FlatItemSeparator from '../../components/functionalComponents/FlatItemSeparator';
import {
  filterByName,
  isFlatListRefreshedAction,
  productFilterScreenVisibleAction,
  updateProAction,
} from '../../storeRedux/actions/productActions';
import BasicDropdownPicker from '../../components/basicComponents/BasicDropdownPicker';

const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

// MAIN FUNC ===================================================
const ProductDetail = ({navigation}) => {
  const [data, setData] = useState([]);
  const [filterBy, setFilterBy] = useState('');

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

  const filterProductByName = useSelector((state) =>
    state.productReducer.allProducts
      .data()
      .filter((item) => item.name === filteredName),
  );

  const filterProductByDate = useSelector((state) =>
    state.productReducer.allProducts
      .data()
      .filter(
        (item) =>
          new Date(item.date).toDateString('en-US') ===
          filteredDate.toDateString('en-US'),
      ),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    Products.onChange(() => {
      setProductFilterFunc();
    });
    setProductFilterFunc();
  }, [isFlatListRefreshed]);

  const onRefresh = useCallback(() => {
    dispatch(isFlatListRefreshedAction(true));

    setProductFilterFunc();
    dispatch(isFlatListRefreshedAction(false));
  });

  const setProductFilterFunc = () => {
    switch (filterBy) {
      case 'all':
        setData(filterAllProduct);
        break;

      case 'name':
        setData(filterProductByName);
        break;

      case 'date':
        setData(filterProductByDate);
        break;

      default:
        setData(filterProductByDate);
    }
  };

  const renderItem = ({item}) => (
    <RenderItem
      item={item}
      handleDelete={() => {
        Alert.alert(
          'Are you sure you want to delete this item?',
          'Item will be deleted permanently!',
          [
            {
              text: 'Cancel',
              onPress: () => {
                return;
              },
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                let id = Products.get({id: item.id});
                Products.remove(id);
                setProductFilterFunc();
                alert('Deleted');
              },
            },
          ],
          {cancelable: false},
        );
      }}
      handleUpdate={() => {
        var item1 = Products.get({id: item.id});
        dispatch(updateProAction(item1));
        navigation.navigate('UpdateProduct');
      }}
    />
  );

  return (
    <SafeScreen>
      <Text>Total Product: {data.length} </Text>
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
                <Picker.Item label="All" value="all" />
                <Picker.Item label="By Name" value="name" />
                <Picker.Item label="By Date" value="date" />
              </BasicDropdownPicker>

              <BasicDropdownPicker
                selectedValue={filteredName}
                onValueChange={(itemValue) =>
                  dispatch(filterByName(itemValue))
                }>
                <Picker.Item label="Select Name" value="" color="gray" />
                <Picker.Item label="tffg" value="tffg" />
                <Picker.Item label="item1" value="item1" />
                <Picker.Item label="hoodie for girl" value="hoodie for girl" />
              </BasicDropdownPicker>
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

      <BasicButton title="delete all" onPress={() => dltAllPro()} />
    </SafeScreen>
  );
};

export default ProductDetail;
