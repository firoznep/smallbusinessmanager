import React from 'react';
import {Text, View} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import _ from 'lodash';

import {styles} from '../../styles/styles';
import {colors} from '../../colors/colors';
import {formatToCurrencyInd} from '../../util/utilFunc';
import BasicImage from '../basicComponents/BasicImage';
import RightAction from './RightAction';
import RenderItemChild from './RenderItemChild';

// MAIN FUNC
const RenderItem = ({handleDelete, handleUpdate, item}) => {
  return (
    <Swipeable
      renderRightActions={() => (
        <RightAction
          deleteButtonRight={handleDelete}
          updateButtonRight={handleUpdate}
        />
      )}>
      <View style={styles.item}>
        <View style={styles.itemMainChild}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={styles.dateInItems}>
              {new Date(item.date).toDateString()}
            </Text>

            <RenderItemChild
              itemField={item.quantity}
              title="Quantity"
              fieldColor={colors.fbBlue}
            />

            {item.real_cost ? (
              <View style={styles.childItem}>
                <Text style={styles.subChildItem}>Real Cost</Text>
                <Text style={{color: colors.fbBlue, fontWeight: 'bold'}}>
                  {formatToCurrencyInd(item.real_cost)}
                </Text>
              </View>
            ) : null}
          </View>

          {item.name ? (
            <View style={styles.childItem}>
              <BasicImage
                source={{uri: `data:${'image/jpeg'};base64,${item.img_data}`}}
              />
              <Text style={{color: colors.fbBlue, fontWeight: 'bold'}}>
                {item.name}
              </Text>
            </View>
          ) : null}
        </View>

        <RenderItemChild itemField={item.color} title="Color" />
        <RenderItemChild itemField={item.model} title="Modal" />
        <RenderItemChild itemField={item.size} title="Size" />
        <RenderItemChild itemField={item.description} title="Description" />
      </View>
    </Swipeable>
  );
};

export default React.memo(RenderItem);
