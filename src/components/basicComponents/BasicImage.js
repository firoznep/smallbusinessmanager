import React from 'react';
import {Image, View} from 'react-native';
import {colors} from '../../colors/colors';

const BasicImage = ({source}) => {
  return (
    <View>
      <Image
        source={source}
        style={{
          width: 120,
          height: 135,
          borderRadius: 10,
          backgroundColor: colors.fbBlue,
        }}
      />
    </View>
  );
};

export default BasicImage;
