import React from 'react';
import {View} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {useDispatch} from 'react-redux';

import {colors} from '../../../colors/colors';
import {
  filterByDate,
  filterByName,
  filterByVendor,
} from '../../../storeRedux/actions/productActions';
import {styles} from '../../../styles/styles';
import {sortedUniqBy} from '../../../util/sortedUniq';
import {randomId} from '../../../util/utilFunc';
import BasicDropdownPicker from '../../basicComponents/BasicDropdownPicker';

const ModalItem = ({
  setFilterBy,
  filterBy,
  filterAllProduct,
  filteredDate,
  filteredName,
  filteredVendor,
}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.modalViewSubChild}>
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
        <Picker.Item label="Vendor Product Date" value="vendorProductDate" />
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
          onValueChange={(itemValue) => dispatch(filterByVendor(itemValue))}>
          <Picker.Item label="Select Vendor" value={null} color="gray" />
          {sortedUniqBy(filterAllProduct, 'vendor').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
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
          onValueChange={(itemValue) => dispatch(filterByName(itemValue))}>
          <Picker.Item label="Select Name" value={null} color="gray" />
          {sortedUniqBy(filterAllProduct, 'name').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
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
          onValueChange={(itemValue) => dispatch(filterByDate(itemValue))}>
          <Picker.Item label="Select Date" value={null} color="gray" />
          {sortedUniqBy(filterAllProduct, 'date').map((elm) => {
            return <Picker.Item label={elm} value={elm} key={randomId()} />;
          })}
        </BasicDropdownPicker>
      ) : null}
    </View>
  );
};

export default ModalItem;
