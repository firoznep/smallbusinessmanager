import React from 'react';
import {Text, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {colors} from '../../colors/colors';

const BasicDropdownPicker = ({
  title,
  selectedValue,
  onValueChange,
  minWidth = 130,
  backgroundColor = colors.white,
  fontColor = colors.fbBlue,
  children,
}) => {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        minWidth: minWidth,
        // backgroundColor: 'green',
      }}>
      <Text style={{paddingHorizontal: 10}}>{title}</Text>
      <Picker
        mode="dropdown"
        selectedValue={selectedValue}
        style={{
          height: 40,
          minWidth: minWidth,
          backgroundColor: backgroundColor,
          alignSelf: 'flex-start',
          color: fontColor,
        }}
        onValueChange={onValueChange}>
        {children}
      </Picker>
    </View>
  );
};

export default BasicDropdownPicker;
