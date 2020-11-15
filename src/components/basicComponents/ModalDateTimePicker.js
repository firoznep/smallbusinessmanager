import React, {useState} from 'react';
import {View} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import BasicButton from './BasicButton';

const ModalDateTimePicker = ({
  pickedDateTime,
  title = new Date().toDateString('en-US'),
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    pickedDateTime(date);
    hideDatePicker();
  };

  return (
    <View>
      <BasicButton
        title={title}
        iconName="calendar-alt"
        onPress={showDatePicker}
        style={{borderRadius: 0, borderWidth: 0, borderBottomWidth: 1}}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default ModalDateTimePicker;
