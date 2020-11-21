import React, {useState} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {colors} from '../colors/colors';
import BasicButton from '../components/basicComponents/BasicButton';
import ModalDateTimePicker from '../components/basicComponents/ModalDateTimePicker';
import SafeScreen from '../components/basicComponents/SafeScreen';

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

        <ModalDateTimePicker
          pickedDateTime={setPickedDateTime}
          title={new Date(pickedDateTime).toDateString()}
        />

        <BasicButton
          title="test"
          onPress={() => navigation.navigate('AddProduct')}
        />
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
