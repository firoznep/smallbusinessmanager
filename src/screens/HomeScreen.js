import React, {useState} from 'react';
import {Image, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {colors} from '../colors/colors';
import BasicButton from '../components/basicComponents/BasicButton';
import ModalDateTimePicker from '../components/basicComponents/ModalDateTimePicker';
import SafeScreen from '../components/basicComponents/SafeScreen';
import {getImageFromGallery} from '../util/cropImagePicker';
import {IMG_DATA} from '../util/imgPathData';

const HomeScreen = ({navigation}) => {
  const [pickedDateTime, setPickedDateTime] = useState(
    new Date().toDateString(),
  );

  return (
    <SafeScreen>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // backgroundColor: 'yellow',
          alignItems: 'center',
        }}>
        <Text>Home</Text>
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
