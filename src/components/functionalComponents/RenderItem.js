import React from 'react';
import {Text, View} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import _ from 'lodash';

import {styles} from '../../styles/styles';
import {colors} from '../../colors/colors';
import {formatToCurrencyInd} from '../../util/utilFunc';
import BasicImage from '../basicComponents/BasicImage';
import RightAction from './RightAction';
import RenderItemChild from './RenderItemChild';

// MAIN FUNC
const RenderItem = ({handleDelete, handleUpdate, item}) => {
  return (
    <Swipeable
      leftThreshold={80}
      friction={3}
      rightThreshold={40}
      renderRightActions={() => (
        <RightAction
          deleteButtonRight={handleDelete}
          updateButtonRight={handleUpdate}
        />
      )}>
      <View style={styles.item}>
        <View style={styles.itemMainChild}>
          <View
            style={{
              justifyContent: 'space-between',
            }}>
            <Text style={{color: colors.fbBlue}}>
              {new Date(item.date).toDateString()}
            </Text>

            <RenderItemChild
              itemField={item.vendor}
              title="Vendor"
              fieldColor={colors.fbBlue}
              fieldWidth={180}
            />

            <RenderItemChild
              itemField={item.quantity}
              title="Quantity"
              fieldColor={colors.fbBlue}
              itemUnit={item.unit}
            />

            <RenderItemChild
              itemField={formatToCurrencyInd(item.real_cost)}
              title="Real Cost"
              fieldColor={colors.fbBlue}
            />
            <RenderItemChild
              itemField={formatToCurrencyInd(item.total_amount)}
              title="Total amount"
              fieldColor={colors.fbBlue}
            />
          </View>

          {item.name ? (
            <View style={styles.childItem}>
              <BasicImage
                source={{uri: `data:${'image/jpeg'};base64,${item.img_data}`}}
              />

              <RenderItemChild itemField={item.name} fieldWidth={120} />
            </View>
          ) : null}
        </View>

        <RenderItemChild
          itemField={formatToCurrencyInd(item.cost_price)}
          title="Primary Cost"
        />
        <RenderItemChild
          itemField={formatToCurrencyInd(item.expenses)}
          title="Expenses On Cost"
        />
        <RenderItemChild itemField={item.color} title="Color" />
        <RenderItemChild itemField={item.model} title="Modal" />
        <RenderItemChild itemField={item.size} title="Size" />
        <RenderItemChild itemField={item.description} title="Description" />
      </View>
    </Swipeable>
  );
};

export default React.memo(RenderItem);
