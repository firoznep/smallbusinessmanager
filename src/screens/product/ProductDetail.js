import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useSelector} from 'react-redux';

import _ from 'lodash';

import {Products} from '../../database';

import BasicButton from '../../components/basicComponents/BasicButton';
import BasiceIcon from '../../components/basicComponents/BasicIcon';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import RenderItem from '../../components/functionalComponents/RenderItem';

import {styles} from '../../styles/styles';

import {dltAllPro} from '../../util/deleteAll';
import FlatItemSeparator from '../../components/functionalComponents/FlatItemSeparator';
// import {allProductData} from '../../util/dataSelector';

const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

// MAIN FUNC ===================================================
const ProductDetail = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const allProductData = useSelector((state) =>
    _.reverse([...state.productReducer.allProducts.data()]),
  );

  const flatListRef = useRef();

  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  useEffect(() => {
    Products.onChange(() => {});
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  });

  const renderItem = ({item}) => (
    <RenderItem
      item={item}
      handleDelete={() => {
        let id = Products.get({id: item.id});
        Products.remove(id);
        alert('Deleted');
      }}
      // handleUpdate={() => {
      //   let item1 = Products.get({id: item.id});
      //   Products.update(item1.id, updateItem());
      // }}

      handleUpdate={() => setVisible(true)}
    />
  );

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

      <BasicButton title="delete all" onPress={() => dltAllPro()} />
    </SafeScreen>
  );
};

export default ProductDetail;
