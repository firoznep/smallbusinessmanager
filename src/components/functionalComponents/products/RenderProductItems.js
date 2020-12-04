import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../../colors/colors';
import {formatToCurrencyInd} from '../../../util/utilFunc';
import BasicImage from '../../basicComponents/BasicImage';
import RenderProductChildItem from './RenderProductChildItem';

const RenderProductItem = ({item}) => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: 10}}>
          <BasicImage
            source={{uri: `data:${'image/jpeg'};base64,${item.img_data}`}}
          />
          <RenderProductChildItem
            item={item.name}
            itemFontWeight="bold"
            style={{maxWidth: 120}}
          />
        </View>
        <View>
          <RenderProductChildItem item={new Date(item.date).toDateString()} />
          <RenderProductChildItem
            title="Vendor Name"
            item={item.vendor}
            itemFontWeight="bold"
          />
          <RenderProductChildItem
            title="Quantity"
            item={item.quantity}
            unit={item.unit}
            itemFontWeight="bold"
            itemColor={colors.fbBlue}
          />
          <RenderProductChildItem
            title="Real Cost"
            item={formatToCurrencyInd(item.real_cost)}
            itemFontWeight="bold"
            itemColor={colors.fbBlue}
          />
          <RenderProductChildItem
            title="Total Amount"
            item={formatToCurrencyInd(item.total_amount)}
            itemFontWeight="bold"
            itemColor={colors.fbBlue}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <RenderProductChildItem
          title="Primary Cost"
          item={formatToCurrencyInd(item.cost_price)}
        />
        <RenderProductChildItem
          title="Expenses"
          item={formatToCurrencyInd(item.expenses)}
        />
        <RenderProductChildItem title="Size" item={item.size} />
        <RenderProductChildItem title="Model" item={item.model} />
        <RenderProductChildItem
          title="Description"
          item={item.description}
          maxWidth={'100%'}
          style={{alignSelf: 'flex-start'}}
        />
      </View>
    </>
  );
};

export default RenderProductItem;
