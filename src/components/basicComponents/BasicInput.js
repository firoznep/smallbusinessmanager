import React from 'react';
import {View} from 'react-native';
import {colors} from '../../colors/colors';

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Hoshi} from 'react-native-textinput-effects';

const BasicInput = ({label, onChangeText, onBlur, ...otherProps}) => {
  return (
    <View style={{marginVertical: 5}}>
      <Hoshi
        style={{backgroundColor: colors.white}}
        label={label}
        // iconClass={FontAwesome5}
        // iconName={iconName}
        // iconColor={colors.fbBlue}
        // iconSize={24}
        // iconWidth={40}
        // backgroundColor={colors.white}
        borderHeight={3}
        inputPadding={16}
        onChangeText={onChangeText}
        onBlur={onBlur}
        selectTextOnFocus={true}
        {...otherProps}
      />
    </View>
  );
};

export default BasicInput;
