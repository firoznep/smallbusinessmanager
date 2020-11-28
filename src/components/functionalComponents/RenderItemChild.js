import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../colors/colors';
import {styles} from '../../styles/styles';

const RenderItemChild = ({
  itemField,
  fieldColor = colors.black,
  title,
  itemUnit,
  itemFieldSize,
}) => {
  return itemField ? (
    <View style={styles.childItem}>
      <Text style={styles.subChildItem}>{title}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'baseline',
        }}>
        <Text
          style={{
            color: fieldColor,
            fontWeight: 'bold',
            fontSize: itemFieldSize,
          }}>
          {itemField}
        </Text>
        <Text>{itemUnit}</Text>
      </View>
    </View>
  ) : null;
};

export default RenderItemChild;
