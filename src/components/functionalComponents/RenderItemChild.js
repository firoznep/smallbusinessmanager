import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../colors/colors';
import {styles} from '../../styles/styles';

const RenderItemChild = ({itemField, fieldColor = colors.black, title}) => {
  return itemField ? (
    <View style={styles.childItem}>
      <Text style={styles.subChildItem}>{title}</Text>
      <Text style={{color: fieldColor, fontWeight: 'bold'}}>{itemField}</Text>
    </View>
  ) : null;
};

export default RenderItemChild;
