import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.date.toLocaleString('en-US')}</Text>
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.title}>{item.note}</Text>
  </TouchableOpacity>
);

const ProductsDetails = ({productReducer}) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Total Product: {productReducer.length}</Text>
      <FlatList
        data={productReducer}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const mapStateToProps = (state) => ({
  productReducer: state.productReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setProductReducer: (products) => dispatch(addProduct(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);
