import React from 'react';
import {Image, Text, View} from 'react-native';
import {colors} from '../../../colors/colors';
import {styles} from '../../../styles/styles';
import {formatToCurrencyInd} from '../../../util/utilFunc';
import BasicImage from '../../basicComponents/BasicImage';
import RenderProductChildItem from './RenderProductChildItem';

const RenderProductItem = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 5,
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text>{new Date(item.date).toDateString()}</Text>
          <RenderProductChildItem title="Vendor" item={item.vendor} />
          <View>
            <Text>quantity</Text>
            <Text>
              {item.quantity}
              {item.unit}
            </Text>
          </View>
          <RenderProductChildItem
            title="Real Cost"
            item={formatToCurrencyInd(item.real_cost)}
          />
          <RenderProductChildItem
            title="Total amount"
            item={item.total_amount}
          />
        </View>

        <View>
          <BasicImage
            source={{uri: `data:${'image/jpeg'};base64,${item.img_data}`}}
          />
          <View style={{maxWidth: 120}}>
            <Text style={{color: 'red', alignSelf: 'flex-start'}}>
              {item.name}
            </Text>
          </View>
        </View>
      </View>

      <RenderProductChildItem title="Model" item={item.model} />
      <RenderProductChildItem title="Size" item={item.size} />
      <RenderProductChildItem title="Color" item={item.color} />
      <RenderProductChildItem
        title="Primary Cost"
        item={formatToCurrencyInd(item.cost_price)}
      />
      <RenderProductChildItem
        title="Expenses"
        item={formatToCurrencyInd(item.expenses.toString())}
      />
      <RenderProductChildItem
        title="Description"
        item={item.description}
        style={{width: '100%', backgroundColor: 'blue'}}
      />
    </View>
  );
};

// export default RenderProductItem;
