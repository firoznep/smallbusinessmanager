import React from 'react';
import {Text, View, Image} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import _ from 'lodash';

import {styles} from '../../styles/styles';
import {colors} from '../../colors/colors';
import BasicButton from '../basicComponents/BasicButton';
import {formatToCurrencyInd} from '../../util/utilFunc';

const RightActions = ({deleteButtonRight, updateButtonRight}) => {
  return (
    <View
      style={{
        margin: 5,
        justifyContent: 'space-between',
      }}>
      <BasicButton
        onPress={deleteButtonRight}
        iconName="times"
        iconColor={colors.yellow}
        style={styles.crud}
      />
      <BasicButton
        iconName="edit"
        style={[styles.crud, {backgroundColor: 'yellow'}]}
      />
    </View>
  );
};

// MAIN FUNC
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
        <Text style={styles.dateInItems}>
          {new Date(item.date).toDateString()}
        </Text>

        {item.name ? (
          <View style={styles.childItem}>
            <View>
              <Image
                source={{
                  uri: `data:${'image/jpeg'};base64,${item.img_data}`,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  backgroundColor: colors.fbBlue,
                }}
              />
            </View>
            <Text style={{color: colors.fbBlue, fontWeight: 'bold'}}>
              {item.name}
            </Text>
          </View>
        ) : null}

        {item.real_cost ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Real Cost</Text>
            <Text style={{color: colors.fbBlue, fontWeight: 'bold'}}>
              {formatToCurrencyInd(item.real_cost)}
            </Text>
          </View>
        ) : null}

        {item.quantity ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Quantity</Text>
            <Text style={{color: colors.fbBlue, fontWeight: 'bold'}}>
              {item.quantity}
            </Text>
          </View>
        ) : null}

        {item.color ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>color</Text>
            <Text>{item.color}</Text>
          </View>
        ) : null}

        {item.model ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Model</Text>
            <Text>{item.model}</Text>
          </View>
        ) : null}

        {item.size ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Size</Text>
            <Text>{item.size}</Text>
          </View>
        ) : null}

        {item.description ? (
          <View style={styles.childItem}>
            <Text style={styles.subChildItem}>Description</Text>
            <Text>{item.description}</Text>
          </View>
        ) : null}
      </View>
    </Swipeable>
  );
};

export default React.memo(RenderItem);
