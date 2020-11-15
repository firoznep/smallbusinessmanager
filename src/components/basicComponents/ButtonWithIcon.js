import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {colors} from '../../colors/colors';
import {styles} from '../../styles/styles';

const ButtonWithIcon = ({
  title,
  iconName,
  iconColor = colors.fbBlue,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.baslicBtn, style]}
      title={title.toLocaleString('en-US')}
      onPress={onPress}>
      <FontAwesome5 name={iconName} size={24} color={iconColor} />
      <Text style={[styles.btnText, {marginLeft: iconName ? 5 : 0}]}>
        {title.toLocaleString('en-US')}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
