import React, {memo} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../../styles/styles';

import _ from 'lodash';
import {colors} from '../../colors/colors';

const RightActions = ({deleteButtonRight, updateButtonRight}) => {
  // const scale = dragX.interpolate({
  //   inputRange: [-100, 0],
  //   outputRange: [0.7, 0],
  // });
  return (
    <View
      style={{
        margin: 10,
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={deleteButtonRight} style={styles.crud}>
        <Animated.Text
          style={{
            fontWeight: 'bold',
            // transform: [{scale}],
          }}>
          <FontAwesome5 name="times" size={28} color="yellow" />
        </Animated.Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={updateButtonRight}
        style={[styles.crud, {backgroundColor: colors.fbBlue}]}>
        <Animated.Text
          style={{
            fontWeight: 'bold',
            // transform: [{scale}],
          }}>
          <FontAwesome5 name="edit" size={28} color={colors.yellow} />
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const RenderItem = ({handleDelete, handleUpdate, item}) => {
  return (
    <Swipeable
      renderRightActions={() => (
        <RightActions
          deleteButtonRight={handleDelete}
          updateButtonRight={handleUpdate}
        />
      )}>
      <View style={styles.item}>
        <Text>{new Date(item.date).toDateString()}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.note}</Text>
        <Text>{item.is_completed}</Text>
        <Text>{item.color}</Text>
      </View>
    </Swipeable>
  );
};

export default RenderItem;
