import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';

import _ from 'lodash';
import BasicButton from '../../components/basicComponents/BasicButton';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import FlatItemSeparator from '../../components/functionalComponents/FlatItemSeparator';
import RenderProductItem from '../../components/functionalComponents/products/RenderProductItems';
import {Products} from '../../database';
import {styles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  flatListRefreshedAction,
  productFilterScreenVisibleAction,
} from '../../storeRedux/actions/productActions';
import BasicModal from '../../components/basicComponents/BasicModal';
import ModalItem from '../../components/functionalComponents/products/ModalItem';

// MAIN FUNC
const ProductDetail = ({navigation}) => {
  // USESTATES
  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  // USESELECTOR
  const isFlatListRefreshed = useSelector(
    (state) => state.productReducer.isFlatListRefreshed,
  );

  const isProductFilterScreenVisible = useSelector(
    (state) => state.productReducer.isProductFilterScreenVisible,
  );

  const isSaleFilterScreenVisible = useSelector(
    (state) => state.productReducer.isSaleFilterScreenVisible,
  );

  const filteredAllData = useSelector(
    (state) => state.productReducer.filter.allData,
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

  // DISPATCH
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    Products.onChange(() => {
      console.log('product changed');
    });
  });

  useEffect(() => {
    setDataByfiltering();
  }, [isProductFilterScreenVisible]);

  // ONFRESH
  const onRefresh = useCallback(() => {
    dispatch(flatListRefreshedAction(true));
    setFilteredData(filteredAllData);
    dispatch(flatListRefreshedAction(false));
  });

  // FUNCTIONS
  const setDataByfiltering = () => {
    switch (filterBy) {
      case 'all':
        setFilteredData(filteredAllData);
        break;
      case 'name':
        setFilteredData(
          filteredAllData.filter((itm) => itm.name === filteredName),
        );
        break;
      case 'vendor':
        setFilteredData(
          filteredAllData.filter((itm) => itm.vendor === filteredVendor),
        );
        break;
      case 'date':
        setFilteredData(
          filteredAllData.filter(
            (itm) => new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        break;
      case 'productVendor':
        setFilteredData(
          filteredAllData.filter(
            (itm) => itm.name === filteredName && itm.vendor === filteredVendor,
          ),
        );
        break;
      case 'nameNDate':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.name === filteredName &&
              new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        break;
      case 'vendorNDate':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.vendor === filteredVendor &&
              new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        break;
      case 'vendorProductDate':
        setFilteredData(
          filteredAllData.filter(
            (itm) =>
              itm.vendor === filteredVendor &&
              new Date(itm.date).toDateString() === filteredDate &&
              itm.name === filteredName,
          ),
        );
        break;
      default:
        setFilteredData(
          filteredAllData.filter(
            (itm) => new Date(itm.date).toDateString() === filteredDate,
          ),
        );
        setFilterBy('date');
    }
  };

  console.log('filteredAllData len: ', filteredAllData.length);
  console.log('filterBy: ', filterBy);
  console.log('filteredData: ', filteredData.length);

  return (
    <SafeScreen>
      <BasicModal
        visible={isProductFilterScreenVisible}
        onPress={() => {
          dispatch(productFilterScreenVisibleAction(false));
        }}>
        <ModalItem
          data={filteredAllData}
          filterBy={filterBy}
          filteredDate={filteredDate}
          filteredName={filteredName}
          filteredVendor={filteredVendor}
          setFilterBy={setFilterBy}
        />
      </BasicModal>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={RenderProductItem}
        ItemSeparatorComponent={FlatItemSeparator}
        refreshControl={
          <RefreshControl
            refreshing={isFlatListRefreshed}
            onRefresh={onRefresh}
          />
        }
      />

      <BasicButton
        iconName="plus"
        style={styles.roundBtn}
        onPress={() => navigation.navigate('AddProduct')}
      />
    </SafeScreen>
  );
};

export default ProductDetail;
