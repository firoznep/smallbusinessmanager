import React from 'react';

import {Picker} from '@react-native-picker/picker';

const BasicDropdownPicker = ({selectedValue, onValueChange, children}) => {
  return (
    <>
      <Picker
        mode="dropdown"
        selectedValue={selectedValue}
        style={{
          height: 50,
          minWidth: 140,
          backgroundColor: 'white',
          marginVertical: 5,
        }}
        onValueChange={onValueChange}>
        {children}
      </Picker>
    </>
  );
};

export default BasicDropdownPicker;
