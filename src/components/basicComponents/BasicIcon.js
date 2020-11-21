import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../colors/colors';

const BasiceIcon = ({name, color, size = 24}) => {
  return <FontAwesome5 name={name} color={color} size={size} />;
};

export default BasiceIcon;
