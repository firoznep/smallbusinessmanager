import React from 'react';
import {Text, View} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import _ from 'lodash';

import {styles} from '../../styles/styles';
import {colors} from '../../colors/colors';
import BasicButton from '../basicComponents/BasicButton';
import {formatToCurrencyInd} from '../../util/utilFunc';

const RightActions = ({deleteButtonRight, updateButtonRight}) => {
  return (
    <View
      style={{
        margin: 5,
        justifyContent: 'space-between',
      }}>
      <BasicButton
        onPress={deleteButtonRight}
        iconName="times"
        iconColor={colors.yellow}
        style={styles.crud}
      />
      <BasicButton
        iconName="edit"
        style={[styles.crud, {backgroundColor: 'yellow'}]}
      />
    </View>
  );
};

// MAIN FUNC
const RenderItem = ({handleDelete, handleUpdate, item}) => {
  return (
    <Swipeable
      renderRightActions={() => (
        <RightActions
          deleteButtonRight={handleDelete}
          updateButtonRight={handleUpdate}
        />
      )}>
      <View style={styles.item}>
        <Text
          style={{
            // alignSelf: 'center',
            textAlign: 'right',
            width: '100%',
            color: colors.fbBlue,
          }}>
          {new Date(item.date).toDateString()}
        </Text>

        {item.name ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Name</Text>
            <Text style={{color: colors.fbBlue, fontWeight: 'bold'}}>
              {item.name}
            </Text>
          </View>
        ) : null}

        {item.real_cost ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Real Cost Price</Text>
            <Text style={{color: colors.fbBlue, fontWeight: 'bold'}}>
              {formatToCurrencyInd(item.real_cost)}
            </Text>
          </View>
        ) : null}

        {item.sale_price ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Sale Price</Text>
            <Text style={{color: colors.fbBlue, fontWeight: 'bold'}}>
              {formatToCurrencyInd(item.sale_price)}
            </Text>
          </View>
        ) : null}

        {item.color ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>color</Text>
            <Text>{item.color}</Text>
          </View>
        ) : null}

        {item.model ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Model</Text>
            <Text>{item.model}</Text>
          </View>
        ) : null}

        {item.cost_price ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Cost Price</Text>
            <Text>{formatToCurrencyInd(item.cost_price)}</Text>
          </View>
        ) : null}

        {item.expenses ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Expenses</Text>
            <Text>{formatToCurrencyInd(item.expenses)}</Text>
          </View>
        ) : null}

        {item.profit_percent ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Get Profit</Text>
            <Text>{item.profit_percent}%</Text>
          </View>
        ) : null}

        {item.description ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Description</Text>
            <Text>{item.description}</Text>
          </View>
        ) : null}
      </View>
    </Swipeable>
  );
};

export default React.memo(RenderItem);
