import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import _ from 'lodash';

import {Products} from '../../database';

import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import RenderItem from '../../components/functionalComponents/RenderItem';

import {styles} from '../../styles/styles';

import {dltAllPro} from '../../util/deleteAll';
import FlatItemSeparator from '../../components/functionalComponents/FlatItemSeparator';
import {
  filterByName,
  productFilterScreenVisibleAction,
  updateProAction,
} from '../../storeRedux/actions/productActions';
import BasicInput from '../../components/basicComponents/BasicInput';

const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

// MAIN FUNC ===================================================
const ProductDetail = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  });

  const stateSelector = useSelector((state) => ({
    proAllData: _.reverse([...state.productReducer.allProducts.data()]),
    filterScreen: state.productReducer.productFilterScreenIsVisible,
    filterByName: state.productReducer.filter.byName,
  }));

  console.log(stateSelector.filterByName);

  let filterProductByName = stateSelector.proAllData.filter(
    (item) => item.name === stateSelector.filterByName,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    Products.onChange(() => {});
  });

  const renderItem = ({item}) => (
    <RenderItem
      item={item}
      handleDelete={() => {
        let id = Products.get({id: item.id});
        Products.remove(id);
        alert('Deleted');
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
      <Text>Total Product: {stateSelector.length} </Text>
      <BasicButton
        style={styles.roundBtn}
        iconName="plus"
        onPress={() => navigation.navigate('AddProduct')}
      />
      <Modal
        visible={stateSelector.filterScreen}
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
              onPress={() => dispatch(productFilterScreenVisibleAction(false))}
            />
            <BasicInput
              label="By Name"
              onChangeText={(t) => dispatch(filterByName(t))}
              value={stateSelector.filterByName}
            />
          </View>
        </View>
      </Modal>

      <FlatList
        data={filterProductByName}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={FlatItemSeparator}
        // getItemLayout={getItemLayout}
        onEndReachedThreshold={6}
        scrollsToTop={true}
        initialNumToRender={7}
        removeClippedSubviews={true}
        viewabilityConfig={VIEWABILITY_CONFIG}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* <BasicButton title="delete all" onPress={() => dltAllPro()} /> */}
    </SafeScreen>
  );
};

export default ProductDetail;
