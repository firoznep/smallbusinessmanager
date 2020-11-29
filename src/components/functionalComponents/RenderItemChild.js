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
  fieldWidth,
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
            fontWeight: 'bold',
            fontSize: itemFieldSize,
            textTransform: 'capitalize',
            color: fieldColor,
            width: fieldWidth,
          }}>
          {itemField}
        </Text>
        <Text style={{color: 'black'}}>{itemUnit}</Text>
      </View>
    </View>
  ) : null;
};

export default RenderItemChild;
