import React, {memo} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../../styles/styles';

import _ from 'lodash';

const RightActions = ({deleteButtonRight}) => {
  // const scale = dragX.interpolate({
  //   inputRange: [-100, 0],
  //   outputRange: [0.7, 0],
  // });
  return (
    <>
      <TouchableOpacity
        onPress={deleteButtonRight}
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 70,
          // elevation: 10,
        }}>
        <Animated.Text
          style={{
            fontWeight: 'bold',
            // transform: [{scale}],
          }}>
          <FontAwesome5 name="times" size={28} color="yellow" />
        </Animated.Text>
      </TouchableOpacity>
    </>
  );
};

const RenderItem = ({handleDelete, item}) => {
  return (
    <Swipeable
      renderRightActions={() => (
        <RightActions deleteButtonRight={handleDelete} />
      )}>
      <View style={styles.item}>
        <Text>{new Date(item.date).toDateString()}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.note}</Text>
        <Text>{item.is_completed}</Text>
      </View>
    </Swipeable>
  );
};

export default RenderItem;
