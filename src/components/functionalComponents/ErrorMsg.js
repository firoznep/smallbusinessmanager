import {ErrorMessage} from 'formik';
import React from 'react';
import {Text} from 'react-native';
import {colors} from '../../colors/colors';

const ErrorMsg = ({name}) => {
  if (!name) return null;
  return (
    <Text style={{color: colors.red}}>
      <ErrorMessage name={name} />
    </Text>
  );
};

// const ErrorMsg = ({error}) => {
//   if (!error) {
//     return null;
//   }

//   return <Text style={{color: colors.red}}>{error}</Text>;
// };

export default ErrorMsg;
