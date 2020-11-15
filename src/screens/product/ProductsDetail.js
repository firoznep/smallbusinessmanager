import {transform} from 'lodash';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {connect} from 'react-redux';
import {colors} from '../../colors/colors';

// const productReducer = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

const Item = ({item}) => {
  return (
    <Swipeable renderRightActions={RightActions}>
      <View style={styles.item}>
        <Text>{new Date(item.date).toDateString()}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.note}</Text>
      </View>
    </Swipeable>
  );
};

const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0],
  });
  return (
    <>
      <TouchableOpacity
        onPress={() => alert('Delete button pressed')}
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 70,
        }}>
        <Animated.Text
          style={{
            fontWeight: 'bold',
            transform: [{scale}],
          }}>
          <FontAwesome5 name="times" size={28} color="yellow" />
        </Animated.Text>
      </TouchableOpacity>
      <View style={{backgroundColor: 'green', justifyContent: 'center'}}>
        <Animated.Text
          style={{
            color: 'white',
            paddingHorizontal: 10,
            fontWeight: '600',
            transform: [{scale}],
          }}>
          Archive
        </Animated.Text>
      </View>
    </>
  );
};

const ProductsDetails = ({productReducer, setProductReducer}) => {
  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{'Total Products: ' + productReducer.length}</Text>
      <FlatList
        data={productReducer}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: colors.white,
  },
});

const mapStateToProps = (state) => ({
  productReducer: state.productReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setProductReducer: (products) => dispatch(addProduct(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);
