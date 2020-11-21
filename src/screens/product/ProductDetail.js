import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

const ProductDetail = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const flatListRef = useRef();

  const toTop = () => {
    // use current
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const allProductData = useSelector((state) =>
    state.productReducer.allProducts.data(),
  );

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
    }, 2000);
  }, []);

  const renderItem = ({item}) => (
    <RenderItem
      item={item}
      handleDelete={() => {
        let id = Products.get({id: item.id});
        Products.remove(id);
        alert('Deleted');
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
        initialNumToRender={4}
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
