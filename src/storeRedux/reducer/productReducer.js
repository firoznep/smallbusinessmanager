import _ from 'lodash';
import {Products} from '../../database';

const ADD_PRODUCT = 'ADD_PRODUCT';

const onAddProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

const INITIAL_STATE = {
  allProducts: Products,
};

const ProductReducer = (state = INITIAL_STATE, action) => {
  // switch (action.type) {
  //   // case ADD_PRODUCT:
  //   //   return _.uniqBy(_.concat(state, action.payload), 'id');

  // }
  // default:
  return state;
};

export default ProductReducer;
