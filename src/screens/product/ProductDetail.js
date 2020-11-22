import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../colors/colors';
import BasicButton from '../../components/basicComponents/BasicButton';
import BasiceIcon from '../../components/basicComponents/BasicIcon';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import RenderItem from '../../components/functionalComponents/RenderItem';
import {Products} from '../../database';
import {styles} from '../../styles/styles';

import _ from 'lodash';

const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

const ProductDetail = ({navigation}) => {
  const allProductData = useSelector((state) =>
    _.reverse([...state.productReducer.allProducts.data()]),
  );

  const [refreshing, setRefreshing] = useState(false);
  // const [allProductData, setAllProductData] = useState(
  //   _.reverse([...productsSelector]),
  // );

  const flatListRef = useRef();

  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  // console.log(allProductData);
  useEffect(() => {
    // Products.onLoaded(() =>
    //   setProductReducer(Products.filter({completed: true}).data()),
    // );

    Products.onChange(() => {});
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  });

  const updateItem = () => {
    let upd = {
      date: new Date(),
      name: 'eight',
      color: 'red',
      note: 'Testing by inserting an item',
      is_completed: 'true',
    };
    alert('item updated');
    return upd;
  };

  const renderItem = ({item}) => (
    <RenderItem
      item={item}
      handleDelete={() => {
        let id = Products.get({id: item.id});
        Products.remove(id);
        alert('Deleted');
      }}
      handleUpdate={() => {
        let item1 = Products.get({id: item.id});
        Products.update(item1.id, updateItem());
      }}
    />
  );

  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: 2,
          width: '50%',
          backgroundColor: 'red',
          alignSelf: 'center',
        }}
      />
    );
  };

  return (
    <SafeScreen>
      <Text>Total Product: {allProductData.length} </Text>
      <BasicButton
        style={styles.roundBtn}
        iconName="plus"
        onPress={() => navigation.navigate('AddProduct')}
      />

      <FlatList
        ref={flatListRef}
        data={allProductData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparatorComponent}
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
      <TouchableOpacity
        onPress={() => toTop()}
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          right: 5,
          top: 5,
          borderRadius: 50,
          width: 50,
          height: 50,
          // backgroundColor: 'yellow',
          borderWidth: 0,
          // elevation: 10,
          zIndex: 99,
        }}>
        <BasiceIcon name="angle-double-up" />
      </TouchableOpacity>
    </SafeScreen>
  );
};

export default ProductDetail;
